import Repository from '../shared/models/repository';
import User from './user.entity';
import Database from "../shared/models/database";

class UserRepository implements Repository<User> {
    db: Database;
    private users: User[];
    // private collection: User[];

    constructor(db: Database, collectionName: string) {
        this.db = db;
        this.users = db.getCollection(collectionName);
    }

    async create(item: User): Promise<boolean> {
        this.users = this.db.getCollection("users");

        this.users.push(item);
        this.db.updateCollection('users', this.users)
        return Promise.resolve(true);
    }

    async delete(id: string): Promise<boolean> {
        this.users = this.db.getCollection("users");

        const user = await this.findOne(id);

        if (user) {
            this.users = this.users.filter(user => user.id !== id);
            this.db.updateCollection('users', this.users)
        }

        return Promise.resolve(Boolean(user));
    }

    async all(): Promise<User[]> {
        this.users = this.db.getCollection("users");

        console.log(this.db, this.users)
        return Promise.resolve(this.users);
    }

    async findOne(id: string): Promise<User | undefined> {
        this.users = this.db.getCollection("users");

        return Promise.resolve(this.users.find(user => user.id === id));
    }

    async update(id: string, item: User): Promise<boolean> {
        this.users = this.db.getCollection("users");

        const user = await this.findOne(id);

        if (user) {
            this.users = this.users.map(user => {
                if (user.id === id) {
                    return {
                        ...user,
                        ...item,
                    };
                }

                return user;
            });
            this.db.updateCollection('users', this.users)
        }

        return Promise.resolve(Boolean(user));
    }
}

export default UserRepository;
