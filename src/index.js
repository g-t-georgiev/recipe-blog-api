const express = require('express');
const env = require('./configs/env.config');
const app = express();

require('./configs/express.config')(app);

require('./configs/mongodb.config')(env.db)
    .then(_ => {
        app.listen(env.port, console.log.bind(console, `Application is running on port ${env.port}`));
    })
    .catch(error => console.error(error));