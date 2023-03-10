import db from "../database/databaseConnection.js";

export async function topTrendings(req, res) {
    const data = await db.query(`
    SELECT t.name, COUNT(pt.tradingId) as count_trading 
    FROM trendings t 
    INNER JOIN postTreads pt ON t.id = pt.tradingId 
    WHERE t.tradingId = pt.id
    GROUP BY t.id 
    ORDER BY count_trading DESC 
    LIMIT 10;
    `)
    console.log(data)
    
    return res.send(data)
}
