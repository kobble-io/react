import { FC } from 'react';
import { useAssertWrappedByKobbleProvider } from '../hooks/useAssertWrappedByKobbleProvider';
import { useAccessControl } from '../hooks/useAccessControl.ts';

const COMPONENT_NAME = 'IsForbidden';

type PropsWithChildren<P> = P & { children?: React.ReactNode };

export const IsForbidden: FC<
	PropsWithChildren<{
		permission?: string[] | string;
		quota?: string[] | string;
	}>
> = ({ children, quota, permission }) => {
	useAssertWrappedByKobbleProvider(COMPONENT_NAME);

	const { hasPermission, hasRemainingQuota, isLoading } = useAccessControl();

	if (isLoading) {
		return null;
	}

	if (quota && !hasRemainingQuota(quota)) {
		return <>{children}</>;
	}

	if (permission && !hasPermission(permission)) {
		return <>{children}</>;
	}

	return null;
};
