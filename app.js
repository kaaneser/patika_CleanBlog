const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const ejs = require('ejs');

const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['GET', 'POST'],
  })
);

// Routes
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.addPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/posts/edit/:id', pageController.getEditPage);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);

const port = 3000;
app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
