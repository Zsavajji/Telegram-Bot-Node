// @flow
export type Config = {
    TELEGRAM_TOKEN: string;
    activePlugins: Array<string>;
    loggingLevel: string;
};

export type Message = {
	from: {
		id: number;
	};
    chat: {
        id: number;
    };
    entities?: Array<{
    	type: "bot_command" | "mention";
    	length: number;
    }>;
    text?: string;
    query?: string;
};

export type CommandGetter = {
	[string]: ({message: Message, args: Array<string>}) => ?string;
};

export type PluginMetadata = {
    name: string;
    description: string;
    help: string;

    isHidden?: boolean;
    isProxy?: boolean;
}

export type Handler = ({message: Message, command: string, args: Array<string>}) => void;

export interface Proxy {
	proxy(event: string, message: Message): Promise<any>;
}