import isAuthenticatedResolver from "../auth/isAuthenticated";
import BankAccount from "../../models/BankAccount";

const bankAccount = async (parent, { id }, { userId }) => {
	let bankAccount = await BankAccount.findById(id);
	if (!bankAccount) throw new Error("User dose not exist");

	if (bankAccount.populated("owner") !== userId) throw new Error("You are not authorized to view this bank account");

	return bankAccount;
};

export default isAuthenticatedResolver.createResolver(bankAccount);
