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

//GET COUNT BY CITY

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(createError(404, "Hotel not found"));
  }
};

//GET COUNT BY TYPE

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(createError(404, "Hotel not found"));
  }
};
