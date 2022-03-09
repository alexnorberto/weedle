import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
  providers: [PokemonService]
})
export class MainViewComponent implements OnInit {

  /**
   * Stores the endgame message to be sent to the black screen
   */
  endGameMessage = '';

  /**
   * Receive if the end game was success or fail end set the status message to be passed to the black screen
   * @param status message to be set
   */
  receiveEndGameStatus(status) {
    this.endGameMessage = status;
  }

  /**
   * Reset the end game message to empty
   * @param status possible status to be set as message
   */
  resetEndGameMessage(status) {
    this.endGameMessage = '';
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
