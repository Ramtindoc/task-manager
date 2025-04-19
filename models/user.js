const conDb = require("../config/db");

const connection = conDb.pool;

// متد برای ثبت‌ نام کاربر
const registerUser = (username, password) => {
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  connection.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }
    console.log("User registered:", results.insertId);
  });
};

const findUser = (username) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    connection.query(sql, [username], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length > 0) {
        resolve(results[0]); // Return the first user found
      } else {
        resolve(null); // No user found
      }
    });
  });
};

module.exports = {
  registerUser,
  findUser,
};
