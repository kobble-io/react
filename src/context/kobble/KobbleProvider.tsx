import { KobbleContext } from './KobbleContext.tsx';
import { createKobbleClient, KobbleClient } from '@kobbleio/auth-spa-js';
import { useEffect, useState } from 'react';
import { AuthProvider } from '../auth/AuthProvider.tsx';

export type KobbleProviderProps = {
	domain: string;
	clientId: string;
	redirectUri: string;
};

export const KobbleProvider: React.FC<{ children: React.ReactNode } & KobbleProviderProps> = ({ children, redirectUri, domain, clientId }) => {
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
				redirectUri
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
			<AuthProvider>{children}</AuthProvider>
		</KobbleContext.Provider>
	);
};
