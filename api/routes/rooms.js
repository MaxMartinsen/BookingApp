//api/routes/rooms.js

import express from "express";
import { verifyAdmin } from "../utils/verify.js";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../controllers/room.js";

const router = express.Router();

//CREATE

router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE

router.put("/:id", verifyAdmin, updateRoom);

//DELETE

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET

router.get("/:id", getRoom);

//GET ALL

router.get("/", getAllRooms);

export default router;
