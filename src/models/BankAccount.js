import mongoose, { Schema } from "mongoose";

const required = true;

const bankAccountSchema = new Schema(
	{
		owner: { type: Schema.Types.ObjectId, ref: "User", required },
		amount: { type: Number, default: 0 }
	},
	{ timestamps: true }
);

const BankAccount = mongoose.model("BankAccount", bankAccountSchema);

export default BankAccount;
