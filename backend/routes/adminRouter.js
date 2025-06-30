const express = require('express');
const { getAllProjects } = require('../controllers/admin/getProjects');
const { editProject } = require('../controllers/admin/editProject');
const { createProject } = require('../controllers/admin/createProject');
const adminRouter = express.Router();


adminRouter.post('/create', createProject)
adminRouter.get('/projects', getAllProjects)
adminRouter.put('/edit/:id', editProject)

module.exports = adminRouter;