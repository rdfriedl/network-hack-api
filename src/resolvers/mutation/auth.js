import jwt from "jsonwebtoken";

import User from "../../models/User";

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

function createJqtToken(user) {
	return jwt.sign({ userId: user.id }, JWT_SECRET, {
		expiresIn: "1 week",
		issuer: JWT_ISSUER,
		audience: JWT_AUDIENCE
	});
}

// register a new user
export async function signup(parent, { email, password }, ctx, info) {
	let existingUser = await User.findOne({ email: email });
	if (existingUser) throw new Error("user already exists with that email");

	const user = await User.create({
		email,
		password
	});

	const token = createJqtToken(user);

	return { token };
}

// log in an existing user
export async function login(parent, { email, password }, ctx, info) {
	const user = await User.findOne({ email });
	if (!user) throw new Error(`No such user found for email: ${email}`);

	let isMatch = await user.comparePassword(password);
	if (!isMatch) throw new Error("Invalid password");

	const token = createJqtToken(user);
	return { token };
}
