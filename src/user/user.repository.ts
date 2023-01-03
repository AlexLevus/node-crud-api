import Repository from '../shared/models/repository';
import User from './user.entity';
import Database from '../shared/models/database';
import Collection from '../shared/db/Collection';

class UserRepository implements Repository<User> {
    db: Database;
    collection: Collection<User>;

    constructor(db: Database, collectionName: string) {
        this.db = db;
        this.collection = db.getCollection(collectionName);
    }

    async all(): Promise<User[]> {
        return this.collection.all();
    }

    async findOne(id: string): Promise<User | undefined> {
        return this.collection.findOne(id);
    }

    async create(item: User): Promise<boolean> {
        return this.collection.insert(item);
    }

    async delete(id: string): Promise<boolean> {
        return this.collection.delete(id);
    }

    async update(id: string, item: User): Promise<boolean> {
        return this.collection.update(id, item);
    }
}

export default UserRepository;
