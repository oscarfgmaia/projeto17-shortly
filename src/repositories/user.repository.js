import { connectionDb } from "../database/database.js";

function signUp(name, email, password) {
  return connectionDb.query(
    `
          INSERT INTO users (name,email,password)
          VALUES ($1,$2,$3)
      `,
    [name, email, password]
  );
}

function checkEmailExists(email) {
  return connectionDb.query(
    `
    SELECT * FROM users WHERE email ILIKE $1;
  `,
    [email]
  );
}

function checkNameExists(name) {
  return connectionDb.query(
    `
    SELECT * FROM users WHERE name ILIKE $1;
  `,
    [name]
  );
}

function startSession(userId, token) {
  return connectionDb.query(
    `
    INSERT INTO sessions ("userId",token) VALUES ($1,$2);
  `,
    [userId, token]
  );
}

function getUserByToken(token) {
  return connectionDb.query(
    `
    SELECT users.*,sessions.id as "sessionId" FROM users JOIN sessions 
    ON users.id = sessions."userId"
    WHERE sessions.token = $1;
  `,
    [token]
  );
}

function insertUrls(userId, url, shortUrl) {
  return connectionDb.query(
    `
    INSERT INTO urls ("userId",url,"shortUrl") VALUES($1,$2,$3)
  `,
    [userId, url, shortUrl]
  );
}

async function shortUrlExists(shortUrl) {
  const urlFound = await connectionDb.query(
    `
    SELECT * FROM urls WHERE "shortUrl"=$1
  `,
    [shortUrl]
  );
  if (urlFound.rowCount === 0) {
    return false;
  } else {
    return true;
  }
}

function getProfile(id) {
  return connectionDb.query(
    `
    SELECT users.id, users.name, json_agg(json_build_object('id',urls.id,"shortUrl",urls."shortUrl",'url',urls.url,"visitCount",urls."visitCount")) AS "shortnedUrls"
    FROM users
    JOIN urls
    ON users.id = urls."userId"
    WHERE users.id=$1
    GROUP BY users.id
  `,
    [id]
  );
}

const userRepository = {
  signUp,
  startSession,
  checkEmailExists,
  checkNameExists,
  getUserByToken,
  insertUrls,
  shortUrlExists,
  getProfile,
};

export default userRepository;
