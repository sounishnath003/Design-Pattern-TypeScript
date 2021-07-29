import {BaseRecord, InMemoryDatabase} from "./InMemoryDatabase";

interface Pokemon {
    id: string;
    attack: number;
    defense: number;
}

// Factory Pattern - Using a Hidden Layer of of Repository Underneath (Abstraction)
function createDatabase<T extends BaseRecord>(): InMemoryDatabase<T> {
    return new InMemoryDatabase<T>();
}

const PokemonDB = createDatabase<Pokemon>();

PokemonDB.set({
    id: 'Bulbous',
    attack: 50,
    defense: 50
});

console.log(PokemonDB.get('Bulbous'));