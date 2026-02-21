import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
  {
    server: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Server",
      required: true
    },

    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      default: null
    },

    component_type: {
      type: String,
      required: true
    },

    model_no: String,

    ddr_type: String,

    slot: {
      type: String,
      required: true,
      trim: true
    },

    capacity_value: Number,

    capacity_unit: String,

    speed: String,

    serial_no: String,

    status: {
      type: String,
      enum: ["Active", "Faulty", "Replaced"],
      default: "Active"
    },

    health_status: {
      type: String,
      default: "OK"
    },

    removed_on: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

//
//  Compound Unique Index
// Only enforce uniqueness when status = "Active"
//
componentSchema.index(
  { server: 1, slot: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "Active" }
  }
);

export default mongoose.model("Component", componentSchema);
