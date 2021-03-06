const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const { isAuth } = require("./services/isAuth");
const cors = require("cors");
const http = require("http");

mongoose.connect(keys.MONGO_KEY, { useNewUrlParser: true });

const app = express();

app.use(cors());

app.use(isAuth);

app.use(bodyParser.json());

require("./routes/authRoutes")(app);
require("./routes/movieRoutes")(app);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  setInterval(function() {
    http.get("https://mo-hub.herokuapp.com/");
  }, 300000);
  app.use(express.static("client/dist"));

  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
