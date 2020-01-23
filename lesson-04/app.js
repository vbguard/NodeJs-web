const express = require("express");
const app = express();
const logger = require("morgan");
const shortid = require("shortid");
const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync("./example.json", { encoding: "utf-8" })
);

const port = process.env.PORT || 5000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

// CRUD - Create Read Update Delete

// app.get()
// app.post()
// app.delete()
// app.patch()
// app.put()

app.get("/users", (req, res) => {
  const { userId } = req.query;

  const query = {
    userid: null
  };

  if (userId) {
    query.userid = userId;
  }

  const filteredUsers = users.filter(user => user.id !== Number(query.userid));

  res.status(200).json({
    users: filteredUsers
  });
});

app.post("/users", (req, res) => {
  const { name, age, email } = req.body;

  if (name || age || email) {
    return res.status(422).json({
      message: "Some fields are missing"
    });
  }

  const newUser = { id: shortid(), name, age, email };

  users.push(newUser);

  res.status(201).json(newUser);
  // res.status(200).json(users);
});

// app.delete("/users");

app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({
      message: "You not send params `userId`"
    });
  }

  const modUsers = users.filter(user => user.id !== Number(userId));

  // res.status(200).json({ users: modUsers });
  res.status(200).json({
    message: `User ${userId} success deleted`
  });
});

app.patch("/users", (req, res) => {
  res.status(400).json({
    message: "Method @PATCH not have userId in path"
  });
});

app.patch("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const { name } = req.body;

  const updatedUsers = users.map(user => {
    if (user.id === Number(userId)) {
      user.name = name;
      return user;
    }

    return user;
  });

  res.status(200).json(updatedUsers);
});

app.put("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const { age } = req.body;

  const updatedUsers = users.map(user => {
    if (user.id === Number(userId)) {
      user.age = age;
      return user;
    }

    return user;
  });

  res.status(200).json(updatedUsers);
});

app.use("*", (req, res) => {
  res.status(404).json({
    get_users: "http://localhost:5000/users",
    create_user: "http://localhost:5000/users",
    delete_users: "http://localhost:5000/users/:userId"
  });
});

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
