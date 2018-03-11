import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose, { Schema } from "mongoose";
import { generate as generateName } from "namor";

import BankAccount from "./BankAccount";
import Network from "./Network";
import Computer from "./Computer";

const userSchema = new Schema(
	{
		email: { type: String, unique: true },
		password: String,
		passwordResetToken: String,

		isSetup: { type: Boolean, default: false },
		profile: {
			name: { type: String, default: () => generateName({ manly: true }) },
			website: String,
			bio: String
		}
	},
	{ timestamps: true }
);

/** Password hash middleware */
userSchema.pre("save", function save(next) {
	const user = this;
	if (!user.isModified("password")) {
		return next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

/* Helper method for validating user's password */
userSchema.method("comparePassword", function(candidatePassword) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
			if (err) reject(err);

			resolve(isMatch);
		});
	});
});

/** Helper method for getting user's gravatar */
userSchema.method("gravatar", function(size) {
	if (!size) {
		size = 200;
	}
	if (!this.email) {
		return `https://gravatar.com/avatar/?s=${size}&d=retro`;
	}
	const md5 = crypto
		.createHash("md5")
		.update(this.email)
		.digest("hex");
	return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
});

userSchema.method("setup", async function() {
	if (this.isSetup) throw new Error("User has already been setup");

	// create bank account
	await BankAccount.create({
		owner: this.id,
		amount: 100
	});
	// create the root network
	let network = await Network.create({
		owner: this.id
	});
	// give the user a computer
	await Computer.create({
		owner: this.id,
		network: network.id
	});

	this.isSetup = true;
	await this.save();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
