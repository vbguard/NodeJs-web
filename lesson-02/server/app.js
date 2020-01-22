const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

// first middleware
app.use((req, res, next) => {
  console.log("req.url :", req.url);
  next();
});

app.get("/", (req, res) => {
  console.log("1");
  res.send("main");
});

app.get("/get", function(req, res) {
  console.log("2");
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/calc", function(req, res) {
  const query = req.query;

  console.log("query :", query);

  const result = String(Number(query.a) + Number(query.b));
  console.log("result :", result);
  res.send(result);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server started on ${port}`);
});
