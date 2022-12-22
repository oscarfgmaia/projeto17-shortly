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

function insertUrls(userId, url, shortenUrl) {
  return connectionDb.query(
    `
    INSERT INTO urls ("userId",url,"shortenedUrl") VALUES($1,$2,$3)
  `,
    [userId, url, shortenUrl]
  );
}

const userRepository = {
  signUp,
  startSession,
  checkEmailExists,
  checkNameExists,
  getUserByToken,
  insertUrls,
};

export default userRepository;
