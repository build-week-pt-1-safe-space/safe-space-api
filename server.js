const server = require('express')();
const middleware = require('./middleware');
const routes = require('./routes');

server.use(middleware);
server.use('/api', routes);

server.get("/", async (req, res) => {
    res.json({ message: "Server Is Working" });
});

module.exports = server;