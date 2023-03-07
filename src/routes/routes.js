import express from "express";
import cors from "cors";
import auth from "../middleware/authentication";

const router = express.Router();
router.use(cors());
router.use(express.json());

router.use(auth)
router.get("/hashtag/:hashtag")

export default router;
