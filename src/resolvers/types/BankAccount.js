export async function owner(bankAccount, args, ctx) {
	await bankAccount.populate("owner").execPopulate();
	return bankAccount.owner;
}
