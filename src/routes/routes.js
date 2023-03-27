import express, { Router } from "express";
import cors from "cors";
import auth from "../middleware/authentication.js";
import * as posts from "../controllers/postsController.js";
import * as users from "../controllers/userController.js";
import { validateSchema } from "../middleware/validator.js";
import publishSchema from "../schemas/publishPostSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";

const router = express.Router();
router.use(cors());
router.use(express.json());

// START POST ROUTES
router.post("/signup", validateSchema(signUpSchema), users.signUp);
router.post("/signin", validateSchema(signInSchema), users.signIn);

// START GET ROUTES
router.get("userTimeline/:id", posts.getPostByUserId);
router.get("/timelines", posts.getPosts);
router.get("/treadings", posts.topTrendings);0

router.get("/search", users.searchUsers);

// START DELETE ROUTES
router.delete("/logout", users.logout);

/* //IMPORTANT
    everything down below the line "router.use(auth)" will auto authenticate. Everything 
    in here will be pass thrugh the authentication.js 
    and if is correct the user information will be saved on "res.locals.auth" (use without "").

    EX: const user = res.locals.auth
*/

router.use(auth);

// START AUTH ROUTES GET
router.get("/timelinesusers", posts.getPostByFollowers)

router.get("/connections/:id", users.isfollow)

// START AUTH ROUTES POST
router.post("/timelines", validateSchema(publishSchema), posts.publishPosts);

router.post("connections/:id", users.addFollow)

// START AUTH DELETE ROUTE
router.delete("/timelines/:id", posts.deletePost);

router.delete("/connections/:id", users.removeFollow);

// START AUTH PUT ROUTES
router.put("/likes/:id", posts.putLike);

export default router;
