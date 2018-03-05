import User from "../../models/User";
import { getUserId } from "../../auth";

const me = async (parent, args, ctx, info) => {
	let userId = getUserId(ctx);
	return await User.findById(userId);
};

export default me;
