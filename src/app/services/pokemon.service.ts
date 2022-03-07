import { Injectable } from '@angular/core';
import * as pokemonList from '../../assets/pokemon.json';
import {Pokemon} from '../components/main-view/main-view.component';

/**
 * Service to handle Pokemon data from JSON and send to main app
 */
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonList: Array<any> = (pokemonList as any).default;

  constructor() {
    const newList = [];
    this.pokemonList.forEach(pokemon => {
      pokemon.stage = pokemon.stage + 1;
      newList.push(pokemon);
    });
    console.log(this.pokemonList);
  }
}
