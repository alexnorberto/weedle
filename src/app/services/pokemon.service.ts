import { Injectable } from '@angular/core';
import * as pokemonList from '../../assets/pokemon.json';

/**
 * Service to handle Pokemon data from JSON and send to main app
 */
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonList: Array<any> = (pokemonList as any).default;

  randomPokemon() {
    return this.pokemonList[Math.floor(Math.random() * this.pokemonList.length)];
  }

  constructor() {
    const newList = [];
    this.pokemonList.forEach(pokemon => {
      pokemon.stage = pokemon.stage;
      newList.push(pokemon);
    });
    console.log(this.pokemonList);
  }
}
