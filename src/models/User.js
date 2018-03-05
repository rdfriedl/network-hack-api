import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose, { Schema } from "mongoose";
import { Moment } from "./types";

const userSchema = new Schema(
	{
		email: { type: String, unique: true },
		password: String,
		passwordResetToken: String,
		passwordResetExpires: Moment,

		profile: {
			name: String,
			gender: String,
			website: String,
			picture: String
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
userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
			if (err) reject(err);

			resolve(isMatch);
		});
	});
};

/** Helper method for getting user's gravatar */
userSchema.methods.gravatar = function gravatar(size) {
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
};

const User = mongoose.model("User", userSchema);

module.exports = User;
