import React, { FC, PropsWithChildren } from 'react';
import { useAssertWrappedByKobbleProvider } from '../hooks/useAssertWrappedByKobbleProvider';
import { assertSingleChild } from '../shared/assertSingleChild';
import { useKobble } from '../hooks/useKobble';
import { executeFunctionSafely } from '../shared/executeFunctionSafely';
import { defaultButtonIfNoChild } from './utils/defaultButtonIfNoChild';

const LOGOUT_BUTTON_NAME = 'LogoutButton';

export const LogoutButton: FC<PropsWithChildren> = ({ children, ...rest }) => {
	useAssertWrappedByKobbleProvider(LOGOUT_BUTTON_NAME);

	const { kobble } = useKobble();

	const defaultChildren = defaultButtonIfNoChild(children, 'Logout');
	const child = assertSingleChild(LOGOUT_BUTTON_NAME, defaultChildren);

	const ourClickHandler = async () => {
		await executeFunctionSafely((child as any).props.onClick);

		return kobble?.logout();
	};

	const childProps = { ...rest, onClick: ourClickHandler };

	return React.cloneElement(child as React.ReactElement<unknown>, childProps);
};
