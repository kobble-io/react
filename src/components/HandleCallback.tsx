import { FC, PropsWithChildren } from 'react';
import { useAssertWrappedByKobbleProvider } from '../hooks/useAssertWrappedByKobbleProvider';
import { useHandleRedirect } from '../hooks/useHandleRedirect';
import { defaultDivIfNoChild } from './utils/defaultDivIfNoChild';

export interface NavigateOptions {
	replace?: boolean;
	state?: any;
	preventScrollReset?: boolean;
	relative?: any;
	unstable_flushSync?: boolean;
	unstable_viewTransition?: boolean;
}

export interface Path {
	/**
	 * A URL pathname, beginning with a /.
	 */
	pathname: string;

	/**
	 * A URL search string, beginning with a ?.
	 */
	search: string;

	/**
	 * A URL fragment identifier, beginning with a #.
	 */
	hash: string;
}

export type To = string | Partial<Path>;

export interface NavigateFunction {
	(to: To, options?: NavigateOptions): void;

	(delta: number): void;
}

export type HandleCallbackProps =
	| {
			navigate: NavigateFunction;
			afterSignInUrl: string;
			onError?: (message: string) => void;
	  }
	| {
			navigate: undefined;
			afterSignInUrl: undefined;
			onError?: (message: string) => void;
	  };

export const HandleCallback: FC<PropsWithChildren & HandleCallbackProps> = ({ children, navigate, afterSignInUrl, onError }) => {
	useAssertWrappedByKobbleProvider('HandleCallback');

	useHandleRedirect({
		onSuccess: () => {
			if (navigate) {
				navigate(afterSignInUrl || '/');
			}
		},
		onError: (e) => {
			if (typeof onError === 'function') {
				onError(e);
			}
		}
	});

	const defaultOrChildren = defaultDivIfNoChild(children, 'Authenticating...');

	return <>{defaultOrChildren}</>;
};
