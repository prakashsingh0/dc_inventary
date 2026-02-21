import Replacement from "../models/Replacement.js";
import Component from "../models/Component.js";
import Stock from "../models/Stock.js";
import Server from "../models/Server.js";


export const getReplacementHistory = async (req, res) => {
  try {
    const replacements = await Replacement.find()
      .populate("server", "host_name")
      .populate("old_component", "component_type serial_no")
      .populate("new_component", "component_type serial_no")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: replacements.length,
      data: replacements
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const replaceComponent = async (req, res) => {
  try {
    const {
      server_id,
      old_component_id,
      stock_id,
      slot,
      reason
    } = req.body;

    if (!server_id || !old_component_id || !stock_id || !slot) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    // 1️⃣ Check stock availability
    const stock = await Stock.findById(stock_id);

    if (!stock || stock.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Stock not available"
      });
    }

    // 2️⃣ Check slot uniqueness (Active only)
    const existing = await Component.findOne({
      server: server_id,
      slot,
      status: "Active"
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This slot already has an Active component"
      });
    }

    // 3️⃣ Mark old component as Replaced
    const oldComponent = await Component.findById(old_component_id);

    if (!oldComponent) {
      return res.status(404).json({
        success: false,
        message: "Old component not found"
      });
    }

    oldComponent.status = "Replaced";
    oldComponent.removed_on = new Date();
    await oldComponent.save();

    // 4️⃣ Create new component from stock
    const newComponent = await Component.create({
      server: server_id,
      stock: stock_id,
      component_type: stock.component_type,
      model_no: stock.model_no,
      ddr_type: stock.ddr_type,
      slot,
      capacity_value: stock.capacity_value,
      capacity_unit: stock.capacity_unit,
      speed: stock.speed,
      serial_no: stock.serial_no,
      status: "Active",
      health_status: "OK"
    });

    // 5️⃣ Update stock status
    stock.status = "Installed";
    stock.server = server_id;
    await stock.save();

    // 6️⃣ Log replacement
    await Replacement.create({
      server: server_id,
      old_component: old_component_id,
      new_component: newComponent._id,
      reason: reason || "Component replacement"
    });

    // 7️⃣ Update amber light
    const faultyCount = await Component.countDocuments({
      server: server_id,
      status: "Faulty"
    });

    await Server.findByIdAndUpdate(server_id, {
      amber_light: faultyCount > 0
    });

    res.json({
      success: true,
      message: "Component replaced successfully",
      new_component_id: newComponent._id
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


