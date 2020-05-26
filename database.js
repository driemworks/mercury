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
        console.log('Initialized IPFS');
        const orbitdb = await OrbitDB.createInstance(ipfs);
        // this.orbitdb = orbitdb;
        console.log('Initialized orbitdb');
        this.orbitdb = orbitdb;
    }

    static async put(address, id, doc) {
        const db = await this.orbitdb.docstore(address);
        await db.load();
        db.put({ _id: id, doc: doc });
        console.log('persisted document to orbit db');
    }

    static async get(address, id) {
        console.log('address and id ' + address + ' | ' + id);
        try {
            const db = await this.orbitdb.docstore(address);
            await db.load();
            return db.get(id);
        } catch (err) {
            console.log(err);
            return '';
        }
    }

}

module.exports = DatabaseService;