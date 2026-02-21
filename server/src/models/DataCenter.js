import mongoose from "mongoose";

const dataCenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("DataCenter", dataCenterSchema);
