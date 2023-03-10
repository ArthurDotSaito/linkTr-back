import db from "../database/databaseConnection.js";

export const putLike = async(req,res) =>{
    const postId = req.params.id;
    const { type } = req.body;
    console.log(postId)
    try {

      if (type !== 'add' && type !== 'remove') {
        return res.status(400).send('Parâmetro de tipo inválido.');
      }
      const result = await db.query(`
        UPDATE posts
        SET likes = CASE
          WHEN $1 = 'add' THEN likes + 1
          WHEN $1 = 'remove' AND likes > 0 THEN likes - 1
          ELSE likes
        END
        WHERE id = $2
        RETURNING likes
      `, [type, postId]);
      console.log(result.rows[0].likes)
      if (result.rows.length > 0) {
        res.status(200).json({ likes: result.rows[0].likes });
      } else {
        res.status(404).send('Post não encontrado');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar o número de likes.');
    }
  };