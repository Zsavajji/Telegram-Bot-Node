type LoggingFn = (...any) => void;
type InstancedLogger = {
	debug: LoggingFn;
	verbose: LoggingFn;
	info: LoggingFn;
	warn: LoggingFn;
	error: LoggingFn;
}

declare module 'winston' {
	declare module.exports: {
		loggers: {
			get: (string) => InstancedLogger;
			add: (string, {}) => InstancedLogger;
		};
	};
}