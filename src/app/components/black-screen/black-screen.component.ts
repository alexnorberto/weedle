import {Component, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
import {BlackScreenService} from '../../services/black-screen.service';

@Component({
  selector: 'app-black-screen',
  templateUrl: './black-screen.component.html',
  styleUrls: ['./black-screen.component.css']
})
export class BlackScreenComponent implements OnInit {

  @Output() closeBlackScreen = new EventEmitter<any>();

  close() {
    this.closeBlackScreen.emit(true);
    this.blackScreenService.endGameBlackScreenCloseSubject.next(true);
  }

  constructor(private blackScreenService: BlackScreenService) {
  }

  ngOnInit(): void {
  }

}
