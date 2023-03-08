import { Router } from "express";
import { postMiddleware } from "../middleware/post.middleware.js";
import auth from "../middleware/authentication.js";

import { publishPosts, getPosts } from "../controllers/post.controllers.js";


const timelineRoutes = Router();
timelineRoutes.post("/timelines",auth,postMiddleware,publishPosts);
timelineRoutes.get("/timelines",getPosts);

export default timelineRoutes;