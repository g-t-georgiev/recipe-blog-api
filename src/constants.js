const NODE_ENV = process.env.NODE_ENV ?? 'development';
const PORT = process.env.PORT ?? 3030;
const URL = process.env.URL ?? `http://localhost:${PORT}`;
const DB = process.env.URL ?? 'mongodb://localhost:27017/recipe-blog';

const AUTH_HEADER = 'authorization' || 'Authorization';
const AUTH_COOKIE = 'auth';
const AUTH_TOKEN_SECRET = '14187ec7791c6868d1c71b585b0296165ba6643175e6f73851933356ff77ba0c';
const SALT_ROUNDS = 10;

module.exports = {
    NODE_ENV,
    PORT,
    URL,
    DB,
    AUTH_HEADER,
    AUTH_COOKIE,
    AUTH_TOKEN_SECRET,
    SALT_ROUNDS
}