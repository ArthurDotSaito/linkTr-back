import db from "../../database/databaseConnection.js";

export const validateToken = async(req, res, next) =>{
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Token não encontrado.");
    token = token.replace("Bearer ", "");

    try{
        const dbResponse = await db.query("SELECT * FROM sessions WHERE token = $1", [token]);
        if(dbResponse.rowCount === 0) return res.status(401).send("Token não encontrado na DB.");

        req.userId = dbResponse.rows[0].userId;

    }catch(error){
        console.log("erro ao tentar validar o token!");
        console.log(error.details)
        const errorMessage = error.details.map(err => err.message).join(", ");
        res.status(500).json({message: errorMessage});
    }
    next();
} 