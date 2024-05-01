import { useCallback, useEffect, useRef, useState } from 'react';
import { AccessControlContext } from './AccessControlContext.tsx';

import { useKobble } from '../../hooks/useKobble.ts';
import { Permission, Quota } from '@kobbleio/javascript';
import { useAuth } from '../../hooks/useAuth.ts';

export const AccessControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [permissions, setPermissions] = useState<Permission[]>([]);
	const [quotas, setQuotas] = useState<Quota[]>([]);

	const timerIdRef = useRef<null | number>(null);

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

	const hasRemainingQuota = useCallback(
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

		const fetchData = () => {
			Promise.all([
				kobble.acl.listPermissions({
					noCache: true
				}),
				kobble.acl.listQuotas({
					noCache: true
				})
			]).then(([perms, q]) => {
				setPermissions(perms);
				setQuotas(q);
				setIsLoading(false);
			});
		};

		const stopPolling = () => {
			if (!timerIdRef.current) {
				return;
			}
			clearInterval(timerIdRef.current);
		};

		const startPolling = () => {
			if (timerIdRef.current) {
				return;
			}

			pollingCallback();
			timerIdRef.current = setInterval(pollingCallback, 5000);
		};

		const pollingCallback = async () => {
			try {
				await fetchData();
			} catch (error) {
				stopPolling();
			}
		};

		startPolling();
	}, [kobble, user]);

	return (
		<AccessControlContext.Provider
			value={{
				value: {
					permissions,
					quotas,
					hasPermission,
					hasRemainingQuota,
					isLoading,
					error: null
				}
			}}>
			{children}
		</AccessControlContext.Provider>
	);
};
