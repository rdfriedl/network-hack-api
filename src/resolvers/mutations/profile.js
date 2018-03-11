import isAuthenticatedResolver from "../auth/isAuthenticated";
import User from "../../models/User";

const updateProfile = isAuthenticatedResolver.createResolver(async (parent, { data }, ctx) => {
	let user = await User.findById(ctx.userId);
	if (!user) throw new Error("Failed to fetch User");

	Object.assign(user.profile, data);
	await user.save();

	return user;
});

export { updateProfile };
