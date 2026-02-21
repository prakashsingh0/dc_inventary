import Component from "../models/Component.js";
import Stock from "../models/Stock.js";
import Server from "../models/Server.js";


export const addComponent = async (req, res) => {
  try {
    const {
      server_id,
      component_type,
      model_no,
      ddr_type,
      slot,
      capacity_value,
      capacity_unit,
      speed,
      serial_no
    } = req.body;

    if (!server_id || !component_type || !slot || !capacity_value || !capacity_unit) {
      return res.status(400).json({
        success: false,
        message: "server_id, component_type, slot, capacity_value, capacity_unit are required"
      });
    }

    if (component_type === "RAM" && !ddr_type) {
      return res.status(400).json({
        success: false,
        message: "DDR type required for RAM"
      });
    }

    //  Slot uniqueness for Active only
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

    const component = await Component.create({
      server: server_id,
      component_type,
      model_no,
      ddr_type: component_type === "RAM" ? ddr_type : null,
      slot,
      capacity_value,
      capacity_unit,
      speed,
      serial_no,
      status: "Active",
      health_status: "OK"
    });

    res.status(201).json({
      success: true,
      message: "Component added successfully",
      data: component
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const markComponentFaulty = async (req, res) => {
  try {
    const { id } = req.params;
    const { health_status } = req.body;

    const allowedHealth = ["Faulty", "Predictive Failure"];

    if (!allowedHealth.includes(health_status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid health_status value"
      });
    }

    const component = await Component.findById(id);

    if (!component) {
      return res.status(404).json({
        success: false,
        message: "Component not found"
      });
    }

    component.status = "Faulty";
    component.health_status = health_status;
    await component.save();

    //  Update server amber_light
    const faultyCount = await Component.countDocuments({
      server: component.server,
      status: "Faulty"
    });

    await Server.findByIdAndUpdate(component.server, {
      amber_light: faultyCount > 0
    });

    res.json({
      success: true,
      message: "Component marked as faulty"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const installFromStock = async (req, res) => {
  try {
    const { server_id, stock_id, slot } = req.body;

    if (!server_id || !stock_id || !slot) {
      return res.status(400).json({
        success: false,
        message: "server_id, stock_id and slot are required"
      });
    }

    const stock = await Stock.findById(stock_id);

    if (!stock || stock.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Stock not available"
      });
    }

    //  Slot uniqueness
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

    //  Create component from stock
    const component = await Component.create({
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

    //  Update stock status
    stock.status = "Installed";
    stock.server = server_id;
    await stock.save();

    res.json({
      success: true,
      message: "Component installed successfully",
      data: component
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

