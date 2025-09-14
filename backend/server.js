import express from "express";
import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const PORT = 5000;
const SECRET = "supersecretkey"; // change to env var in production

app.use(express.json());
app.use(cors());

// --- Database setup ---
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) console.error("Error opening database", err);
  else {
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT UNIQUE,
        password TEXT
      )`
    );
    console.log("Connected to SQLite database ✅");
  }
});

// --- Register route ---
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.run(query, [username, email, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.json({ message: "User registered successfully", id: this.lastID });
  });
});

// --- Login route ---
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.get(query, [email], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  });
});

// --- Protected route example ---
app.get("/api/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ message: "Profile data", user: decoded });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
