const express = require('express');
const app = express();
const port = 3000;  
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chats');

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connect to MongoDB
main().then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/whatsapp');
}

// ---------------- ROUTES ----------------

// Show all chats
app.get('/chats', async (req, res) => {
  const chats = await Chat.find({});
  res.render('index', { chats });
});

// Show form to create new chat
app.get('/chats/new', (req, res) => {
  res.render('new_chat');
});

// Create new chat
app.post('/chats', async (req, res) => {
  const { from, to, msg } = req.body;
  await Chat.create({ from, to, msg, created_at: new Date() });
  res.redirect('/chats');
});

// Show edit form
app.get('/chats/:id/edit', async (req, res) => {
  const { id } = req.params;
  const chat = await Chat.findById(id);
  res.render('edit_chat', { chat });
});

// Update chat
app.post('/chats/:id', async (req, res) => {
  const { id } = req.params;
  const { msg } = req.body;
  await Chat.findByIdAndUpdate(id, { msg });
  res.redirect('/chats');
});

// Delete chat
app.post('/chats/:id/delete', async (req, res) => {
  const { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect('/chats');
});

// Root
app.get('/', (req, res) => {
  res.send('root is working');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



