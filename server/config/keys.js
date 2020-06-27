const os = require("os");
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else if (process.env.NODE_ENV === "ci" || process.env.NODE_ENV === "CI") {
  module.exports = require("./ci");
} else {
  module.exports = require("./dev");
}
