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
    UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2;
    `,
    [newVisitorCount, shortUrl]
  );
}

function deleteUrlById(id) {
  return connectionDb.query(
    `
    DELETE FROM urls WHERE id=$1;
    `,
    [id]
  );
}
function getRanking() {
  return connectionDb.query(`
  SELECT users.id, users.name, COUNT(urls."shortUrl") AS "linksCount", COALESCE(SUM(urls."visitCount"),0) AS "visitCount"
  FROM users
  LEFT JOIN urls
  ON users.id=urls."userId"
  GROUP BY users.id
  ORDER BY "visitCount" DESC
  LIMIT 10
  ;
  `);
}

const urlRepository = {
  getUrlById,
  foundUrlByShortUrl,
  increaseUrlVisitor,
  deleteUrlById,
  getRanking,
};

export default urlRepository;
