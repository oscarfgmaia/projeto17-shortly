import urlRepository from "../repositories/url.repository.js";

export async function getUrlById(req, res) {
  const { id } = req.params;
  try {
    const urlFound = await urlRepository.getUrlById(id);
    if (urlFound.rowCount === 0) {
      return res.sendStatus(404);
    }

    const responseObj = {
      ...urlFound.rows[0],
    };
    delete responseObj.userId;
    delete responseObj.visitors;
    delete responseObj.createdAt; 
    res.status(200).send(responseObj);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
