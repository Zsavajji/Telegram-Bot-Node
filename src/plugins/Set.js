// @flow
const Plugin = require("./../Plugin");

import type {CommandGetter, Message, PluginInitializer} from "../FlowTypes";

module.exports = class Set extends Plugin {

    db: {
        replacements: Array<{
            trigger: string;
            replacement: string;
        }>;
    };

    constructor(obj: PluginInitializer) {
        super(obj);

        if (!this.db.replacements) {
            this.db.replacements = [];
        }
    }

    static get plugin() {
        return {
            name: "Set",
            description: "Trigger bot responses whenever someone says a specific sentence.",
            help: "`/set <trigger> <response>` to set a trigger, `/unset <trigger>` to delete it."
        };
    }

    onText({message}: {message: Message}) {
        const chatID = message.chat.id;

        for (const item of this.db.replacements) {
            if (chatID !== item.chatID) continue;
            if (!message.text.startsWith(item.trigger)) continue;
            this.sendMessage(message.chat.id, item.replacement);
        }
    }

    get commands(): CommandGetter {
        return {
            set: ({args, message}) => {
                const chatID = message.chat.id;
                if (args.length < 2) return "Syntax: `/set <trigger> <replacement>`";

                const trigger = args.shift();
                const replacement = args.join(" ");
                this.db.replacements.push({trigger, replacement, chatID});
                return "Done.";
            },
            unset: ({args, message}) => {
                const chatID = message.chat.id;
                const trigger = args[0];
                // Take only replacements with either a different chat id or a different trigger
                this.db.replacements = this.db.replacements.filter(item => (item.chatID !== chatID) || (item.trigger !== trigger));
                return "Done.";
            },
            get: ({message}) => {
                const chatID = message.chat.id;
                let text = "";
                for (const item of this.db.replacements) {
                    if (item.chatID !== chatID) continue;
                    text += `${item.trigger} => ${item.replacement}\n`;
                }
                return (text === "") ? "No triggers set." : text;
            }
        };
    }
};