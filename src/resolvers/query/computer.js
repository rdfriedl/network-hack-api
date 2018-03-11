import isAuthenticatedResolver from "../auth/isAuthenticated";
import Computer from "../../models/Computer";

export const computer = isAuthenticatedResolver.createResolver(async (parent, { id }, { userId }) => {
	let computer = await Computer.findById(id);
	if (!computer) throw new Error("User dose not exist");

	await computer.populate("network").execPopulate();

	if (!computer.network.owner.equals(userId)) throw new Error("You are not authorized to view this computer");

	return computer;
});
