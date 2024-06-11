import Hotel from "../models/Hotel.js";
import { createError } from "./../utils/error.js";

//CREATE

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    if (error.name === "ValidationError") {
      next(createError(400, error.message));
    } else {
      next(createError(500, "Internal server error"));
    }
  }
};

//UPDATE

export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(createError(404, "Hotel not updated"));
  }
};

//DELETE

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted...");
  } catch (error) {
    next(createError(404, "Hotel not delete"));
  }
};

//GET

export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(createError(404, "Hotel not found"));
  }
};

//GET ALL

export const getAllHotels = async (req, res, next) => {
  const qNew = req.query.new;
  const qCity = req.query.city;

  try {
    let hotels;
    if (qNew) {
      hotels = await Hotel.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCity) {
      hotels = await Hotel.find({ city: qCity });
    } else {
      hotels = await Hotel.find();
    }
    res.status(200).json(hotels);
  } catch (error) {
    next(createError(404, "Hotels not found"));
  }
};
