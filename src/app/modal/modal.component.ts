import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableScore } from '../table.model';
import { computerWin, playerWin } from '../modal-text';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() playerScore!: number;
  @Input() computerScore!: number;
  @Output() close = new EventEmitter();

  winnerScore!: number;
  cardText!: TableScore;

  constructor() { }

  ngOnInit(): void {
    this.checkWinner()
  }

  checkWinner(): void {
    if (this.playerScore == 10) {
      this.cardText = playerWin;
      this.winnerScore = this.playerScore;
    } else {
      this.cardText = computerWin;
      this.winnerScore = this.computerScore;
    }
  }

  closeModal(): void {
    this.close.emit();
  }

}
