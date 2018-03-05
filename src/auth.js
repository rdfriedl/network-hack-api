import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

export function getAuthorization(req) {
	const authorization = req.get && req.get("Authorization");
	if (!authorization) throw new AuthError();

	return authorization.replace("Bearer ", "");
}

export function getUserId(req) {
	const token = getAuthorization(req);
	const { userId } = jwt.verify(token, JWT_SECRET, {
		expiresIn: "1 week",
		issuer: JWT_ISSUER,
		audience: JWT_AUDIENCE
	});
	return userId;
}

class AuthError extends Error {
	constructor() {
		super("Not authorized");
	}
}
