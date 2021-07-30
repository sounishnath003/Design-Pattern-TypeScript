/**
 * Observer Pattern is also known as `PubSub Pattern` | Publish and Subscriber Pattern
 * Core RxJs Reactive way of writing cool complex emitting logics with realtime data stream.
 *
 * We have to create `Observer`
 */


// Observer
type Listener<EventType> = (ev: EventType) => void ;
function createObserver<EventType>() {
    subscribe: (listener: EventType) => () => void;
    publish: (event: EventType) => void;
} {
    let listeners: Listener<EventType>[] = [];
    return {
        subscribe: (listener: Listener<EventType>): () => void {
            listeners.push(listener);
            return () => {
                listeners = listeners.filter(l => l !== listener)
            }
        },
        publish: (event: EventType){

    }
    }
}

