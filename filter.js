export default async function filterDatabase(client, req, res) {
  try {
    await client.connect();
    const db = client.db("backend").collection("task");
    let type = req.query.type.toString();
    let title = req.query.title.toString();
    let director = req.query.director.toString();
    let cast = req.query.cast.toString();
    let sy = req.query.sy.toString();
    let ey = req.query.ey.toString();
    let rating = req.query.rating.toString();
    const titleRegex = new RegExp(title, "i");
    const directorRegex = new RegExp(director, "i");
    const ratingRegex = new RegExp(rating, "i");
    const query = {
      type: type,
      title: { $regex: titleRegex },
      director: { $regex: directorRegex },
      cast: { $regex: cast },
      release_year: { $gte: sy, $lte: ey },
      rating: { $regex: ratingRegex },
    };
    const result = await db.find(query).toArray();
    res.json({ result });
  } catch (e) {
    console.error(e);
    res.json({ message: e });
  }
}
