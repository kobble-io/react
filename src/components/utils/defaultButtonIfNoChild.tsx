export const defaultButtonIfNoChild = (
	children: React.ReactNode | undefined,
	defaultText: string
) => {
	if (!children) {
		children = defaultText;
	}

	if (typeof children === "string") {
		children = <button>{children}</button>;
	}
	return children;
};
