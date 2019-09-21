const winston = require('winston');
const Levels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5
    },
    colors: {
        error: "red",
        warn: "red",
        info: "green"
    }
};

const ConsoleTransport = new winston.transports.Console({ level: 'info' });
const FileTransport = new winston.transports.File({ filename: 'logger', level: 'error' });

module.exports.logger = winston.createLogger({
    levels: Levels.levels,
    transports: [ConsoleTransport, FileTransport]
});
