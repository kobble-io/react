import { AnchorHTMLAttributes, FC } from 'react';
import { useAssertWrappedByKobbleProvider } from '../hooks/useAssertWrappedByKobbleProvider';
import { useKobble } from '../hooks/useKobble';

const PORTAL_LINK_NAME = 'PortalLink';
export const PortalLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, ...rest }) => {
	useAssertWrappedByKobbleProvider(PORTAL_LINK_NAME);

	const { kobble } = useKobble();

	if (!kobble) {
		throw new Error('Kobble is not initialized. Did you forget to wrap your app in a KobbleProvider?');
	}

	const url = kobble.getPortalUrl();

	return (
		<a href={url} {...rest}>
			{children}
		</a>
	);
};
