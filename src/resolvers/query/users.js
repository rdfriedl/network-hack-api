import User from "../../models/User";
import { getAuthorization } from "../../auth";

const users = (parent, args, ctx) => {
	getAuthorization(ctx);

	return User.find();
};

export default users;
