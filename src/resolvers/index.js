import * as queryResolvers from "./query/index";
import * as mutationResolvers from "./mutation/index";

const resolvers = {
	Query: queryResolvers,
	Mutation: mutationResolvers
};

export default resolvers;
