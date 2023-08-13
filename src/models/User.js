const db = require("../db_jwt/db");

class User {
  static create(name, email, password) {
    return db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
  }

  static findByEmail(email) {
    return db
      .execute("SELECT * FROM users WHERE email = ?", [email])
      .then(([rows]) => rows[0]);
  }

  static findById(id) {
    return db
      .execute("SELECT * FROM users WHERE id = ?", [id])
      .then(([rows]) => rows[0]);
  }

  // Implement more methods as needed (update, delete, etc.)
}

module.exports = User;
