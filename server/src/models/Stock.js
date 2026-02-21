import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    component_type: { type: String, required: true },

    model_no: String,

    part_no: String,                 // 🔹 NEW

    asset_tag_no: {                  // 🔹 NEW
      type: String,
      unique: true,
      sparse: true                   // allows null values without breaking unique
    },

    ticket_no: String,               // 🔹 NEW

    ddr_type: String,

    capacity_value: Number,

    capacity_unit: String,

    speed: String,

    serial_no: {
      type: String,
      unique: true,
      required: true
    },

    status: {
      type: String,
      enum: ["Available", "Installed"],
      default: "Available"
    },

    server: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Server",
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Stock", stockSchema);
