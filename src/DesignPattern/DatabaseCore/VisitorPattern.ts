import {BaseRecord, Database} from "./InMemoryDatabase";

interface DatabaseVisitorInterface<T extends BaseRecord> extends Database<T> {
    visit(visitor: (item: T) => void): void;
}

export function createDatabaseUsingVisitorPattern<T extends BaseRecord>() {

    class InMemoryDB {
        static readonly instance = new InMemoryDB();
        private dbStore: Record<string, T> = {};

        private constructor() {
        }

        get(id: string): T | undefined {
            return this.dbStore[id];
        }

        set(payload: T): void {
            this.dbStore[payload.id] = payload;
        }

        // Visitor Pattern
        visit(visitor: (item: T) => void): void {
            Object.values(this.dbStore).forEach(visitor);
        }
    }

    return InMemoryDB;
}