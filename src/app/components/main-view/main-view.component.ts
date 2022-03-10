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
   * Sets if the help display will be shown
   */
  showHelp = false;

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
   * Sets if the blackScreen display will be shown
   */
  showBlackScreen() {
    return (
      this.endGameMessage ||
      this.showHelp
    );
  }

  /**
   * Close the black screen, resetting the context variables
   * @param status possible status to be set as message
   */
  closeBlackScreen(status) {
    this.endGameMessage = '';
    this.showHelp = false;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
