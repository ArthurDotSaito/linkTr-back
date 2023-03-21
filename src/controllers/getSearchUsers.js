import db from "../database/databaseConnection.js";

export async function searchUsers(req, res){
    const findUser = req.query.q;
    console.log(findUser)
    try{
        const dbResponse = await db.query('SELECT id, username, icon FROM users  WHERE username ILIKE $1 LIMIT 3', [`%${findUser}%`]);
        console.log(dbResponse.rows)
        res.status(200).send(dbResponse.rows);
    }catch(error){
        console.log("Erro na busca de usuarios");
        res.status(500).send(error.message);
    }
}