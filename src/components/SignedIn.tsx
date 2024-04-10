import { FC, PropsWithChildren } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAssertWrappedByKobbleProvider } from '../hooks/useAssertWrappedByKobbleProvider';

export const SignedIn: FC<PropsWithChildren> = ({ children }) => {
	useAssertWrappedByKobbleProvider('SignedIn');

	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
};
