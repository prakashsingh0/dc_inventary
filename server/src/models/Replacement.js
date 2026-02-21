import mongoose from "mongoose";

const replacementSchema = new mongoose.Schema(
  {
    server: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Server"
    },
    old_component: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component"
    },
    new_component: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component"
    },
    reason: String
  },
  { timestamps: true }
);

export default mongoose.model("Replacement", replacementSchema);
