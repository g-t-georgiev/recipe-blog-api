module.exports = function (app) {
    const express = require('express');
    const cors = require('cors');
    const cookieParser = require('cookie-parser');

    app.use(cors());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
}