import { connectionDb } from "../database/database.js";

function getUrlById(id) {
  return connectionDb.query(
    `
    SELECT * FROM urls WHERE id=$1;
      `,
    [id]
  );
}

function foundUrlByShortUrl(shortUrl) {
  return connectionDb.query(
    `
    SELECT * FROM urls WHERE "shortUrl"=$1;
  `,
    [shortUrl]
  );
}
function increaseUrlVisitor(newVisitorCount, shortUrl) {
  return connectionDb.query(
    `
    UPDATE urls SET visitors=$1 WHERE "shortUrl"=$2;
    `,
    [newVisitorCount, shortUrl]
  );
}

const urlRepository = {
  getUrlById,
  foundUrlByShortUrl,
  increaseUrlVisitor,
};

export default urlRepository;
