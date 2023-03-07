import express from "express";
import cors from "cors";
import auth from "../middleware/authentication.js";
import authRouter from "./authRouter.js";
import * as posts from "../controllers/postsController.js";

const router = express.Router();
router.use(cors());
router.use(express.json());

router.use(auth);
router.use(authRouter);
router.get("/hashtag/:hashtag", posts.topTrendings);

export default router;
