import publishSchema from "../models/publish.models.js";

export async function postMiddleware(req,res,next){
    const body = req.body;
    const {error} = publishSchema.validate(body, {abortEarly: false});
    if(error){
        return res.status(422).send(error.details[0].message);
    }
    next();
}
