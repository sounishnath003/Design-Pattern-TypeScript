import {createDatabaseUsingVisitorPattern} from "./DesignPattern/DatabaseCore/VisitorPattern";

interface Pokemon {
    id: string;
    attack: number;
    defense: number;
}

// Using the Visitor Pattern
const PokemonDB = createDatabaseUsingVisitorPattern<Pokemon>();

PokemonDB.instance.set({id: 'Bulbous', attack: 50, defense: 50});
PokemonDB.instance.set({id: 'Pikachu', attack: 92, defense: 43});
PokemonDB.instance.set({id: 'Pikachu2', attack: 27, defense: 53});
PokemonDB.instance.set({id: 'Spiking', attack: 100, defense: 62});

PokemonDB.instance.visit((item => {
    console.log({item});
}))

// Using the PubSub Pattern
// const PokemonDB = createDatabaseUsingPubSub<Pokemon>();
// // Registering an Observer
// const unsubscribe = PokemonDB.instance.onAfterAdd(({value}) => {
//     console.log({pokemon: value})
// })
//
// PokemonDB.instance.set({id: 'Bulbous', attack: 50, defense: 50});
//
// PokemonDB.instance.set({id: 'Pikachu', attack: 92, defense: 43});
// PokemonDB.instance.set({id: 'Pikachu2', attack: 27, defense: 53});
// PokemonDB.instance.set({id: 'Spiking', attack: 100, defense: 62});
//
// unsubscribe();

// Using Factory Pattern and Singleton Pattern
// const PokemonDB = createDatabaseUsingSingleton<Pokemon>();
//
// PokemonDB.instance.set({
//     id: 'Bulbous',
//     attack: 50,
//     defense: 50
// });
//
// console.log(PokemonDB.instance.get('Bulbous'));