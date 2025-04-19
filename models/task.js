// task.js
const conDb = require("../config/db.js");

const connection = conDb.pool;

// create new tasks
const createTask = (title, completed, userId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO tasks (title, completed, user_id) VALUES (?, ?, ?)";
    connection.query(sql, [title, completed, userId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve({ id: results.insertId, title, completed });
    });
  });
};

// Function to get tasks by user ID
const getTasksByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tasks WHERE user_id = ?";
    connection.query(sql, [userId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
  createTask,
  getTasksByUserId,
};
