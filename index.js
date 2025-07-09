const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let messages = []; // ✅ In-memory array

// Get all messages
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Post a new message
app.post('/messages', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Missing name or message' });
  }

  const msg = {
    id: Date.now(),
    name,
    message,
    time: new Date().toISOString()
  };

  messages.push(msg);
  res.status(201).json(msg);
});

app.get('/', (req, res) => {
  res.send('Chat backend is running ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
