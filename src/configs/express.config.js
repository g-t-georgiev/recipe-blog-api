module.exports = function (app) {
    const express = require('express');
    const cors = require('cors');
    const routes = require('../routes');
    const authMiddleware = require('../middlewares/authMiddleware');
    const errorCatcherMiddleware = require('../middlewares/errorCatcherMiddleware');

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(authMiddleware);
    app.use('/api', routes);
    app.use(errorCatcherMiddleware);
}