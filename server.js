import express from "express";
import { MongoClient } from "mongodb";
import csv from "csvtojson";
import seedDatabase from "./seed.js";
import resetDatabase from "./reset.js";
import filterDatabase from "./filter.js";
import Url from "url";

const app = express();
const uri =
  "mongodb+srv://meertarbani:Hmeer1257@cluster0.fjzl35w.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const csvFilePath = "netflix_titles.csv";
const jsonArray = await csv().fromFile(csvFilePath);

app.get("/seed", async (req, res) => {
  seedDatabase(client, req, res, jsonArray);
});

app.get("/reset", async (req, res) => {
  resetDatabase(client, req, res);
});

app.get("/all", async (req, res) => {
  const db = await client.db('backend')
  const collection = await db.collection('voicegpt')
  const resp = await collection.find({}).toArray()
  res.json({data: resp})
})

app.post("/all", async (req, res) => {
  const db = await client.db('backend')
  const collection = await db.collection('voicegpt')
  const data = {}
  data.question = req.params.question
  data.ans = req.params.ans
  const res = await collection.insertOne(data)
})

app.get("/", (req, res) => {
  const q = Url.parse(req.url, true);
  const query = q.query;
  if (Object.keys(query).length === 0) {
    return res.json({ result: jsonArray });
  }
  filterDatabase(client, req, res);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
