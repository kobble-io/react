import { FC, PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth.ts";
import { useAssertWrappedByKobbleProvider } from "../hooks/useAssertWrappedByKobbleProvider.ts";

export const SignedOut: FC<PropsWithChildren> = ({ children }) => {
	useAssertWrappedByKobbleProvider("SignedOut");

	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return null;
	}

	return <>{children}</>;
};
