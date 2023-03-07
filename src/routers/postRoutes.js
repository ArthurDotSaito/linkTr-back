import express from 'express';
import { deletePost } from '../controllers/post/deletePost.js';
import { validateToken } from '../middlewares/token/validateToken.js';


const postRoutes = express.Router();

postRoutes.delete('/timeline/:id', validateToken, deletePost)


export default postRoutes;