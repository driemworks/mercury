const IPFS = require('ipfs');
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
        // if it doesn't exist, create it!)
        if (!existingDocument[0]) {
            await db.put({ _id: id, doc: [ newJsonEntry ] });    
        } else {
            const existingDocumentDoc = existingDocument[0].doc;
            existingDocumentDoc.push(newJsonEntry);    
            await db.put({ _id: id, doc: existingDocumentDoc });
        }
        return '';
    }

    static async getDocstore(address) {
        const db = await this.orbitdb.docstore(address);
        await db.load();
        return db;
    }

}

module.exports = DatabaseService;