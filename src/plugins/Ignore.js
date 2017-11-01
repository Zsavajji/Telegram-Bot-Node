// @flow
const Plugin = require("../Plugin");
const Util = require("../Util.js");

import type {CommandGetter, Message, Proxy, PluginInitializer} from "../FlowTypes";
import type Auth from "../helpers/Auth";

module.exports = class Ignore extends Plugin implements Proxy {
    auth: Auth;
    db: {
        ignored: Array<number>;
    };

    constructor(obj: PluginInitializer) {
        super(obj);

        this.auth = obj.auth;
        if (!this.db.ignored) {
            this.db.ignored = [];
        }
    }

    static get plugin() {
        return {
            name: "Ignore",
            description: "Ignore users",
            help: "Syntax: /ignore <ID/username>",

            isProxy: true
        };
    }

    proxy(eventName: string, message: Message): Promise<any> {
        if (this.db.ignored.indexOf(message.from.id) !== -1)
            return Promise.reject();
        return Promise.resolve();
    }

    get commands(): CommandGetter {
        return {
            ignorelist: () => JSON.stringify(this.db.ignored),
            ignore: ({args, message}) => {
                const target = Util.getTargetID(message, args, "ignore");
                if (typeof target === "string") // Error messages
                    return target;
                if (this.auth.isMod(target, message.chat.id))
                    return "Can't ignore mods.";

                this.db.ignored.push(target);
                return "Ignored.";
            },
            unignore: ({args, message}) => {
                const target = Util.getTargetID(message, args, "unignore");
                if (typeof target === "string") // Error messages
                    return target;

                this.db.ignored = this.db.ignored.filter(id => id !== target);
                return "Unignored.";
            }
        };
    }
};
