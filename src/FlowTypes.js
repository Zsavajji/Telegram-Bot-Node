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
    // Entities, text and query should be marked as optional,
    // but they are somewhat of a pain in the ass
    entities: Array<{
    	type: "bot_command" | "mention";
    	length: number;
    }>;
    text: string;
    query: string;
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

import type EventEmitter from "events";
import type TelegramBot from "node-telegram-bot-api";
import type Auth from "./helpers/Auth";
export type PluginInitializer = {
	db: any;
	blacklist: Array<number>;
	emitter: EventEmitter;
	bot: TelegramBot;
	config: Config;
	auth: Auth;
};