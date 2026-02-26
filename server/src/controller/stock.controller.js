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

    // 🔹 Required field validation
    if (
      !component_type ||
      !model_no ||
      !capacity_value ||
      !capacity_unit ||
      !serial_no
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    // 🔹 Validate component type
    if (!["RAM", "HDD"].includes(component_type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid component type"
      });
    }

    // 🔹 Validate capacity unit
    if (!["GB", "TB"].includes(capacity_unit)) {
      return res.status(400).json({
        success: false,
        message: "Invalid capacity unit"
      });
    }

    // 🔹 RAM specific validation
    if (component_type === "RAM" && !ddr_type) {
      return res.status(400).json({
        success: false,
        message: "DDR type is required for RAM"
      });
    }

    // 🔹 Prevent duplicate serial
    const existingSerial = await Stock.findOne({ serial_no });
    if (existingSerial) {
      return res.status(400).json({
        success: false,
        message: "Serial number already exists"
      });
    }

    // 🔹 Prevent duplicate asset tag (if provided)
    if (asset_tag_no) {
      const existingAsset = await Stock.findOne({ asset_tag_no });
      if (existingAsset) {
        return res.status(400).json({
          success: false,
          message: "Asset tag already exists"
        });
      }
    }

    const stock = await Stock.create({
      component_type,
      model_no,
      part_no,
      asset_tag_no,
      ticket_no,
      ddr_type: component_type === "RAM" ? ddr_type : null,
      capacity_value: Number(capacity_value),
      capacity_unit,
      speed,
      serial_no
      // status default handled by schema
    });

    res.status(201).json({
      success: true,
      message: "Stock added successfully",
      data: stock
    });

  } catch (error) {
    console.error("ADD STOCK ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
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
    console.error("GET STOCKS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
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
    console.error("GET AVAILABLE STOCKS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

