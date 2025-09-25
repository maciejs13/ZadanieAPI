import Card from "./Card";
import "./App.css";
import {useEffect, useState} from "react";

type Pokemon = {
    name: string;
    type: string;
    image?: string;
};

const BASE = "https://pokeapi.co/api/v2/";

function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    async function getAllPokemons() {
        try {
            const res = await fetch(`${BASE}pokemon?limit=1118`);
            const data = await res.json();

            const pokemonsWithTypes = await Promise.all(
                data.results.map(async (p: { name: string; url: string }) => {
                    const res = await fetch(p.url);
                    const details = await res.json();
                    return {
                        name: p.name,
                        type: details.types[0]?.type.name || "unknown",
                        image: details.sprites.front_default,
                    };
                })
            );

            setPokemons(pokemonsWithTypes);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllPokemons();
    }, []);

    return (
        <>
            <h1>Pokedex</h1>
            <div>
                {pokemons.map((p) => (
                    <Card key={p.name} pokemon={p.name} type={p.type} image={p.image} />
                ))}
            </div>
        </>
    );
}

export default App;
