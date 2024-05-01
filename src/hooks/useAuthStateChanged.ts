import { AuthStateChangedCallback } from '@kobbleio/javascript';
import { useKobbleContext } from '../context/kobble/KobbleContext.tsx';

export type UseAuthStateChangedReturn = { unsubscribe: () => void };
export const useAuthStateChanged = (callback: AuthStateChangedCallback): UseAuthStateChangedReturn => {
	const ctx = useKobbleContext();

	if (!ctx?.client) throw new Error('Kobble client not initialized. Are you using useAuthStateChanged outside of a KobbleProvider?');

	return ctx.client.onAuthStateChanged(callback);
};
