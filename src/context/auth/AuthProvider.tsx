import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext.tsx';
import { User } from '../types.ts';
import { useKobble } from '../../hooks/useKobble.ts';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	const isAuthenticated = useMemo(() => !!user, [user]);

	const isLoading = user === undefined;

	const { kobble } = useKobble();
	const [isListenerReady, setIsListenerReady] = useState<boolean>(false);

	useEffect(() => {
		if (!kobble || isListenerReady) {
			return;
		}

		kobble.onAuthStateChanged((data) => {
			setUser(data.user);
		});

		setIsListenerReady(true);
	}, [kobble, isListenerReady]);

	return (
		<AuthContext.Provider
			value={{
				value: {
					user,
					isAuthenticated,
					isLoading,
					error: null
				}
			}}>
			{children}
		</AuthContext.Provider>
	);
};
