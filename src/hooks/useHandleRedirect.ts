import { useKobble } from './useKobble.ts';
import { useEffect } from 'react';

export const useHandleRedirect = (params: { onSuccess: () => void; onError: (errorMessage: string) => void }) => {
	const { kobble } = useKobble();

	useEffect(() => {
		if (!kobble) {
			return;
		}

		const handleCallback = async () => {
			try {
				await kobble.handleRedirectCallback(window.location.href);
				params.onSuccess();
			} catch (e: any) {
				console.error('Error handling redirect callback', e);
				params.onError(e?.message ?? 'An error occurred while authenticating, please try again');
			}
		};

		handleCallback();
	}, [kobble, params]);
};
