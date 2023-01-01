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
        // console.log(this.collection)
        // console.log(this.db)
        return this.collection.all();
    }

    async findOne(id: string): Promise<User | undefined> {
        return this.collection.findOne(id);
    }

    async create(item: User): Promise<boolean> {
        // this.db.updateCollection('users', this.users)
        return this.collection.insert(item);
    }

    async delete(id: string): Promise<boolean> {
        // this.db.updateCollection('users', this.users)
        return this.collection.delete(id);
    }

    async update(id: string, item: User): Promise<boolean> {
        // this.db.updateCollection('users', this.users)
        return this.collection.update(id, item);
    }
}

export default UserRepository;
