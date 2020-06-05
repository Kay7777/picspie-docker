jest.setTimeout(30000);
const keys = require("../config/keys");
require("../models/user");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongo:27017/picspie");
