import { createContextAndHook } from '../../shared/createContextAndHook.ts';
import { Permission, Quota } from '@kobbleio/auth-spa-js';

export type AccessControlState = {
	permissions: Permission[];
	quotas: Quota[];
	isLoading: boolean;
	error: Error | null;
	hasPermission: (permissionNames: string[] | string) => boolean;
	hasQuota: (quotaNames: string[] | string) => boolean;
};

export const [AccessControlContext, useAccessControlContext] = createContextAndHook<AccessControlState>('AccessControlContext');
