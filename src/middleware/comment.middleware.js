import { commentSchema } from "../models/comment.models.js";
import db from "../database/databaseConnection.js";

export async function validCommentSchema(req,res,next){
    const comment = req.body;
    const {error} = commentSchema.validate(comment, {abortEarly: false});
    if(error){
        const errors = error.details.map(detail => detail.message);
        return res.status(400).send({errors});
    }


    res.locals.comment = comment;
   
 
    console.log(error);

    next();


 }