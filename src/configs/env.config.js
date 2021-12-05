const { NODE_ENV, PORT, URL, DB } = require('../constants');

const ENV_CONFIG = {
    development: {
        port: PORT,
        url: URL,
        db: DB
    },
    production: {

    }
}

module.exports = ENV_CONFIG[NODE_ENV];