import { createContextAndHook } from '../../shared/createContextAndHook.ts';
import { Permission, Quota } from '@kobbleio/javascript';

export type AccessControlState = {
	permissions: Permission[];
	quotas: Quota[];
	isLoading: boolean;
	error: Error | null;
	hasPermission: (permissionNames: string[] | string) => boolean;
	hasRemainingQuota: (quotaNames: string[] | string) => boolean;
};

export const [AccessControlContext, useAccessControlContext] = createContextAndHook<AccessControlState>('AccessControlContext');
