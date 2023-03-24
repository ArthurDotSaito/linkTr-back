import db from "../database/databaseConnection.js";

export const getPostCounter = async(req,res) =>{
    try{
        const time = req.query.time;
        console.log(time)
        const dbResult  = await db.query('SELECT COUNT(*) AS newPostCount FROM posts WHERE "createdAt" > $1', [time])
        console.log(dbResult.rows[0]);
        res.json({newPostCount: dbResult.rows[0].newPostCount})
    }catch(error){
        console.log("erro no endPoint getPostCounter");
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}