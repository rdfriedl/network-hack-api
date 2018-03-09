import User from "../../models/User";
import isAuthenticatedResolver from "../auth/isAuthenticated";

const user = async (parent, { id }) => {
	let user = await User.findById(id);
	if (!user) throw new Error("User dose not exist");
	return user;
};

export default isAuthenticatedResolver.createResolver(user);
