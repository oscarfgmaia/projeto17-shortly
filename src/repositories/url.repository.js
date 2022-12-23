import { connectionDb } from "../database/database.js";

function getUrlById(id) {
  return connectionDb.query(
    `
    SELECT * FROM urls WHERE id=$1;
      `,
    [id]
  );
}

const urlRepository = {
  getUrlById,
};

export default urlRepository;
