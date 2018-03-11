import Computer from "../../models/Computer";

export async function computers(network, args, ctx) {
	return await Computer.find({
		network: network.id
	});
}
export async function owner(network, args, ctx) {
	await network.populate("owner").execPopulate();
	return network.owner;
}
