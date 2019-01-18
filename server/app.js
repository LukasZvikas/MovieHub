const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const passport = require("passport");

require("./services/regularAuth");
require("./services/googleAuth");

mongoose.connect(keys.MONGO_KEY);

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize())

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
