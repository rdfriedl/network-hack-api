import mongoose, { Schema } from "mongoose";

const required = true;

const networkSchema = new Schema(
	{
		owner: { type: Schema.Types.ObjectId, ref: "User", required },
		parent: { type: Schema.Types.ObjectId, ref: "Network" }
	},
	{ timestamps: true }
);

networkSchema.method("isRoot", function() {
	return !!this.parent;
});

const Network = mongoose.model("Network", networkSchema);

export default Network;
