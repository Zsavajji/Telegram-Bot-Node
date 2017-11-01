// @flow
const Plugin = require("./../Plugin");
const Util = require("./../Util");

import type {CommandGetter, Message, PluginInitializer} from "../FlowTypes";
import type Auth from "../helpers/Auth";

module.exports = class AuthPlugin extends Plugin {
    auth: Auth;
    static get plugin() {
        return {
            name: "Auth",
            description: "Plugin to handle authentication",
            help: `Commands:

/modlist, /adminlist to list mods and admins respectively
/addmod, /delmod to add or remove mods
/addadmin, /deladmin to add or remove admins`
        };
    }

    constructor(obj: PluginInitializer) {
        super(obj);

        this.auth = obj.auth;
    }

    get commands(): CommandGetter {
        return {
            modlist: ({message}) => JSON.stringify(this.auth.getMods(message.chat.id)),
            adminlist: ({message}) => JSON.stringify(this.auth.getAdmins(message.chat.id)),
            addmod: ({message, args}) => this.doAction("mod", this.auth.addMod, message, args),
            delmod: ({message, args}) => this.doAction("mod", this.auth.removeMod, message, args),
            addadmin: ({message, args}) => this.doAction("admin", this.auth.addAdmin, message, args),
            deladmin: ({message, args}) => this.doAction("admin", this.auth.removeAdmin, message, args)
        };
    }

    doAction(privilege: "mod" | "admin", method: (number, number) => void, {from, chat}: Message, args: Array<string>) {
        switch (privilege) {
        case "mod":
            if (!this.auth.isMod(from.id, chat.id))
                return "Insufficient privileges.";
            break;
        case "admin":
            if (!this.auth.isAdmin(from.id, chat.id))
                return "Insufficient privileges.";
            break;
        default:
            return "Unknown privilege: " + privilege;
        }

        if (args.length !== 1)
            return "Please supply one ID/username.";
        let target;
        if (Number(args[0]))
            target = Number(args[0]);
        else {
            try {
                target = Util.nameResolver.getUserIDFromUsername(args[0]);
            } catch (e) {
                return "Couldn't resolve username. Did you /enable UserInfo?";
            }
        }
        if (!target)
            return "Invalid user (couldn't parse ID, or unknown username).";

        method.bind(this.auth)(target, chat.id);
        return "Done.";
    }
};