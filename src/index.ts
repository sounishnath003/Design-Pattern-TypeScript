import {createDatabaseUsingSingleton} from "./DesignPattern";

interface Pokemon {
    id: string;
    attack: number;
    defense: number;
}

const PokemonDB = createDatabaseUsingSingleton<Pokemon>();

PokemonDB.instance.set({
    id: 'Bulbous',
    attack: 50,
    defense: 50
});

console.log(PokemonDB.instance.get('Bulbous'));