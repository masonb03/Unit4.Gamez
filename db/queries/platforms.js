import db from "#db/client"

// Get all platforms
export async function getPlatforms() {
  const sql = `SELECT * FROM platforms ORDER BY id;`
  const { rows } = await db.query(sql);
  return rows;
}

// Get a single platform by ID
export async function getPlatform(id) {
  const sql = `SELECT * FROM platforms WHERE id = $1;`
  const { rows } = await db.query(sql, [id]);
  return rows[0];
}

// Create a new platform
export async function createPlatform({ name, manufacturer }) {
  const sql = `
    INSERT INTO platforms (name, manufacturer)
    VALUES ($1, $2)
    RETURNING *;
  `
  const { rows } = await db.query(sql, [name, manufacturer]);
  return rows[0];
}

// Update a platform
export async function updatePlatform({ id, name, manufacturer }) {
  const sql = `
    UPDATE platforms
    SET name = $1, manufacturer = $2
    WHERE id = $3
    RETURNING *;
  `
  const { rows } = await db.query(sql, [name, manufacturer, id]);
  return rows[0];
}

// Delete a platform
export async function deletePlatform(id) {
  const sql = `DELETE FROM platforms WHERE id = $1 RETURNING *;
  `
  const { rows } = await db.query(sql, [id]);
  return rows[0];
}
