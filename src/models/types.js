import moment from "moment";

export const Moment = {
	type: Date,
	get(val) {
		return moment(val);
	},
	set(val) {
		return moment(val).toDate();
	}
};
