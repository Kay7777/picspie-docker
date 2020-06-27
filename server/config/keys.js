if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else if (process.env.NODE_ENV === "TEST") {
  module.exports = require("./ci");
} else {
  console.log("current enviroment is :", process.env.NODE_ENV);
  module.exports = require("./dev");
}
