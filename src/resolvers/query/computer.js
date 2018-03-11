import isAuthenticatedResolver from "../auth/isAuthenticated";
import Computer from "../../models/Computer";

const computer = async (parent, { id }, { userId }) => {
	let computer = await Computer.findById(id);
	if (!computer) throw new Error("User dose not exist");

	if (computer.owner !== userId) throw new Error("You are not authorized to view this computer");

	return computer;
};

export default isAuthenticatedResolver.createResolver(computer);
