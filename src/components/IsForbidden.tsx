import { FC } from 'react';
import { useAssertWrappedByKobbleProvider } from '../hooks/useAssertWrappedByKobbleProvider';
import { useAccessControl } from '../hooks/useAccessControl.ts';

const COMPONENT_NAME = 'IsForbidden';

type PropsWithChildren<P> = P & { children?: React.ReactNode };

export const IsForbidden: FC<
	PropsWithChildren<{
		permissions?: string[];
		quotas?: string[];
	}>
> = ({ children, quotas, permissions }) => {
	useAssertWrappedByKobbleProvider(COMPONENT_NAME);

	const { hasPermission, hasQuota, isLoading } = useAccessControl();

	if (isLoading) {
		return null;
	}

	if (quotas && !hasQuota(quotas)) {
		return <>{children}</>;
	}

	if (permissions && !hasPermission(permissions)) {
		return <>{children}</>;
	}

	return null;
};
