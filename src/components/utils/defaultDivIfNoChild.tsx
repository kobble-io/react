export const defaultDivIfNoChild = (children: React.ReactNode | undefined, defaultText: string) => {
	if (!children) {
		children = defaultText;
	}

	if (typeof children === "string") {
		children = <div>{children}</div>;
	}
	return children;
};
