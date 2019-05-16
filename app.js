const express = require("express");
const app = express();
const api = require("./api");
const morgan = require("morgan"); // http request logger middleware
const bodyParser = require("body-parser");
const cors = require("cors");

app.set("port", process.env.PORT || 8081);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/api", api);
app.use(express.static("static"));

app.use(morgan("dev"));

app.use((req, res) => {
  const err = new Error("not Found");
  console.log(err);
  err.status = 404;
  res.json({ error: err });
});

// Connect to mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/virtualstandups", {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(app.get("port"), () => {
    console.log("app listening on port " + app.get("port"));
  });
});
