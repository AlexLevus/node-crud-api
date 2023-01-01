import Collection from '../db/Collection';

interface Database {
    getCollection<T extends { id: string }>(name: string): Collection<T>;
}

export default Database;
