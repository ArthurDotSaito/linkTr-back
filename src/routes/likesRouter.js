import { Router } from "express";
import { putLike } from "../controllers/putLike.js";
import auth from "../middleware/authentication.js";

const likesRoutes = Router();

likesRoutes.put('/likes/:id', auth, putLike);

export default likesRoutes;