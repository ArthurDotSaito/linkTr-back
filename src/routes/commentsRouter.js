import { Router } from "express";
import { validCommentSchema } from "../middleware/comment.middleware.js";
import { create, findAllComents } from "../controllers/comment.controllers.js";
import auth from "../middleware/authentication.js";

const commentRoute = Router();
commentRoute.post("/comments",auth, validCommentSchema, create);
commentRoute.get("/comments/:postid", findAllComents);

export default commentRoute;