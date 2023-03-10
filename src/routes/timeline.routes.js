import { Router } from "express";
import { postMiddleware } from "../middleware/post.middleware.js";
import auth from "../middleware/authentication.js";
import { publishPosts, getPosts } from "../controllers/post.controllers.js";
import { deletePost } from "../controllers/deletePost.js";

const timelineRoutes = Router();
timelineRoutes.post("/timelines",auth, postMiddleware, publishPosts);
timelineRoutes.get("/timelines",getPosts);
timelineRoutes.delete('/timelines/:id', auth, deletePost);

export default timelineRoutes;