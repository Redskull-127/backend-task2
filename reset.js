export default async function resetDatabase(client, req, res) {
    try {
        await client.connect();
        const db = client.db("backend").collection("task");
        if ((await db.countDocuments()) > 0) {
          await db.deleteMany({});
          res.json({ message: "Reset Done" });
        }
        else {
            res.json({ message: "Already reset" });
        }
      } catch (e) {
        console.error(e);
        res.json({ message: "Error"});
      }
}