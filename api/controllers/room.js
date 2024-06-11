import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

//CREATE
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    return next(createError(404, "Hotel not found"));
  }

  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
      res.status(201).json(savedRoom);
    } catch (error) {
      next(createError(500, "Failed to add room to hotel"));
    }
  } catch (error) {
    next(createError(400, err.message));
  }
};

//UPDATE

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(createError(404, "Room not updated"));
  }
};

//DELETE

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
      res.status(200).json("Room deleted");
    } catch (error) {
      next(createError(500, "Failed to delete room from hotel"));
    }
  } catch (error) {
    next(createError(404, "Room not delete"));
  }
};

//GET

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(createError(404, "Room not found"));
  }
};

//GET ALL

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(createError(404, "Rooms not found"));
  }
};
