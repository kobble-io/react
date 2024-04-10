import { createContextAndHook } from "../../shared/createContextAndHook.ts";
import { User } from "../types.ts";

export type AuthContextState = {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: Error | null;
};

export const [AuthContext, useAuthContext] = createContextAndHook<AuthContextState>("AuthContext");
