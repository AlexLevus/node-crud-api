import Database from '../models/database';
import Collection from './Collection';

class InMemoryDB implements Database {
    private collections: Record<string, Collection<any>> = {};
    private static __instance: InstanceType<typeof InMemoryDB>;

    constructor() {
        if (InMemoryDB.__instance) {
            return InMemoryDB.__instance;
        }

        InMemoryDB.__instance = this;
    }

    initialize(data: Record<string, any>) {
        for (const key in data) {
            data[key] = new Collection(data[key]);
        }

        this.collections = data;

        process.on('message', data => {
            if (typeof data === 'string') {
                const parsedData = JSON.parse(data);

                for (const key in parsedData) {
                    this.collections[key].data = parsedData[key];
                }
            }
        });
    }

    getCollection(name: string) {
        return this.collections[name];
    }
}

export default InMemoryDB;
