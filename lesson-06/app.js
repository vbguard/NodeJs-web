const express = require("express");
const app = express();
const logger = require("morgan");
const port = process.env.PORT || 5000;
const dbConnection = require("./db/dbConnection");
const User = require("./model/user");
const ListingsAndReviews = require("./model/listingsAndReviews");
dbConnection();

app.use(logger("dev"));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("mongodb");
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      users
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.post("/users", async (req, res) => {
  try {
    const userData = req.body;
    console.log("userData :", userData);

    const newUser = new User(userData);

    console.log("newUser :", newUser);

    const result = await newUser.save();

    res.status(201).json({
      user: result
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.get("/some", (req, res) => {
  ListingsAndReviews.find()
    .limit(20)
    .then(docs => {
      res.json(docs);
    })
    .catch(err => res.status(400).json(err));
});

app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;

  // User.find({ _id: userId })
  //   .then(user => res.json(user))
  //   .catch(error => res.status(400).json({ error: error }));

  User.findOne({ _id: userId })
    .then(user => {
      if (!user) {
        return res.status(404).json({ user: user });
      }

      res.json({ user: user });
    })
    .catch(error => res.status(400).json({ error: error }));

  // User.findById(userId)
  //   .then(user => res.json(user))
  //   .catch(error => res.status(400).json({ error: error }));
});

app.put("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const newFields = req.body;

  User.findOneAndUpdate(
    { _id: userId },
    { $setOnInsert: { ...newFields } },
    { new: true, upsert: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).json({ user: user });
      }

      res.json({ user: user });
    })
    .catch(error => res.status(400).json({ error: error }));
});

app.patch("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const newFields = req.body;

  User.findOneAndUpdate({ _id: userId }, { $set: newFields }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ user: user });
      }

      res.json({ user: user });
    })
    .catch(error => res.status(400).json({ error: error }));
});

app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId;

  User.findOneAndDelete({ _id: userId })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ user: user, message: `User not found by this ${userId}` });
      }

      res.json({ user: user, message: "User success deleted" });
    })
    .catch(error => res.status(400).json({ error: error }));
});

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
