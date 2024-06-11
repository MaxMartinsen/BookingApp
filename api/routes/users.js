import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verify.js";

const router = express.Router();

/* router.get("/checkauth", verifyToken, (req, res, next) => {
  res.send("User is authenticated");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("User is verified, and can delete your account");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Admin is verified, and can delete any account as an admin");
}); */

//UPDATE

router.put("/:id", verifyUser, updateUser);

//DELETE

router.delete("/:id", verifyUser, deleteUser);

//GET

router.get("/:id", verifyUser, getUser);

//GET ALL

router.get("/", verifyAdmin, getAllUsers);

export default router;
