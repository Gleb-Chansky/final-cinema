const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://qwerty:qwerty123@cinema.juvrrap.mongodb.net/cinema?retryWrites=true&w=majority"
);
const database = client.db().collection("films");

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname + "/public")));
app.use("/static", express.static(path.resolve(__dirname + "/public/films")));
app.use("/static", express.static(path.resolve(__dirname + "/public/actors")));
app.get("/sliders", async (req, res) => {
  const result = [];
  await client.connect();

  const genres = await database.distinct("genres");
  const comedy = await database.find({ genres: "comedy" }).limit(5).toArray();
  const crime = await database.find({ genres: "crime" }).limit(5).toArray();
  const family = await database.find({ genres: "family" }).limit(5).toArray();
  const documental = await database
    .find({ genres: "documental" })
    .limit(5)
    .toArray();
  result.push(comedy, crime, family, documental, genres);
  res.send(result);
});

app.get("/getfilms", async (req, res) => {
  await client.connect();
  const films = await database.find({ genres: { $ne: "animation" } }).toArray();
  res.send(films);
});

app.get("/getcartoons", async (req, res) => {
  await client.connect();
  const cartoons = await database.find({ genres: "animation" }).toArray();
  res.send(cartoons);
});

app.get("/gettop", async (req, res) => {
  await client.connect();
  const top = await database
    .find({ rating: { $gt: 8.0 } })
    .sort({ rating: -1 })
    .toArray();
  res.send(top);
});

app.get("/getnewest", async (req, res) => {
  await client.connect();
  const cartoons = await database
    .find()
    .sort({ release: -1 })
    .limit(18)
    .toArray();
  res.send(cartoons);
});

app.get("/getactors", async (req, res) => {
  const data = [];
  const result = [];
  await client.connect();

  const actors = await database
    .find(
      {
        actors: {
          $elemMatch: {
            name: { $exists: true },
          },
        },
      },
      { projection: { "actors.$": 1, name: 1, _id: 0 } }
    )
    .toArray();
  actors.forEach((el) => {
    if (!data.find((actor) => actor.actors[0].name == el.actors[0].name)) {
      data.push(el);
    }
  });

  data.forEach((el) => {
    result.push(el.actors[0]);
  });
  res.send(result);
});

app.post("/search", async (req, res) => {
  const data = [];
  const result = [];
  await client.connect();
  const regexp = new RegExp("^.*" + req.body.value + ".*$", "i");
  const movies = await database
    .find(
      {
        title: { $regex: regexp },
      },
      { projection: { image: 1, title: 1, _id: 0 } }
    )
    .toArray();

  const actorsList = await database
    .find(
      {
        "actors.name": { $regex: regexp },
        actors: {
          $elemMatch: {
            name: regexp,
          },
        },
      },
      { projection: { "actors.$": 1, name: 1, _id: 0 } }
    )
    .toArray();

  actorsList.forEach((el) => {
    if (!data.find((actor) => actor.actors[0].name == el.actors[0].name)) {
      data.push(el);
    }
  });

  result.push(movies, data);
  res.send(result);
});

app.post("/genres/:genre", async (req, res) => {
  await client.connect();
  const result = await database.find({ genres: req.body.item }).toArray();

  res.send(result);
});

app.post("/movie/:name", async (req, res) => {
  await client.connect();
  const result = await database.find({ title: req.body.item }).toArray();

  res.send(result);
});

app.post("/actor/:name", async (req, res) => {
  await client.connect();

  const result = await database
    .find(
      { "actors.name": req.body.item },
      {
        projection: {
          image: 1,
          actors: 1,
          title: 1,
          rating: 1,
          year: 1,
          _id: 0,
        },
      }
    )
    .toArray();
  res.send(result);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT} `);
});

module.exports = app;
