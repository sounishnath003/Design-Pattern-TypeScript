import {BaseRecord, Database} from "./DatabaseCore/InMemoryDatabase";

export function createDatabaseUsingSingleton<T extends BaseRecord>() {

    class InMemoryDatabase implements Database<T> {
        static readonly instance = new InMemoryDatabase();
        private dbStore: Record<string, T> = {};

        private constructor() {
        }

        get(id: string): T | undefined {
            return this.dbStore[id];
        }

        set(payload: T): void {
            this.dbStore[payload.id] = payload;
        }
    }

    return InMemoryDatabase;
}