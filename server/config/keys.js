const os = require("os");
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else if (os.environ.get("TRAVIS") == "true") {
  module.exports = require("./ci");
} else {
  module.exports = require("./dev");
}
