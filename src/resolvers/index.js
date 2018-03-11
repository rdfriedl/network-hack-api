import * as queryResolvers from "./query/index";
import * as mutationResolvers from "./mutation/index";
import * as types from "./types";

const resolvers = {
	Query: queryResolvers,
	Mutation: mutationResolvers,
	...types
};

export default resolvers;
