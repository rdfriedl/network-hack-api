import User from "../../models/User";
import isAuthenticatedResolver from "../auth/isAuthenticated";

const users = async (parent, args, ctx) => {
	return await User.find();
};

export default isAuthenticatedResolver.createResolver(users);
