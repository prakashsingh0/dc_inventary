import mongoose from "mongoose";

const serverSchema = new mongoose.Schema(
  {
    data_center: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DataCenter",
      required: true
    },
    location: String,
    serial_no: String,
    make: String,
    model_no: String,
    type_no: String,
    host_name: { type: String, required: true, unique: true },
    ip_address: { type: String, required: true, unique: true },
    amber_light: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Server", serverSchema);
