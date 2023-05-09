import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { ColorCell, Table, TableCell } from 'src/app/table.model';
import { TableService } from 'src/app/table.service';


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {

  tableColumns: Table = this.tableService.createTable();

  playerScore: number = 0;
  computerScore: number = 0;

  subscription!: Subscription;
  gameSettings!: FormGroup;

  gameStarted: boolean = false;
  showModal: boolean = false;

  constructor(
    private tableService: TableService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeScoreValidation();
  }

  private initializeForm(): void {
    this.gameSettings = this.fb.group({
      timer: ['', Validators.required]
    })
  }

  private initializeScoreValidation(): void {
    this.tableService.tableDataInfo$.subscribe(cell => {
      if (this.computerScore === 10) {
        this.subscription.unsubscribe();
        this.showModal = true;
        return
      }
      if (cell?.clickedBy === 'computer') {
        this.computerScore += 1;

      }

    })
  }

  random(array: Table): void {
    const timer$ = interval(parseInt(this.gameSettings.controls['timer'].value));
    this.tableService.setTimer(parseInt(this.gameSettings.controls['timer'].value));

    this.gameStarted = true;
    this.tableService.startGame(array);
    this.subscription = timer$
      .subscribe(() => {
        this.tableService.changeTable(array);
      })
  }

  onCellClick(data: TableCell): void {
    if (data.color !== ColorCell.Yellow) return;

    data.clickedBy = 'user';
    this.playerScore += 1;
    data.color = ColorCell.Green;
    if (this.playerScore === 10) {
      this.showModal = true;
      this.subscription.unsubscribe();
    }

  }



  modalClose() {
    this.tableColumns = [];
    this.tableColumns = this.tableService.createTable();
    this.playerScore = 0;
    this.computerScore = 0;
    this.gameStarted = false;
    this.showModal = false;
  }
}

