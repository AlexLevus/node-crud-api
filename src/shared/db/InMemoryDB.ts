import Database from '../models/database';

class InMemoryDB implements Database {
    private data: Record<string, any> = {};
    private static __instance: InstanceType<typeof InMemoryDB>;

    constructor() {
        process.on('message', data => {
            if (typeof data === 'string') {
                this.data = JSON.parse(data);
            }
        });

        if (InMemoryDB.__instance) {
            return InMemoryDB.__instance;
        }

        InMemoryDB.__instance = this;
    }

    initialize(data: Record<string, any>) {
        this.data = data;
    }

    getCollection(name: string) {
        return this.data[name];
    }

    updateCollection<T>(name: string, data: T[]) {
        this.data[name] = data;

        if (process.send) {
            process.send(JSON.stringify(this.data));
        }
    }
}

export default InMemoryDB;
