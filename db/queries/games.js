import db from "#db/client"

export async function getGames() {
    const sql = `
    SELECT *
    FROM games
    `;
    const {rows: games} = await db.query(sql)
    return games;
}

export async function getGame(id){
    const sql = `
    SELECT * 
    FROM games 
    WHERE id = $1;
    `
    const {rows: game} = await db.query(sql, [id])
    return game[0]
}

export async function createGame({ title, genre, release_year, platform_id}){
    const sql = `
    INSERT INTO games (title, genre, release_year, platform_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `
    const {rows: game} = await db.query(sql, [title, genre, release_year, platform_id])
    return game[0]
}

export async function updateGame({id, title, genre, release_year, platform_id }){
    const sql = `
    UPDATE games
    SET title = $1, genre = $2, release_year = $3, platform_id = $4
    WHERE id = $5
    RETURNING *;
    `
    const {rows: game} = await db.query(sql, [title, genre, release_year, platform_id, id])
    return game[0]
}

export async function deleteGame(id){
    const sql = `
    DELETE FROM games WHERE id = $1 RETURNING *;
    `
    const {rows: game} = await db.query(sql, [id])
    return game[0];
}