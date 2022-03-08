import {Component, OnInit} from '@angular/core';
import * as pokemonList from '../../../assets/pokemon.json';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PokemonService} from '../../services/pokemon.service';

export interface Pokemon {
  id: number;
  gen: number;
  name: any;
  type1: string;
  type2: string;
  stage: number;
  evolvesBy: any;
}

export interface Guess {
  idRelativeToAnswer: '<' | '=' | '>';
  genRelativeToAnswer: '<' | '=' | '>';
  stageIsEqual: boolean;
  type1IsEqual: 'true' | 'changed' | 'false';
  type2IsEqual: 'true' | 'changed' | 'false';
  pokemon: Pokemon;
}

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
  providers: [PokemonService]
})
export class MainViewComponent implements OnInit {

  MAX_GUESSES = 7;

  headersList = ['Name', 'Gen', 'Stage', 'Type1', 'Type2'];

  endGame = '';

  currentCorrectAnswer: Pokemon = this.pokemonService.randomPokemon();

  currentGuess: Guess | undefined;

  guessList: Array<Guess> = [];
  guessListModel = Array(this.MAX_GUESSES).fill(Array(5));

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
      stageIsEqual: this.currentCorrectAnswer.stage === pkmn.stage ? true : false,
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
      this.guessListModel.pop();
      if (
        this.currentCorrectAnswer.id === this.currentGuess.pokemon.id &&
        this.currentCorrectAnswer.name === this.currentGuess.pokemon.name &&
        this.currentCorrectAnswer.gen === this.currentGuess.pokemon.gen &&
        this.currentCorrectAnswer.stage === this.currentGuess.pokemon.stage &&
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
    this.endGame = 'Gotcha!';
    this.mainForm.controls.pokemonInput.disable();
  }

  gameOver() {
    console.log('GAME OVER');
    this.endGame = 'The Pokemon run away!';
    this.mainForm.controls.pokemonInput.disable();
  }

  resetGame(event = true) {
    this.endGame = '';
    this.guessList = [];
    this.guessListModel = Array(this.MAX_GUESSES).fill(Array(5));
    this.currentGuess = undefined;
    this.currentCorrectAnswer = this.pokemonService.randomPokemon();
    this.mainForm.controls.pokemonInput.enable();
  }

  constructor(private pokemonService: PokemonService) {
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
