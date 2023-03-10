import db from "../database/databaseConnection.js"

export async function topTrendings(req, res) {
    const data = await db.query(`
    SELECT p.name, COUNT(pt.treadingId) as count_treading 
    FROM trendings p 
    WHERE p.tradingId = pt.id
    INNER JOIN postTreads pt ON p.id = pt.treadingId 
    GROUP BY p.id 
    ORDER BY count_treading DESC 
    LIMIT 10;
    `)
    console.log(data)
}