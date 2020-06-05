jest.setTimeout(30000);

require("../models/user");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/picspie", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
