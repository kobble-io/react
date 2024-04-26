import { useCallback, useEffect, useState } from 'react';
import { AccessControlContext } from './AccessControlContext.tsx';

import { useKobble } from '../../hooks/useKobble.ts';
import { Permission, Quota } from '@kobbleio/auth-spa-js';
import { useAuth } from '../../hooks/useAuth.ts';

export const AccessControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [permissions, setPermissions] = useState<Permission[]>([]);
	const [quotas, setQuotas] = useState<Quota[]>([]);

	const { kobble } = useKobble();
	const { user } = useAuth();

	const hasPermission = useCallback(
		(permissionNames: string[] | string) => {
			const names = Array.isArray(permissionNames) ? permissionNames : [permissionNames];

			return names.every((name) => {
				const permission = permissions.find((p) => p.name === name);
				return !!permission;
			});
		},
		[permissions]
	);

	const hasQuota = useCallback(
		(quotaNames: string[] | string) => {
			const names = Array.isArray(quotaNames) ? quotaNames : [quotaNames];

			return names.every((name) => {
				const quota = quotas.find((q) => q.name === name);
				return (quota?.remaining ?? 0) > 0;
			});
		},
		[quotas]
	);

	useEffect(() => {
		if (!kobble || !user) {
			return;
		}

		Promise.all([kobble.acl.listPermissions(), kobble.acl.listQuotas()]).then(([perms, q]) => {
			setPermissions(perms);
			setQuotas(q);
			setIsLoading(false);
		});
	}, [kobble, user]);

	return (
		<AccessControlContext.Provider
			value={{
				value: {
					permissions,
					quotas,
					hasPermission,
					hasQuota,
					isLoading,
					error: null
				}
			}}>
			{children}
		</AccessControlContext.Provider>
	);
};
