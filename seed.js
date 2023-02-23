export default async function seedDatabase(client, req, res, jsonArray) {
    try {
        await client.connect();
        const db = client.db("backend").collection("task");
        const count = await db.countDocuments();
        if (count === 0) {
          
          await db.insertMany(jsonArray);
          res.json({ message: "Seeded Done" });
        } else {
          res.json({ message: "Already seeded" })
        }
        console.log("Connected successfully to server");
      } catch (e) {
        console.error(e);
        res.json({ message: "Error"});
      }
}