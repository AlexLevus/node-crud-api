interface Repository<T> {
    all(): Promise<T[]>;
    findOne(id: string): Promise<T | undefined>;

    create(item: T): Promise<boolean>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}

export default Repository;
