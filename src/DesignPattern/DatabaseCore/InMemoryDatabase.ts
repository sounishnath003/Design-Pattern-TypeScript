// Design a In-Memory Database
export interface BaseRecord {
    id: string;
}

export interface Database<T extends BaseRecord> {
    get(id: string): T | undefined

    set(payload: T): void
}

export class InMemoryDatabase<T extends BaseRecord> implements Database<T> {
    private dbStore: Record<string, T> = {};

    get(id: string): T | undefined {
        return this.dbStore[id];
    }

    set(payload: T): void {
        this.dbStore[payload.id] = payload;
    }
}