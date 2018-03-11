import * as authMutations from "./auth";
import * as profileMutations from "./profile";
import * as computerMutations from "./computer";

const rootMutations = {
	...authMutations,
	...profileMutations,
	...computerMutations
};

export default rootMutations;
