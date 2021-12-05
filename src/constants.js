exports.NODE_ENV = process.env.NODE_ENV ?? 'development';
exports.PORT = process.env.PORT ?? 3030;
exports.URL = process.env.URL ?? `http://localhost:${PORT}`;
exports.DB = process.env.URL ?? 'mongodb://localhost:26017/recipe-blog';