import db from "../database/databaseConnection.js";

export const deletePost = async(req,res) =>{
    const postId = Number(req.params.id);
    const userId = res.locals.auth;
    try{
        const dbResponse = await db.query('SELECT id FROM posts WHERE "userId"=$1',[userId]);
        console.log(dbResponse.rows[0])
        if(dbResponse.rowCount === 0){
            return res.status(404).send("userId não encontrado");
        }else{
            const deleteResponse = await db.query("DELETE FROM posts WHERE id = $1", [postId]);
            if(deleteResponse.rowCount === 0) return res.status(404).send("id não encontrado!");

            return res.status(204).send("Post deleted");
        }
        
    }catch(error){
        console.log("Erro ao tentar deletar um post!");
        res.status(500).send(error.message);
    }
}