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
    const [searchText, setSearchText] = useState("");
    const [filterType, setFilterType] = useState("");

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

    const filteredPokemons = pokemons.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesType = filterType === "" || p.type === filterType;
        return matchesName && matchesType;
    });

    const types = Array.from(new Set(pokemons.map((p) => p.type))).sort();

    return (
        <>
            <h1>Pokemony</h1>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Szukaj po nazwie..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ marginRight: "10px" }}
                />

                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="">Wszystkie typy</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                {filteredPokemons.length > 0 ? (
                    filteredPokemons.map((p) => (
                        <Card key={p.name} pokemon={p.name} type={p.type} image={p.image} />
                    ))
                ) : (
                    <p>Brak wyników</p>
                )}
            </div>
        </>
    );
}

export default App;
