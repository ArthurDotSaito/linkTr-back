import db from "../database/databaseConnection.js";

export const getPostCounter = async(req,res) =>{
    try{
        const datetime = new Date(req.query.time);
        console.log(datetime)
        const dbResult  = await db.query('SELECT COUNT(*) AS newPostCount FROM posts WHERE "createdAt" > $1', [datetime])
        console.log(dbResult.rows[0]);
        res.send(dbResult.rows[0])
    }catch(error){
        console.log("erro no endPoint getPostCounter");
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}