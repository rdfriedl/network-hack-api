import User from "../../models/User";
import isAuthenticatedResolver from "../auth/isAuthenticated";

export const user = isAuthenticatedResolver.createResolver(async (parent, { id }) => {
	let user = await User.findById(id);
	if (!user) throw new Error("User dose not exist");
	return user;
});

export const users = isAuthenticatedResolver.createResolver(async (parent, args, ctx) => {
	return await User.find();
});

export const me = isAuthenticatedResolver.createResolver(async (parent, args, ctx) => {
	let user = await User.findById(ctx.userId);
	if (!user) throw new Error("Failed to fetch User");
	return user;
});
