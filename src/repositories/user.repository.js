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


const userRepository = {
  signUp,
  checkEmailExists,
  checkNameExists,
};

export default userRepository;
