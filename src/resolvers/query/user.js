import User from "../../models/User";
import { getAuthorization } from "../../auth";

const user = async (parent, { id }, ctx) => {
	getAuthorization(ctx);

	let user = await User.findById(id);
	if (!user) throw new Error("User dose not exist");
	return user;
};

export default user;
