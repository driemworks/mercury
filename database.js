const IPFS = require('ipfs-http-client');
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
        const ipfs = new IPFS({
            // host: process.env.NODE_ENV === 'development' ? '127.0.0.1' :'iris-app.de',
            // port: process.env.NODE_ENV === 'development' ? 5001 : 443,
            // protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https'
            EXPERIMENT: {
                pubsub: true
            }
        }); 
        const orbitdb = await OrbitDB.createInstance(ipfs);
        this.orbitdb = orbitdb;
    }

    static async get(address, id) {
        try {
            const db = await this.getDocstore(address);
            return db.get(id);
        } catch (err) {
            console.log(err);
            return '';
        }
    }

    static async update(address, id, newJsonEntry) {
        const db = await this.getDocstore(address);
        // try to get the json document
        const existingDocument = await db.get(id);
        existingDocument.push(newJsonEntry);
        await db.put({ _id: id, doc: existingDocument });
        return '';
    }

    static async getDocstore(address) {
        const db = await this.orbitdb.docstore(address);
        await db.load();
        return db;
    }

}

module.exports = DatabaseService;