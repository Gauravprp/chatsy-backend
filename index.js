const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let roomMessages = {}; // 🧠 In-memory object: { room1: [...], room2: [...] }

// Get messages for a room
app.get('/messages', (req, res) => {
  const room = req.query.room || 'default';
  res.json(roomMessages[room] || []);
});

// Post a new message to a room
app.post('/messages', (req, res) => {
  const { name, message } = req.body;
  const room = req.query.room || 'default';

  if (!name || !message) {
    return res.status(400).json({ error: 'Missing name or message' });
  }

  const msg = {
    id: Date.now(),
    name,
    message,
    time: new Date().toISOString()
  };

  if (!roomMessages[room]) roomMessages[room] = [];
  roomMessages[room].push(msg);
  res.status(201).json(msg);
});

// Clear messages in a room
app.delete('/messages', (req, res) => {
  const room = req.query.room || 'default';
  roomMessages[room] = [];
  res.json({ status: 'cleared', room });
});

// Health check route
app.get('/', (req, res) => {
  res.send('Chat backend is running ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
