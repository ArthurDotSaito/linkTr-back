import express from "express";
import cors from "cors";
import auth from "../middleware/authentication.js";
import * as posts from "../controllers/postsController.js";
import * as timeline from "../controllers/post.controllers.js"

const router = express.Router();
router.use(cors());
router.use(express.json());

router.get("userTimeline/:id", timeline.getPostByUserId)

router.use(auth)

router.get("/treadings", posts.topTrendings)

export default router;
