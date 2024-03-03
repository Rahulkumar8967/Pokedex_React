import React, { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const Pokedex_url = 'https://pokeapi.co/api/v2/pokemon'
    async function downloadPokemons() {
        try {
            const response = await axios.get('Pokedex_url'); // this download list of 20 pokemon

            const pokemonResults = response.data.results;

            console.log(response.data);

            // iterate over the array of pokemon and using their url to create an array of promises that will download those 20 pokemons
            const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

            // passing the promise arrray to axios.all
            const pokemonData = await axios.all(pokemonResultsPromise);
            console.log(pokemonData);
            setPokemonList(pokemonData.map(pokeData => ({
                id: pokeData.data.id,
                name: pokeData.data.name,
                image: pokeData.data.sprites.other.dream_world.front_default,
                types: pokeData.data.types
            })));
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        downloadPokemons();
    }, []);

    return (
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            {isLoading ? 'Loading....' :
                pokemonList.map((p) => (
                    <div key={p.id}>
                        <img src={p.image} alt={p.name} />
                        <div>{p.name}</div>
                    </div>
                ))
            }
        </div>
    );
}

export default PokemonList;

