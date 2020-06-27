const mongoose = require("mongoose");
const express = require("express");
const app = express();
const passport = require("passport");
const keys = require("./config/keys");
const { json } = require("body-parser");
app.use(json());

const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: [keys.cookieKey],
    maxAge: 1000 * 60 * 30,
  })
);

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
console.log("Connected to MongoDb");

app.use(passport.initialize());
app.use(passport.session());

require("./models/user");
require("./models/post");
require("./models/comment");

require("./services/passport");
require("./services/cache");

require("./routes/authRoutes")(app);
require("./routes/postRoutes")(app);
require("./routes/commentRoutes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Listen to 4000"));

module.exports = app;
