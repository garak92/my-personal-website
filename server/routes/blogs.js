const express = require('express');
const blogsRouter = express.Router();
const blogsController = require('../controllers/blogs');
const isAuthorized = require('../middleware/auth');

blogsRouter.get('/getblogs', blogsController.get);
blogsRouter.post('/postblogs', [isAuthorized], blogsController.post);
blogsRouter.post('/editblogs/:id', [isAuthorized], blogsController.edit);
blogsRouter.delete('/delblogs/:id', [isAuthorized], blogsController.del);
blogsRouter.get('/getblogsid/:id', blogsController.getId);

module.exports = blogsRouter;