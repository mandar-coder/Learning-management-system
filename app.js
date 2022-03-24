const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authmiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://mandart:mandar2000@cluster0.oc4fx.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
// app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/course', requireAuth,  (req, res) => res.render('course'));
app.get('/task1', requireAuth,  (req, res) => res.render('task1'));
app.get('/task2', requireAuth, (req, res) => res.render('task2'));
app.get('/profile', requireAuth, (req, res) => res.render('profile'));

app.use(authRoutes);