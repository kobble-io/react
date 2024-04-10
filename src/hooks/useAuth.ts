import { User } from '../context/types.ts';
import { useAuthContext } from '../context/auth/AuthContext.tsx';

export type UseAuthReturn = {
	isAuthenticated: boolean;
	user: User | null;
	isLoading: boolean;
};

export const useAuth = (): UseAuthReturn => {
	const authContext = useAuthContext();

	if (!authContext) {
		throw new Error('AuthContext not initialized. Are you using useAuth outside of the KobbleProvider?');
	}

	return {
		user: authContext?.user ?? null,
		isAuthenticated: !!authContext.user,
		isLoading: authContext.isLoading
	};
};
