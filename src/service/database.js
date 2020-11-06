const IPFS = require('ipfs');
const { add } = require('ipfs/src/core/components');
const OrbitDB = require('orbit-db');

class DatabaseService {

    orbitdb = null;

    constructor(orbitdb) {
        if (!orbitdb) {
            throw new Error('Cannot be called directly.');
        } else {
            this.orbitdb = orbitdb;
        }
    }

    static async init() {
        const ipfs = await IPFS.create();
        const orbitdb = await OrbitDB.createInstance(ipfs);
        this.orbitdb = orbitdb;
    }

    static async addEvent(address, event) {
        const db = await this.initFeed(address);
        const hash = await db.add(event);
        return hash;
    }

    static async retrieveEvents(address, limit) {
        const db = await this.initFeed(address);
        const allEvents = db.iterator({ limit: limit })
            .collect()
            .map((e) => e.payload.value);
        return allEvents;
    }

    static async initFeed(address) {
        const db = await this.orbitdb.feed(address);
        await db.load();
        return db;
    }

}

module.exports = DatabaseService;