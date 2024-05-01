import { KobbleContext } from './KobbleContext.tsx';
import { createKobbleClient, KobbleClient } from '@kobbleio/javascript';
import { useEffect, useState } from 'react';
import { AuthProvider } from '../auth/AuthProvider.tsx';
import { AccessControlProvider } from '../access-control/AccessControlProvider.tsx';

export type KobbleProviderProps = {
	/**
	 * This is the Base URL of your Kobble Customer Portal.
	 * To find it, go to your [Kobble Dashboard](https://app.kobble.io).
	 *
	 * Always use the root URL:
	 *
	 * DO: https://example.portal.kobble.io".
	 *
	 * DON'T: "https://example.portal.kobble.io/something".
	 */
	domain: string;
	/**
	 * This is the client ID of your Kobble application.
	 * To find it, go to [Kobble Dashboard > Applications](https://app.kobble.io/p/applications)
	 * and click on your application or create a new one.
	 */
	clientId: string;
	/**
	 * This is the URL where the user will be redirected after the login.
	 * It must be a URL that is registered in your [Kobble Application](https://app.kobble.io/p/applications).
	 * You must be sure this page handles the login callback.
	 *
	 * You can use the <HandleCallback /> component to easily handle the callback.
	 * [See the docs](https://docs.kobble.io/learning/quickstart/react).
	 */
	redirectUri: string;
	/**
	 * Do not change this parameter unless you know what you are doing.
	 */
	sdkBaseUrl?: string;
	/**
	 * If true, the SDK will log more information to the console.
	 * This is useful for debugging but must be disabled in production.
	 */
	verbose?: boolean;
};

export const KobbleProvider: React.FC<{ children: React.ReactNode } & KobbleProviderProps> = ({
	children,
	redirectUri,
	domain,
	clientId,
	sdkBaseUrl,
	verbose
}) => {
	const [client, setClient] = useState<KobbleClient | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (client) {
			return;
		}

		setIsLoading(true);
		try {
			const kobbleClient = createKobbleClient({
				domain,
				clientId,
				redirectUri,
				sdkBaseUrl,
				verbose
			});
			setClient(kobbleClient);
		} catch (e: any) {
			setError(e);
		} finally {
			setIsLoading(false);
		}
	}, [client, domain, clientId, redirectUri]);

	return (
		<KobbleContext.Provider
			value={{
				value: {
					client,
					isLoading,
					error
				}
			}}>
			<AuthProvider>
				<AccessControlProvider>{children}</AccessControlProvider>
			</AuthProvider>
		</KobbleContext.Provider>
	);
};
