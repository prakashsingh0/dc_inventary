// import mysql from "mysql2/promise";
// import dotenv from 'dotenv'
// dotenv.config()
// export const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10
// });

// //  TEST CONNECTION
// (async () => {
//   try {


//     const connection = await db.getConnection();
//     console.log(" MySQL Database connected successfully");
//     connection.release();
//   } catch (error) {
//     console.error(" MySQL connection failed:", error.message);
//   }
// })();


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Atlas Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
