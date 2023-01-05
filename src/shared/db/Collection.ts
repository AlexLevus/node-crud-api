class Collection<T extends { id: string }> {
    data;

    constructor(data: T[]) {
        this.data = data;
    }

    async all(): Promise<T[]> {
        return Promise.resolve(this.data);
    }

    async findOne(id: string): Promise<T | undefined> {
        return Promise.resolve(this.data.find(item => item.id === id));
    }

    async insert(item: T): Promise<boolean> {
        this.data.push(item);

        this.sendIPCMessage();

        return Promise.resolve(true);
    }

    async update(id: string, updatedItem: T): Promise<boolean> {
        const item = await this.findOne(id);

        if (item) {
            this.data = this.data.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        ...updatedItem,
                    };
                }

                return item;
            });
        }

        this.sendIPCMessage();

        return Promise.resolve(Boolean(item));
    }

    async delete(id: string): Promise<boolean> {
        const item = await this.findOne(id);

        if (item) {
            this.data = this.data.filter(item => item.id !== id);
        }

        this.sendIPCMessage();

        return Promise.resolve(Boolean(item));
    }

    private sendIPCMessage() {
        if (process.send) {
            process.send(
                JSON.stringify({
                    users: this.data,
                })
            );
        }
    }
}

export default Collection;
