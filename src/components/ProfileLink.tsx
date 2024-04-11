import { AnchorHTMLAttributes, FC } from 'react';
import { useAssertWrappedByKobbleProvider } from '../hooks/useAssertWrappedByKobbleProvider';
import { useKobble } from '../hooks/useKobble';

const PROFILE_LINK_NAME = 'ProfileLink';
export const ProfileLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, ...rest }) => {
	useAssertWrappedByKobbleProvider(PROFILE_LINK_NAME);

	const { kobble } = useKobble();

	if (!kobble) {
		throw new Error('Kobble is not initialized. Did you forget to wrap your app in a KobbleProvider?');
	}

	const url = kobble.getPortalProfileUrl();

	return (
		<a href={url} {...rest}>
			{children}
		</a>
	);
};
