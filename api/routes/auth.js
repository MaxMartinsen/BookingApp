import express from "express";
import { register } from "../controllers/auth.js";

const router = express.Router();

//REGISTER
router.get("/register", register);

export default router;
