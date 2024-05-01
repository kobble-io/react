import { createContextAndHook } from '../../shared/createContextAndHook.ts';
import { KobbleClient } from '@kobbleio/javascript';

export type KobbleContextState = {
	client: KobbleClient | null | undefined;
	isLoading: boolean | undefined;
	error: Error | null | undefined;
};

export const [KobbleContext, useKobbleContext] = createContextAndHook<KobbleContextState>('KobbleContext');
