import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

// Strict CORS for security
app.use(cors({
  origin: ["https://your-frontend-url.vercel.app"]
}));

// Simple API key middleware
const API_KEY = "my-secret-key";
app.use((req, res, next) => {
  if (req.headers["x-api-key"] !== API_KEY) {
    return res.status(403).json({ msg: "Invalid API Key" });
  }
  next();
});

// In-memory storage (simple & fast)
let notes = [];

// Create note
app.post("/notes", (req, res) => {
  const { text, color } = req.body;
  const newNote = {
    id: uuid(),
    text,
    color,
    archived: false,
    createdAt: Date.now()
  };
  notes.push(newNote);
  res.json(newNote);
});

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Archive note
app.put("/notes/:id/archive", (req, res) => {
  const note = notes.find(n => n.id === req.params.id);
  if (!note) return res.status(404).json({ msg: "Not found" });

  note.archived = true;
  res.json(note);
});

// Delete note
app.delete("/notes/:id", (req, res) => {
  notes = notes.filter(n => n.id !== req.params.id);
  res.json({ msg: "Deleted" });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
