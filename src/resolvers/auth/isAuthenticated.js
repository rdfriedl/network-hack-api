import { createResolver } from "apollo-resolvers";

// TODO: look into https://github.com/thebigredgeek/apollo-errors for errors
class AuthError extends Error {
	constructor() {
		super("Not authorized");
	}
}

const isAuthenticatedResolver = createResolver((parent, args, ctx) => {
	if (!ctx.userId || !ctx.token) throw new AuthError();
});

export default isAuthenticatedResolver;
