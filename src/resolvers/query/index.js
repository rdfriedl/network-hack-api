import * as userResolvers from "./user";
import * as computerResolvers from "./computer";
import * as networkResolvers from "./network";
import * as bankAccountResolvers from "./bankAccount";

const rootQuery = {
	...userResolvers,
	...bankAccountResolvers,
	...computerResolvers,
	...networkResolvers
};

export default rootQuery;
