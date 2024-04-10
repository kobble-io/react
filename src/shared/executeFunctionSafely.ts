export const executeFunctionSafely = async (fn: any) => {
	try {
		return await fn();
	} catch {
		return null;
	}
};
