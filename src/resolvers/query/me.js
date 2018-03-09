import User from "../../models/User";
import isAuthenticatedResolver from "../auth/isAuthenticated";

const me = async (parent, args, ctx) => {
	let user = await User.findById(ctx.userId);
	if (!user) throw new Error("Failed to fetch User");
	return user;
};

export default isAuthenticatedResolver.createResolver(me);
