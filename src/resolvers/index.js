import rootQuery from "./query/index";
import rootMutations from "./mutations/index";
import * as types from "./types";
import * as enums from "./enums";

const resolvers = {
	Query: rootQuery,
	Mutation: rootMutations,
	...types,
	...enums
};

export default resolvers;
