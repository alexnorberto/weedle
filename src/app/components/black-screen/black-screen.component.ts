import {Component, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-black-screen',
  templateUrl: './black-screen.component.html',
  styleUrls: ['./black-screen.component.css']
})
export class BlackScreenComponent implements OnInit {
  @Output() closeBlackScreen = new EventEmitter<any>();

  close() {
    this.closeBlackScreen.emit(true);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
