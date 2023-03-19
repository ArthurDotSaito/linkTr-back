import db from "../database/databaseConnection.js";
import urlMetadata from "url-metadata";



export async function publishPosts(req,res){
    let {description,url} = req.body;
    const userId = res.locals.auth;
    console.log(userId)

    try{
        await db.query(
            'INSERT INTO posts ("userId",description,url) VALUES ($1,$2,$3)',[userId,description,url]
        );
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

export async function getPosts(req,res){
  try{
    const {rows: allPosts} = await db.query(`
        SELECT 
        users.id as id,
        users.username as name,
        users.icon as image,
        posts.id as postId,
        posts.likes as likes,
        posts.description as description,
        posts.url as url,
        posts.id as postid
        FROM posts
        JOIN users
        ON posts."userId" = users.id
        ORDER BY posts.id DESC
        LIMIT 20;

`);
console.log(allPosts);
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
}catch(err){
    console.log(err);
}
}


export async function getPostsId(req,res){
    const {id} = req.params;

    
      try{
        const {rows: allPostsId} = await db.query(`
            SELECT 
            users.id as id,
            users.username as name,
            users.icon as image,
            posts.id as postId,
            posts.likes as likes,
            posts.description as description,
            posts.url as url,
            posts.id as postid
            FROM posts
            JOIN users
            ON posts."userId" = users.id
            WHERE users.id=$1
            ORDER BY posts.id DESC
            LIMIT 20;
    
    `,[id]);
    console.log(allPostsId);
    const arr = await Promise.all(
        allPostsId.map(async (obj) => {
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
    }catch(err){
        console.log(err);
    }
     
}
