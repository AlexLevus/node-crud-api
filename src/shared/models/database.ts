interface Database {
    getCollection<T>(name: string): T[]
    updateCollection<T>(name: string, data: T[]): void
}

export default Database;