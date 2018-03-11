import mongoose, { Schema } from "mongoose";

const required = true;

const computerSchema = new Schema(
	{
		network: { type: Schema.Types.ObjectId, ref: "Network", required },
		name: String,
		state: {
			name: { type: String, default: "off", required }, // off, boot, on, shutdown
			updatedAt: { type: Date, default: Date.now }
		},
		stateTransition: {
			changeTo: String,
			stateDate: Date,
			endDate: Date
		}
	},
	{ timestamps: true }
);

computerSchema.method("boot", function() {
	// make sure there is not an existing transition
	if (this.stateTransition) throw new Error("There is already an existing state transition");

	// make sure the computer is on
	if (this.state.name === "off") throw new Error("The computer must be fully off before it can be shutdown");

	this.state.name = "boot";
	this.state.updatedAt = Date.now;
	this.stateTransition = {
		to: "on",
		stated: Date.now,
		end: moment()
			.add(10, "minutes")
			.toDate()
	};
});
computerSchema.method("shutdown", function() {
	// make sure there is not an existing transition
	if (this.stateTransition) throw new Error("There is already an existing state transition");

	// make sure the computer is on
	if (this.state.name === "on") throw new Error("The computer must be fully on before it can be shutdown");

	this.state.name = "shutdown";
	this.state.updatedAt = Date.now;
	this.stateTransition = {
		to: "off",
		stated: Date.now,
		end: moment()
			.add(10, "minutes")
			.toDate()
	};
});

const Computer = mongoose.model("Computer", computerSchema);

export default Computer;
