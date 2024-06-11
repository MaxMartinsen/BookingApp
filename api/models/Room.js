//api/models/Room.js

import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    numbers: [
      {
        number: Number,
        unavailableDates: [{ type: Date }],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
