import { AccessControlState, useAccessControlContext } from '../context/access-control/AccessControlContext.tsx';

export type UseAccessControlReturn = AccessControlState;

export const useAccessControl = (): UseAccessControlReturn => {
	const context = useAccessControlContext();

	if (!context) {
		throw new Error('AccessControlContext not initialized. Are you using useAccessControl outside of the KobbleProvider?');
	}

	return {
		...context
	};
};
