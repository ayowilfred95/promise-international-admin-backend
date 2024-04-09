const logger = require("pino");

const log = logger({
    base: { pid: false },
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true // corrected the option name
        }
    },
    timestamp: () => `,"time": "${new Date().toLocaleString()}"`
});

module.exports = log;
