import db from "../database/databaseConnection.js";
import urlMetadata from "url-metadata";

// start of posts
export async function publishPosts(req, res) {
  let { description, url } = req.body;
  const userId = res.locals.auth;
  console.log(userId);

  try {
    await db.query(
      'INSERT INTO posts ("userId",description,url) VALUES ($1,$2,$3)',
      [userId, description, url]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
export async function getPosts(req, res) {
  try {
    const { rows: allPosts } = await db.query(`
            SELECT 
            users.id as id,
            users.username as name,
            users.icon as image,
            posts.id as postId,
            posts.likes as likes,
            posts.description as description,
            posts.url as url
            FROM posts
            JOIN users
            ON posts."userId" = users.id

    `);
    const arr = await Promise.all(
      allPosts.map(async (obj) => {
        let objectNew = { ...obj };

        const metaDatasUrl = await urlMetadata(obj.url).then(
          function (metadata) {
            /* console.log(metadata.title); */
            objectNew.titleUrl = metadata.title;
            objectNew.imageUrl = metadata.image;
            objectNew.descriptionUrl = metadata.description;
          },
          function (error) {
            console.log(error);
          }
        );

        return objectNew;
      })
    );

    res.send(arr);
  } catch (err) {
    console.log(err);
  }
}
export async function getPostByUserId(req, res) {
  try {
    const userPost = await db.query(`
      SELECT 
      users.id as id,
      users.username as name,
      users.icon as image,
      posts.id as postId,
      posts.likes as likes,
      posts.description as description,
      posts.url as url
      FROM posts
      JOIN users
      ON posts."userId" = users.id
      where posts."userId" = ${req.params?.id}
    `);
    const post = userPost.rows;
    if (post.length > 0) return res.send(post);
    return res.sendStatus(404);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
export const putLike = async (req, res) => {
  const postId = req.params.id;
  const { type } = req.body;
  console.log(postId);
  try {
    if (type !== "add" && type !== "remove") {
      return res.status(400).send("Parâmetro de tipo inválido.");
    }
    const result = await db.query(
      `
      UPDATE posts
      SET likes = CASE
        WHEN $1 = 'add' THEN likes + 1
        WHEN $1 = 'remove' AND likes > 0 THEN likes - 1
        ELSE likes
      END
      WHERE id = $2
      RETURNING likes
    `,
      [type, postId]
    );
    console.log(result.rows[0].likes);
    if (result.rows.length > 0) {
      res.status(200).json({ likes: result.rows[0].likes });
    } else {
      res.status(404).send("Post não encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar o número de likes.");
  }
};
export const deletePost = async (req, res) => {
  const postId = Number(req.params.id);
  const userId = res.locals.auth;
  try {
    const dbResponse = await db.query(
      'SELECT id FROM posts WHERE "userId"=$1',
      [userId]
    );
    console.log(dbResponse.rows[0]);
    if (dbResponse.rowCount === 0) {
      return res.status(404).send("userId não encontrado");
    } else {
      const deleteResponse = await db.query("DELETE FROM posts WHERE id = $1", [
        postId,
      ]);
      if (deleteResponse.rowCount === 0)
        return res.status(404).send("id não encontrado!");

      return res.status(204).send("Post deleted");
    }
  } catch (error) {
    console.log("Erro ao tentar deletar um post!");
    res.status(500).send(error.message);
  }
};
//end of posts

// start of trendings
export async function insertTread(req, res) {
  await db.query(
    "INSERT INTO trendings (id, name, createdAt) VALUES (default, $1, default)",
    [req.body?.name]
  );
  return res.sendStatus(201);
}
export async function topTrendings(req, res) {
  const data = await db.query(`
    SELECT 
      trendings.name, 
      COUNT(postTreads.trendingId) as count_trending 
    FROM trendings 
    LEFT JOIN postTreads ON trendings.id = postTreads.trendingId
    GROUP BY trendings.id 
    ORDER BY count_trending DESC 
    LIMIT 10;
    `);
  console.log(data);

  return res.send(data);
}
// end of trendings
