import mongoose, { Schema } from "mongoose";
import moment from "moment";

const required = true;

export const PowerStates = {
	BOOT: "boot",
	ON: "on",
	SHUTDOWN: "shutdown",
	OFF: "off"
};
export const PowerStateNames = {
	BOOT: "Booting",
	ON: "On",
	SHUTDOWN: "Shutting down",
	OFF: "Off"
};
export const StateTransitions = {
	[PowerStates.BOOT]: {
		time: 10,
		changeTo: PowerStates.ON
	},
	[PowerStates.SHUTDOWN]: {
		time: 10,
		changeTo: PowerStates.OFF
	}
};

const computerSchema = new Schema(
	{
		network: { type: Schema.Types.ObjectId, ref: "Network", required },
		name: String,
		state: {
			current: { type: String, default: PowerStates.OFF, enum: Object.values(PowerStates) },
			updatedAt: { type: Date, default: Date.now }
		}
	},
	{ timestamps: true }
);

computerSchema.method("changeState", function(nextState) {
	if (this.state.current in StateTransitions) {
		throw new Error("Cant update the computer state while its in transition");
	}

	this.state.current = nextState;
	this.state.updatedAt = Date.now();
});

const Computer = mongoose.model("Computer", computerSchema);

export default Computer;
