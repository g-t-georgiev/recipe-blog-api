module.exports = function (app) {
    const express = require('express');
    const cors = require('cors');
    const cookieParser = require('cookie-parser');
    const routes = require('../routes');
    const errorCatcherMiddleware = require('../middlewares/errorCatcherMiddleware');

    app.use(cors());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/api', routes);
    app.use(errorCatcherMiddleware);
}