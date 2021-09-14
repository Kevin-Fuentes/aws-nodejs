const { v4: uuidv4 } = require("uuid");

function generatePass(req, res) {
  res.send(uuidv4());
}

module.exports = {
  generatePass,
};
