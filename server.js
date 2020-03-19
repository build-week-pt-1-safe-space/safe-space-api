const server = require('express')();
const middleware = require('./middleware');
const routes = require('./routes');

const run_sms_cycle = require('./utils/twilio/sms_cycle');

server.use(middleware);
server.use('/api', routes);

server.get("/", async (req, res) => {
    res.json({ message: "Server Is Working" });
});

run_sms_cycle();

module.exports = server;