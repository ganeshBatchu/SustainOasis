import express from "express";
import { addComment, getFeedPosts, getUserPosts, getIsGivePosts, 
        likePost, postReceived, postSatisfied, postGive, 
        filterSatisfied, filterNotSatisfied } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { getFilteredPosts, getFilterInfo } from "../controllers/Filter.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/filters", verifyToken, getFilteredPosts);
router.get("/get/filters", verifyToken, getFilterInfo);



/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comments", verifyToken, addComment);
router.patch("/:id/satisfied", verifyToken, postSatisfied);

router.patch("/filters/receive", verifyToken, postReceived);
router.patch("/filters/give", verifyToken, postGive);
router.patch("/filters/satisfy", verifyToken, filterSatisfied);
router.patch("/filters/notsatisfy", verifyToken, filterNotSatisfied);

//router.patch("/filters/notsatisfy", verifyToken, filterNotSatisfied);

export default router;
