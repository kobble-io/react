import { useKobbleContext } from '../context/kobble/KobbleContext.tsx';

export const useAssertWrappedByKobbleProvider = (sourceName: string) => {
	const ctx = useKobbleContext();
	if (!ctx) {
		throw new Error(`KobbleProvider not found. Are you using ${sourceName} outside of the KobbleProvider?`);
	}
};
