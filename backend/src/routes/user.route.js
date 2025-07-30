import express from "express";
import { getUserProfile, syncUser, updateProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/profile/:username", getUserProfile);
userRoutes.post("/sync", protectRoute ,syncUser)
userRoutes.put("/profile", protectRoute,updateProfile)


export default userRoutes;
