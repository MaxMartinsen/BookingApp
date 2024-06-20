//api/index.js

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

// Connection event handler
function handleConnectionEvent(event) {
  console.log(`MongoDB ${event}`);
}

// Assign event handlers
mongoose.connection.on("disconnected", () =>
  handleConnectionEvent("disconnected")
);
mongoose.connection.on("connected", () => handleConnectionEvent("connected"));
mongoose.connection.on("reconnected", () =>
  handleConnectionEvent("reconnected")
);
mongoose.connection.on("error", (error) =>
  console.log(`MongoDB connection error: ${error}`)
);

//middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/hotels", hotelsRoute);
app.use("/api/v1/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";
  const errorResponse = {
    success: false,
    status: errorStatus,
    message: errorMessage,
  };
  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = err.stack;
  }
  return res.status(errorStatus).json(errorResponse);
});

app.listen(8800, () => {
  connect();
  console.log("Server is running on port 8800");
});
