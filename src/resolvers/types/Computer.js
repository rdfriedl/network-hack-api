export async function network(computer, args, ctx) {
	await computer.populate("network").execPopulate();
	return computer.network;
}
