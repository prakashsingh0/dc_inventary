import Server from "../models/Server.js";
import DataCenter from "../models/DataCenter.js";
import Component from "../models/Component.js";


export const addServer = async (req, res) => {
  try {
    const {
      data_center_id,
      location,
      serial_no,
      make,
      model_no,
      type_no,
      host_name,
      ip_address
    } = req.body;

    if (!data_center_id || !host_name || !ip_address) {
      return res.status(400).json({
        success: false,
        message: "data_center_id, host_name and ip_address are required"
      });
    }

    // Check Data Center exists
    const dc = await DataCenter.findById(data_center_id);
    if (!dc) {
      return res.status(404).json({
        success: false,
        message: "Data center not found"
      });
    }

    // Prevent duplicate host or IP
    const existing = await Server.findOne({
      $or: [{ host_name }, { ip_address }]
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Host name or IP address already exists"
      });
    }

    const server = await Server.create({
      data_center: data_center_id,
      location,
      serial_no,
      make,
      model_no,
      type_no,
      host_name,
      ip_address,
      amber_light: false
    });

    res.status(201).json({
      success: true,
      message: "Server added successfully",
      data: server
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getServersByDcLocation = async (req, res) => {
  try {
    const { location } = req.params;

    // Find matching Data Centers (case insensitive)
    const dataCenters = await DataCenter.find({
      location: { $regex: new RegExp(`^${location}$`, "i") }
    });

    if (dataCenters.length === 0) {
      return res.json({
        success: true,
        count: 0,
        data: []
      });
    }

    const dcIds = dataCenters.map(dc => dc._id);

    const servers = await Server.find({
      data_center: { $in: dcIds }
    }).populate("data_center");

    res.json({
      success: true,
      count: servers.length,
      data: servers
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getServerComponents = async (req, res) => {
  try {
    const { id } = req.params;

    const server = await Server.findById(id);

    if (!server) {
      return res.status(404).json({
        success: false,
        message: "Server not found"
      });
    }

    const components = await Component.find({
      server: id
    }).sort({ slot: 1 });

    res.json({
      success: true,
      count: components.length,
      server: server.host_name,
      data: components
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
