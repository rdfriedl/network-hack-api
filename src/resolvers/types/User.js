import Network from "../../models/Network";
import BankAccount from "../../models/BankAccount";

export async function networks(user, args, ctx) {
	return await Network.find({
		owner: user.id
	});
}
export async function bankAccount(user, args, ctx) {
	return await BankAccount.findOne({
		owner: user.id
	});
}
