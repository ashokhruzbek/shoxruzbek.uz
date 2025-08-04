const express = require('express');
const { getAllProjects } = require('../controllers/admin/getProjects');
const { getProjectById } = require('../controllers/admin/getProjectById');
const { editProject } = require('../controllers/admin/editProject');
const { createProject } = require('../controllers/admin/createProject');
const { sendContactMessage, getContactMessages } = require('../controllers/admin/sendMessage');
const adminRouter = express.Router();

// Projects routes
adminRouter.post('/create', createProject)
adminRouter.get('/projects', getAllProjects)
adminRouter.get('/project/:id', getProjectById)
adminRouter.put('/edit/:id', editProject)

// Contact routes
adminRouter.post('/contact', sendContactMessage)
adminRouter.get('/contact/messages', getContactMessages)

module.exports = adminRouter;