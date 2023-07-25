const { createLogger, transports, format } = require("winston");
const { combine, colorize, label, timestamp, printf, simple} = format;

const printFormat = printf(( {timestamp, label, level, message}) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file: combine(
        label({
            label: "서버 개발중",
        }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd",
        }),
        printFormat
    ),
    console: combine(
        colorize(),
        simple()
    ),
};

const opts = {
    file: new transports.File({
        filename: "access.log",
        dirname: "./logs",
        level: "info",
        format:printLogFormat.file,
    }),
    console: new transports.Console({
        level: "info",
        format:printLogFormat.console,
    }),
};

const logger = createLogger({
    transports: [opts.file],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(opts.console);
}

module.exports = logger;
// 로그는 하루 단위로 관리하는게 맞음 npm winston daily
// 머시기로 관리하기.