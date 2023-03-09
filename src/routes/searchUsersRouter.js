import { Router } from "express";
import { searchUsers } from "../controllers/getSearchUsers.js";

const userSearch = Router();

userSearch.get("/search", searchUsers)

export default userSearch;