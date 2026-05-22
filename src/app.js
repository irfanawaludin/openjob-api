require('dotenv').config();

const express = require('express');
const cors = require('cors');
const usersRoutes = require('./api/users/routes');
const authenticationsRoutes = require('./api/authentications/routes');
const profileRoutes = require('./api/profile/routes');
const categoriesRoutes = require('./api/categories/routes');
const companiesRoutes = require('./api/companies/routes');
const jobsRoutes = require('./api/jobs/routes');
const applicationsRoutes = require('./api/applications/routes');
const bookmarksRoutes = require('./api/bookmarks/routes');
const documentsRoutes = require('./api/documents/routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);
app.use('/authentications', authenticationsRoutes);
app.use('/profile', profileRoutes);
app.use('/categories', categoriesRoutes);
app.use('/companies', companiesRoutes);
app.use('/jobs', jobsRoutes);
app.use('/applications', applicationsRoutes);
app.use('/', bookmarksRoutes);
app.use('/documents', documentsRoutes);
app.use(errorHandler);

module.exports = app;