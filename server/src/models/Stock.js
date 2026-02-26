import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    component_type: {
      type: String,
      required: true,
      enum: ["RAM", "HDD"], //  restrict values
      index: true           //  improves filtering performance
    },

    model_no: {
      type: String,
      required: true
    },

    part_no: String,

    asset_tag_no: {
      type: String,
      unique: true,
      sparse: true
    },

    ticket_no: String,

    //  RAM specific
    ddr_type: {
      type: String,
      enum: ["DDR3", "DDR4", "DDR5", null],
      default: null
    },

    speed: String,

    //  Capacity (works for both RAM & HDD)
    capacity_value: {
      type: Number,
      required: true
    },

    capacity_unit: {
      type: String,
      enum: ["GB", "TB"],
      required: true
    },

    serial_no: {
      type: String,
      unique: true,
      required: true
    },

    status: {
      type: String,
      enum: ["Available", "Installed"],
      default: "Available",
      index: true
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