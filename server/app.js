const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const { isAuth } = require("./services/isAuth");
const serveStatic = require('serve-static');
const cors = require("cors");

mongoose.connect(keys.MONGO_KEY, { useNewUrlParser: true });

const app = express();

app.use(serveStatic(__dirname + "../dist"));

app.use(cors());

app.use(isAuth);

app.use(bodyParser.json());

require("./routes/authRoutes")(app);
require("./routes/movieRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
