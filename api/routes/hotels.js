//api/routes/hotels.js

import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();

//CREATE

router.post("/", verifyAdmin, createHotel);

//UPDATE

router.put("/:id", verifyAdmin, updateHotel);

//DELETE

router.delete("/:id", verifyAdmin, deleteHotel);

//GET

router.get("/:id", getHotel);

//GET ALL

router.get("/", getAllHotels);

export default router;
