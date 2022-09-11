const express = require('express');
const projectsRouter = express.Router();
const projectsController = require('../controllers/projects');
const isAuthorized = require('../middleware/auth');

projectsRouter.get('/getprojects', projectsController.get);
projectsRouter.post('/postprojects', [isAuthorized], projectsController.post);
projectsRouter.post('/editprojects/:id', [isAuthorized], projectsController.edit);
projectsRouter.delete('/delprojects/:id', [isAuthorized], projectsController.del);
projectsRouter.get('/getprojectsid/:id', [isAuthorized], projectsController.getId);

module.exports = projectsRouter;