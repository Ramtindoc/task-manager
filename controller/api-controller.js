const connectDb = require("./config/db");

const reginster = (req, res) => {
  res.send("hi");
  res.end();
};

module.exports = reginster;
