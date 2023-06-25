import express from "express";
import { getFilteredPosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// router.get("/", verifyToken, getFeedPosts);
// router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/filters", verifyToken, getFilteredPosts);

/* UPDATE */
// router.patch("/:id/like", verifyToken, likePost);
// router.patch("/:id/comments", verifyToken, addComment);
// router.patch("/:id/satisfied", verifyToken, postSatisfied);

export default router;