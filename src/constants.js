const NODE_ENV = process.env.NODE_ENV ?? 'development';
const PORT = process.env.PORT ?? 3030;
const URL = process.env.URL ?? `http://localhost:${PORT}`;
const DB = process.env.URL ?? 'mongodb://localhost:26017/recipe-blog';

module.exports = {
    NODE_ENV,
    PORT,
    URL,
    DB
}