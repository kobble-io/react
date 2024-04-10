import React from 'react';

export const assertSingleChild = (sourceName: string, children: React.ReactNode) => {
	try {
		return React.Children.only(children);
	} catch (e) {
		throw new Error('Expected a single child for ' + sourceName + ' but got ' + React.Children.count(children) + ' children.');
	}
};
