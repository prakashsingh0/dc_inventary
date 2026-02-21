import Stock from "../models/Stock.js";


export const addStock = async (req, res) => {
  try {
    const {
      component_type,
      model_no,
      part_no,
      asset_tag_no,
      ticket_no,
      ddr_type,
      capacity_value,
      capacity_unit,
      speed,
      serial_no
    } = req.body;

    // Basic validation
    if (!component_type || !model_no || !capacity_value || !capacity_unit || !serial_no) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    // DDR validation (only for RAM)
    if (component_type === "RAM" && !ddr_type) {
      return res.status(400).json({
        success: false,
        message: "DDR type required for RAM"
      });
    }

    // Prevent duplicate serial
    const existing = await Stock.findOne({ serial_no });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Serial number already exists"
      });
    }

    const stock = await Stock.create({
      component_type,
      model_no,
      part_no,
      asset_tag_no,
      ticket_no,
      ddr_type: component_type === "RAM" ? ddr_type : null,
      capacity_value,
      capacity_unit,
      speed,
      serial_no,
      status: "Available"
    });

    res.status(201).json({
      success: true,
      message: "Stock added successfully",
      data: stock
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find()
      .populate("server")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: stocks.length,
      data: stocks
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getAvailableStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({
      status: "Available"
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: stocks.length,
      data: stocks
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


