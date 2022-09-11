const express = require('express')
const dotenv = require('dotenv').config();
const port = process.env.PORT || 4001
const mongoUri = process.env.MONGO_URI;
const app = express();
const mailRouter = require('./routes/mail');
const projectsRouter = require('./routes/projects');
const usersRouter = require('./routes/users');
const blogsRouter = require('./routes/blogs');
const cors = require('cors');
const mongoose = require('mongoose');
const usersController = require('./controllers/users');

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to database'))
  .catch((error) => console.error('Could not connect to database ', error.message))

app.listen(port, () => { usersController.post(); console.log(`Server listening on ${port}`) });

app.use(express.json());
app.use(cors());
app.use('/api', mailRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/users', usersRouter);
app.use('/api/blog', blogsRouter);