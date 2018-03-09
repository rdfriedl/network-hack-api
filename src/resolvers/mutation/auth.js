import jwt from "jsonwebtoken";

import User from "../../models/User";
import { createToken } from "../../auth";

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

// register a new user
export async function signup(parent, { email, password }) {
	let existingUser = await User.findOne({ email: email });
	if (existingUser) throw new Error("User already exists with that email");

	const user = await User.create({
		email,
		password
	});

	const token = createToken(user);

	return { token };
}

// log in an existing user
export async function login(parent, { email, password }) {
	const user = await User.findOne({ email });
	if (!user) throw new Error(`No user found for email: ${email}`);

	let isMatch = await user.comparePassword(password);
	if (!isMatch) throw new Error("Invalid password");

	const token = createToken(user);
	return { token };
}

export async function sendResetPasswordToken(parent, { email }) {
	const user = await User.findOne({ email });
	if (!user) throw new Error(`No user found for email: ${email}`);

	user.passwordResetToken = createToken(user, "1 hour");
	await user.save();

	return true;
}
