import db from "../../database/databaseConnection.js";

export const deletePost = async(req,res) =>{
    const {id} = req.params;
    const userIdSent = req.userId;

    try{
        const dbResponse = await db.query('SELECT userId FROM posts WHERE id=$1',[id]);

        if(dbResponse.rowCount === 0) return res.status(404).send("Id não encontrado");

        const userIdReceived = dbResponse.rows[0].userId;

        if(userIdReceived !== userIdSent){
            return res.status(401).send("userId enviado não correspondente!");

        }else{
            const deleteResponse = await db.query("DELETE FROM posts WHERE id = $1", [id]);
            if(deleteResponse.rowCount === 0) return res.status(404).send("id não encontrado!");

            return res.status(204).send("Post excluido");
        }
        
    }catch(error){
        console.log("Erro ao tentar buscar as informações via Id");
        res.status(500).send(error.message);
    }
}