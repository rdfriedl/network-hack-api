import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

export function createToken(user, expiresIn = "1 week") {
	return jwt.sign({ userId: user.id }, JWT_SECRET, {
		expiresIn,
		issuer: JWT_ISSUER,
		audience: JWT_AUDIENCE
	});
}

export function verifyToken(token) {
	return jwt.verify(token, JWT_SECRET, {
		expiresIn: "1 week",
		issuer: JWT_ISSUER,
		audience: JWT_AUDIENCE
	});
}

export function getAuthorizationToken(req) {
	const authorization = req.get("Authorization") || "";
	return authorization.replace("Bearer ", "");
}
