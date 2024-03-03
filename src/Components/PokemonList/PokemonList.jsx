import React, { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';


function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [Pokedex_url, setPokedex_url] = useState('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemons() {
        setIsLoading(true);
        const response = await axios.get(Pokedex_url);
        const pokemonResults = response.data.results;

        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        const pokemonData = await axios.all(pokemonResultsPromise);
        console.log(pokemonData);

        setPokemonList(pokemonData.map(pokeData => ({
            id: pokeData.data.id,
            name: pokeData.data.name,
            image: pokeData.data.sprites.other.dream_world.front_default,
            types: pokeData.data.types
        })));

        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [Pokedex_url]);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {isLoading ? 'Loading....' :
                    pokemonList.map((p) => (
                        <div key={p.id} >
                            <img src={p.image} alt={p.name} />
                            <div>{p.name}</div>
                            <div>Types: {p.types.map(type => type.type.name).join(', ')}</div>
                        </div>
                    ))}
            </div>
            <div className="Controls">
                <button disabled={prevUrl == null} onClick={() => setPokedex_url(prevUrl)}>prev</button>
                <button disabled={nextUrl == null} onClick={() => setPokedex_url(nextUrl)}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;



