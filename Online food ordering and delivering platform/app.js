const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const path=require('path');
const app = express();
const PORT = 3007;
app.set('Views',path.join(__dirname,'Views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'Public')));
mongoose.connect('mongodb://localhost/logindata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(express.urlencoded({ extended: true }));
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);
app.get('/', (req, res) => {
  res.render('login');
});
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({
      email,
      password,
    });
    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser);
    res.render('page1', {email, password});
  } catch (error) {
    console.error('Error saving user:',error);
  }
});
app.get('/order', (req, res) => {
  res.redirect('page2');
});
app.get('/page2', (req, res) => {
  res.render('page2');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});