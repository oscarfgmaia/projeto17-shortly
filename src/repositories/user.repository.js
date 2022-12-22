import { connectionDb } from "../database/database.js";
function createUser(name, email, password) {
  return connectionDb.query(
    `
          INSERT INTO users (name,email,password)
          VALUES ($1,$2,$3)
      `,
    [name, email, password]
  );
}

function getUsers(){
    return connectionDb.query(`
        SELECT * FROM users;
    `)
}

const userRepository ={
    createUser,
    getUsers
}

export default userRepository;