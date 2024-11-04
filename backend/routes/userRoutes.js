import express from "express";
const router = express.Router();
import {signupUser,loginUser, logoutUser,followUnFollowUser,updateUser, getUserProfile,getSuggestedUsers} from "../controllers/userController.js";
import protectRoute from "../middleware/protecRoute.js";
// Define signup route
router.post("/signup", signupUser);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id",protectRoute, followUnFollowUser);
router.put("/update/:id", protectRoute, updateUser);
router.get("/profile/:query", getUserProfile);

export default router;
