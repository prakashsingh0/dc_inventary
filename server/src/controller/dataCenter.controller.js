import DataCenter from "../models/DataCenter.js";

export const addDataCenter = async (req, res) => {
  try {
    const { name, location } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name is required"
      });
    }

    const existing = await DataCenter.findOne({ name });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Data center already exists"
      });
    }

    const dataCenter = await DataCenter.create({
      name,
      location
    });

    res.status(201).json({
      success: true,
      message: "Data center added successfully",
      data: dataCenter
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
