import db from "../database/databaseConnection.js";
export async function create(req,res){
    const userId = res.locals.auth;
    try{

        const {comment, postId} = res.locals.comment;
        await db.query(`INSERT INTO comments (comment, userid, postid) VALUES ($1, $2, $3)`,[comment, userId, postId])
        res.sendStatus(201);
    }catch(err){
        console.log(err);
    }
    
}

export async function findAllComents(req,res){
    const {postid} = req.params;

    try{
        

       const getAllComments = await db.query(`
            SELECT 
                users.id AS "userId",
                users.username AS "userName",
                users.icon AS "userImage",
                posts.id AS "postId",
                comments.comment AS "commentText"

            FROM    
                comments
            JOIN    
                users
            ON
                comments.userid = users.id
            JOIN 
                posts
            ON
                comments.postid = posts.id
            WHERE
                posts.id=$1
           
       
       `,[postid]);
       res.status(200).send(getAllComments.rows);
       console.log(getAllComments);
       
    }catch(err){
        console.log(err);
    }
}