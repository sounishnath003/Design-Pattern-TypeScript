// Factory Pattern - Using a Hidden Layer of of Repository Underneath (Abstraction)

/*
Factory pattern is one of the most used design patterns in Java. This type of design pattern comes under
creation pattern as this pattern provides one of the best ways to create an object.
In Factory pattern, we create object without exposing the creation logic to the client and refer to
newly created object using a common interface.
 */

import {BaseRecord, InMemoryDatabase} from "./DatabaseCore/InMemoryDatabase";

export function createDatabase<T extends BaseRecord>(): InMemoryDatabase<T> {
    return new InMemoryDatabase<T>();
}
