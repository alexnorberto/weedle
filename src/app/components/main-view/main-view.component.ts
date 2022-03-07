import {Component, OnInit} from '@angular/core';
import * as pokemonList from '../../../assets/pokemon.json';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Pokemon {
  id: number;
  gen: number;
  name: any;
  type1: string;
  type2: string;
}

export interface Guess {
  idRelativeToAnswer: '<'| '=' | '>';
  genRelativeToAnswer: '<'| '=' | '>';
  type1IsEqual: 'true' | 'changed' | 'false';
  type2IsEqual: 'true' | 'changed' | 'false';
  pokemon: Pokemon;
}

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  MAX_GUESSES = 8;

  currentCorrectAnswer: Pokemon = {
    id: 467,
    gen: 4,
    name: 'Magmortar',
    type1: 'Fire',
    type2: 'none'
  };

  currentGuess: Guess | undefined;

  guessList: Array<Guess> = [];

  mainForm = new FormGroup({
    pokemonInput: new FormControl('', Validators.required),
  });

  pokemonList: Array<Pokemon> = (pokemonList as any).default;

  filteredPokemonList: Observable<Pokemon[]> | undefined;

  findPokemonByName(name: string) {
    const pkmn = this.pokemonList.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    if (pkmn) {
      this.saveCurrentPokemonGuess(pkmn);
    } else {
      this.currentGuess = undefined;
    }
  }

  saveCurrentPokemonGuess(pkmn: Pokemon) {
    this.currentGuess = {
      idRelativeToAnswer: this.currentCorrectAnswer.id < pkmn.id ? '<' : (this.currentCorrectAnswer.id === pkmn.id ? '=' : '>'),
      genRelativeToAnswer: this.currentCorrectAnswer.gen < pkmn.gen ? '<' : (this.currentCorrectAnswer.gen === pkmn.gen ? '=' : '>'),
      type1IsEqual: this.currentCorrectAnswer.type1 === pkmn.type1 ? 'true' : (this.currentCorrectAnswer.type2 === pkmn.type1 ? 'changed' : 'false'),
      type2IsEqual: this.currentCorrectAnswer.type2 === pkmn.type2 ? 'true' : (this.currentCorrectAnswer.type1 === pkmn.type2 ? 'changed' : 'false'),
      pokemon: pkmn
    };
  }

  submitGuess() {
    // Check if there is a defined guess
    if (!this.currentGuess) {
      return;
    }

    // Check the guess list size and check if it will be finalized or not
    if (this.guessList.length < this.MAX_GUESSES) {
      this.guessList.push(this.currentGuess);
      if (
        this.currentCorrectAnswer.id === this.currentGuess.pokemon.id &&
        this.currentCorrectAnswer.name === this.currentGuess.pokemon.name &&
        this.currentCorrectAnswer.gen === this.currentGuess.pokemon.gen &&
        this.currentCorrectAnswer.type1 === this.currentGuess.pokemon.type1 &&
        this.currentCorrectAnswer.type2 === this.currentGuess.pokemon.type2) {
        this.foundCorrectAnswer();
      } else if (this.guessList.length >= this.MAX_GUESSES) {
        this.gameOver();
      }
    }

    this.currentGuess = undefined;
    this.mainForm.controls.pokemonInput.reset();
  }

  foundCorrectAnswer() {
    console.log('FOUND CORRECT ONE');
    this.mainForm.controls.pokemonInput.disable();
  }

  gameOver() {
    console.log('GAME OVER');
    this.mainForm.controls.pokemonInput.disable();
  }

  updateFilteredPokemonList() {

  }

  constructor() {
  }

  ngOnInit(): void {
    this.filteredPokemonList = this.mainForm.controls.pokemonInput.valueChanges.pipe(
      startWith(''),
      map(value => (value ? (typeof value === 'string' ? value : value.name) : '')),
      map(name => (name ? this._filter(name) : this.pokemonList.slice())),
    );

    this.mainForm.controls.pokemonInput.valueChanges.subscribe(
      value => {
        if (value) {
          this.findPokemonByName(value);
        }
      }
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.pokemonList.filter(option => {
      return option.name.toLowerCase().includes(filterValue) ||
        option.id.toString().includes(filterValue) ||
        option.type1.toLowerCase().includes(filterValue) ||
        option.type2.toLowerCase().includes(filterValue) ||
        ('gen' + option.gen.toString()).includes(filterValue);
    });
  }

}
