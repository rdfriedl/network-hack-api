import isAuthenticatedResolver from "../auth/isAuthenticated";
import Computer from "../../models/Computer";

const updateComputerResolver = isAuthenticatedResolver.createResolver(async (parent, { id }, ctx) => {
	let computer = await Computer.findById(id);
	if (!computer) throw new Error("User dose not exist");

	await computer.populate("network").execPopulate();

	if (!computer.network.owner.equals(ctx.userId)) {
		throw new Error("You are not authorized to modify this computer");
	}

	ctx.computer = computer;
});

export const updateComputerState = updateComputerResolver.createResolver(async (parent, { state }, { computer }) => {
	computer.changeState(state);
	await computer.save();
	return computer;
});
