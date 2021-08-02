type Listener<EventType> = (ev: EventType) => void;

function createObserver<EventType>(): {
    subscribe: (listener: Listener<EventType>) => void;
    publish: (listener: EventType) => void;
} {
    let listeners: Listener<EventType>[] = [];

    return {
        subscribe: function (listener: Listener<EventType>) {
            listeners.push(listener);
            return () => {
                listeners = listeners.filter((l) => l !== listener);
            };
        },
        publish: function (event: EventType) {
            listeners.forEach((l) => l(event));
        },
    };
}
