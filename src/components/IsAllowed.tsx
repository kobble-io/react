import { FC } from 'react';
import { useAssertWrappedByKobbleProvider } from '../hooks/useAssertWrappedByKobbleProvider';
import { useAccessControl } from '../hooks/useAccessControl.ts';

const COMPONENT_NAME = 'IsAllowed';

type PropsWithChildren<P> = P & { children?: React.ReactNode };

export const IsAllowed: FC<
	PropsWithChildren<{
		permissions?: string[];
		quotas?: string[];
	}>
> = ({ children, quotas, permissions }) => {
	useAssertWrappedByKobbleProvider(COMPONENT_NAME);

	const { hasPermission, hasRemainingQuota, isLoading } = useAccessControl();

	if (isLoading) {
		return null;
	}

	if (quotas && !hasRemainingQuota(quotas)) {
		return null;
	}

	if (permissions && !hasPermission(permissions)) {
		return null;
	}

	return <>{children}</>;
};
