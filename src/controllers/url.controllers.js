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
    delete responseObj.visitCount;
    delete responseObj.createdAt;
    res.status(200).send(responseObj);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteUrlById(req, res) {
  const user = res.locals.user;
  const { id } = req.params;
  try {
    const urlFound = await urlRepository.getUrlById(id);
    if (urlFound.rows[0].userId !== user.id) {
      return res.sendStatus(401);
    }
    if (urlFound.rowCount === 0) {
      return res.sendStatus(404);
    } else {
      await urlRepository.deleteUrlById(id);
      res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function foundUrlByShortUrl(req, res) {
  try {
    const { shortUrl } = req.params;
    const foundUrl = await urlRepository.foundUrlByShortUrl(shortUrl);
    if (foundUrl.rowCount === 0) {
      res.sendStatus(404);
    } else {
      const increasedvisitCount = foundUrl.rows[0].visitCount + 1;
      await urlRepository.increaseUrlVisitor(increasedvisitCount, shortUrl);
      res.redirect(foundUrl.rows[0].url);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function rankUrlsByView(req, res) {
  try {
    const ranking = await urlRepository.getRanking();
    if (ranking.rowCount === 0) {
      res.status(404).send(ranking.rows);
    } else {
      res.status(200).send(ranking.rows);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
