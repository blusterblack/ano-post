const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const postModel = require('./post');

const port = process.env.PORT || 8080;
const app = express();
const route = express.Router();

mongoose.connect('mongodb+srv://blusterblack:1@ano-voe0g.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('atlas success');
});
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', (req, res) => res.send('pong'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/posts', async (req, res) => {
  const posts = await postModel.find({});
  res.send(posts);
});
app.post('/post', async (req, res) => {
  const post = new postModel(req.body);
  await post.save();
  res.send(post);
});

app.listen(port, () => { console.log(`use port:${port}`); });
