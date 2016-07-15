//import DatabaseWrapper from "./DatabaseWrapper";
import Logger from "./Logger";

export default class Plugin {

    Type = {
        NORMAL: 0,
        INLINE: 1,
        SPECIAL: 99
    };

    Visibility = {
        VISIBLE: 0,
        HIDDEN: 1,
    };

    plugin = {
        name: "Plugin",
        description: "Base Plugin",
        help: "There is no need to ask for help",

        type: this.Type.SPECIAL,
        visibility: this.Visibility.HIDDEN,

        needs : {
            database : false,
            utils: false
        }
    };

    constructor(listener, db) {
        if (new.target === Plugin) {
            throw new TypeError("Cannot construct Plugin instances directly!");
        }
        this.listener = listener;

        if (db)
            this.db = db;

        this.log = Logger.get(this.self.plugin.name);
        /*if(this.plugin.needs.database)
            this.database = DatabaseWrapper(this.plugin.name);*/

        if(typeof this.onText == 'function')
            this.listener.on("text", (...args) => this.onText(...args));

        //media
        if(typeof this.onAudio == 'function')
            this.listener.on("audio", (...args) => this.onAudio(...args));
        if(typeof this.onDocument == 'function')
            this.listener.on("document", (...args) => this.onDocument(...args));
        if(typeof this.onPhoto == 'function')
            this.listener.on("photo", (...args) => this.onPhoto(...args));
        if(typeof this.onSticker == 'function')
            this.listener.on("sticker", (...args) => this.onSticker(...args));
        if(typeof this.onVideo == 'function')
            this.listener.on("video", (...args) => this.onVideo(...args));
        if(typeof this.onVoice == 'function')
            this.listener.on("voice", (...args) => this.onVoice(...args));

        //other
        if(typeof this.onContact == 'function')
            this.listener.on("contact", (...args) => this.onContact(...args));
        if(typeof this.onLocation == 'function')
            this.listener.on("location", (...args) => this.onLocation(...args));

    };

    check() {
        return true;
    };

    start() {
        return Promise.resolve();
    };

    stop() {
        return Promise.resolve();
    };

    get self() {
        /*
         * This is a hack.
         * When the Plugin constructor reads `this`, it gets a reference to the
         * Plugin class, not to the child (eg. PingPlugin), which means that eg.
         * `this.plugin.name` will contain "Plugin" and not the correct name
         * ("Ping").
         *
         * With this hack, to get the correct plugin name you'll need to read
         * `this.self.name`. Note that writing to `this.self` doesn't have any
         * effect.
         */
        return this;
    }

}