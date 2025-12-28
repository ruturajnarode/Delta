const mongoose = require('mongoose');
const Chat = require('./models/chats');

main(). then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/whatsapp');
}

let allchats = [
  {
    from: 'Alice',      
    to: 'Bob',
    msg: 'Hello, Bob!',
    created_at: new Date()
    },
    {
    from: 'Bob',
    to: 'Alice',
    msg: 'Hi, Alice! How are you?',
    created_at: new Date()
    },
    {
    from: 'Alice',
    to: 'Bob',
    msg: 'I am good, thanks for asking!',
    created_at: new Date()
    }
];

Chat.insertMany(allchats)