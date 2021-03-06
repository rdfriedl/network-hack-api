import isAuthenticatedResolver from "../auth/isAuthenticated";
import Network from "../../models/Network";

export const network = isAuthenticatedResolver.createResolver(async (parent, { id }, { userId }) => {
	let network = await Network.findById(id);
	if (!network) throw new Error("User dose not exist");

	if (network.owner !== userId) throw new Error("You are not authorized to view this network");

	return network;
});
