// @flow
const fs = require("fs");

// https://stackoverflow.com/a/1584377
function uniqueArray(arr: Array<any>): Array<any> {
    const a = arr.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

module.exports = class Auth {
    db: {
        _globalAdmins: Array<number>;
        auth: {
            [number]: {
                admins: Array<number>;
                mods: Array<number>;
            }
        }
    };

    constructor(config: {globalAdmins: Array<number>}) {
        try {
            const data = fs.readFileSync("./db/helper_Auth.json", "utf-8");
            this.db = JSON.parse(data);
            this.db._globalAdmins = uniqueArray(this.db._globalAdmins.concat(config.globalAdmins));
        } catch (err) {
            this.db = {
                auth: {},
                _globalAdmins: config.globalAdmins
            };
        }
    }

    synchronize() {
        fs.writeFile(
            "./db/helper_Auth.json",
            JSON.stringify(this.db),
            err => {
                if (err) throw err;
            }
        );
    }

    isMod(userId: number, chatId: number) {
        if (this.isAdmin(userId, chatId)) {
            return true;
        }
        return this.getMods(chatId).includes(userId);
    }

    isAdmin(userId: number, chatId: number) {
        return this.isGlobalAdmin(userId) || this.getAdmins(chatId).includes(userId);
    }

    isGlobalAdmin(userId: number) {
        return this.getGlobalAdmins().includes(userId);
    }

    addAdmin(userId: number, chatId: number) {
        if (!this.db.auth[chatId])
            this.db.auth[chatId] = {admins: [], mods: []};

        this.db.auth[chatId].admins.push(userId);
        this.synchronize();
    }

    removeAdmin(userId: number, chatId: number) {
        if (!this.db.auth[chatId])
            this.db.auth[chatId] = {admins: [], mods: []};

        this.db.auth[chatId].admins = this.db.auth[chatId].admins.filter(admin => admin !== userId);
        this.synchronize();
    }

    addMod(userId: number, chatId: number) {
        if (!this.db.auth[chatId])
            this.db.auth[chatId] = {admins: [], mods: []};

        this.db.auth[chatId].mods.push(userId);
        this.synchronize();
    }

    removeMod(userId: number, chatId: number) {
        if (!this.db.auth[chatId])
            this.db.auth[chatId] = {admins: [], mods: []};

        this.db.auth[chatId].mods = this.db.auth[chatId].mods.filter(mod => mod !== userId);
        this.synchronize();
    }

    addGlobalAdmin(userId: number) {
        this.db._globalAdmins.push(userId);
        this.synchronize();
    }

    getMods(chatId: number) {
        if (this.db.auth[chatId] && this.db.auth[chatId].mods) {
            return this.db.auth[chatId].mods;
        }
        return [];
    }

    getAdmins(chatId: number) {
        if (this.db.auth[chatId] && this.db.auth[chatId].admins) {
            return this.db.auth[chatId].admins;
        }
        return [];
    }

    getGlobalAdmins() {
        if (this.db._globalAdmins) {
            return this.db._globalAdmins;
        }
        return [];
    }
};