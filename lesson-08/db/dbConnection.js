const mongoose = require("mongoose");

function dbConnection() {
  mongoose.connect(
    "mongodb+srv://node:password34GH@cluster0-u3jlm.mongodb.net/sample_airbnb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    err => {
      if (err) {
        console.log("err :", err);
        process.exit(1);
      }

      if (!err) {
        console.log("DB connected...");
      }
    }
  );
}

module.exports = dbConnection;
