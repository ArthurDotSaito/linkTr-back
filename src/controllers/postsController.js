import db from "../database/databaseConnection.js";

export async function insertTread(req, res) {
  await db.query(
    "INSERT INTO trendings (id, name, createdAt) VALUES (default, $1, default)",
    [req.body?.name]
    );
    return res.sendStatus(201)
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
