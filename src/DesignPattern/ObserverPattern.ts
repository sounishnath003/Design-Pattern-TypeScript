/**
 * Observer Pattern is also known as `PubSub Pattern` | Publish and Subscriber Pattern
 * Core RxJs Reactive way of writing cool complex emitting logics with realtime data stream.
 *
 * We have to create `Observer`
 */
import {BaseRecord, Database} from "./DatabaseCore/InMemoryDatabase";


// Observer
type Listener<EventType> = (ev: EventType) => void;

export function createObserver<EventType>(): {
    subscribe: (listener: Listener<EventType>) => () => void;
    publish: (event: EventType) => void;
} {
    let listeners: Listener<EventType>[] = [];

    return {
        subscribe: (listener: Listener<EventType>): () => void => {
            listeners.push(listener);
            return () => {
                listeners = listeners.filter(l => l !== listener);
            }
        },
        publish: (event: EventType) => {
            listeners.forEach((l) => l(event))
        }
    }
}


export interface BeforeSetEvent<T> {
    value: T;
    newValue: T;
}

export interface AfterSetEvent<T> {
    value: T;
}


export interface RealtimeDatabaseInterface<T extends BaseRecord> extends Database<T> {
    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;

    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;
}

export function createDatabaseUsingPubSub<T extends BaseRecord>() {

    class RealtimeInMemoryDatabase implements RealtimeDatabaseInterface<T> {
        public static instance: RealtimeInMemoryDatabase = new RealtimeInMemoryDatabase();
        private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
        private afterAddListeners = createObserver<AfterSetEvent<T>>();
        private db: Record<string, T> = {};

        private constructor() {
        }

        onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
            return this.afterAddListeners.subscribe(listener);
        }

        onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
            return this.beforeAddListeners.subscribe(listener);
        }

        get(id: string): T | undefined {
            return this.db[id];
        }

        set(payload: T): void {
            this.beforeAddListeners.publish({newValue: payload, value: this.db[payload.id]})
            this.db[payload.id] = payload;
            this.afterAddListeners.publish({value: payload})
        }
    }

    return RealtimeInMemoryDatabase;
}