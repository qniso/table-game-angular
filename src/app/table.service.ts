import { Injectable } from '@angular/core';
import { Table, TableCell, ColorCell } from './table.model';
import { BehaviorSubject, share, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  _timer!: number;

  private tableDataInfo$$ = new BehaviorSubject<TableCell | undefined>(undefined);
  tableDataInfo$ = this.tableDataInfo$$.asObservable().pipe(share());

  setTimer(data: any): void {
    if (data) this._timer = data
  }

  randomRow(arrayLength: number) {
    let randomNum = Math.floor(Math.random() * arrayLength)
    return randomNum
  }

  /**
    * @description
    * Gets a matrix, through a double for, iterate through the matrix
    * randomly coloring the cell in yellow, after an interval of N - milliseconds
    * if the user does not click on it, then the cell is painted in red
    */
  changeTable(colunms: Table): void {
    let randCol = this.randomRow(colunms.length);
    let randRow = this.randomRow(colunms.length);

    for (let i = 0; i < colunms.length; i++) {
      for (let j = 0; j < colunms.length; j++) {

        if (i == 1 && j == 1) {
          if (!colunms[randCol][randRow].clickedBy) {
            colunms
            [randCol]
            [randRow] =
            {
              color: ColorCell.Yellow
            }
          }
        }
      }
    }

    setTimeout(() => {
      if (!colunms[randCol][randRow].clickedBy) {
        colunms[randCol][randRow].color = ColorCell.Red;
        colunms[randCol][randRow].clickedBy = 'computer';
        this.tableDataInfo$$.next(colunms[randCol][randRow])
      }
    }, this._timer)
  }


  startGame(colunms: Table) {
    for (let i = 0; i < colunms.length; i++) {
      for (let j = 0; j < colunms.length; j++) {
        colunms[i][j]
          =
        {
          color: ColorCell.Blue
        }
      }
    }
  }

  createTable() {
    let colunms: Table = [];

    for (let i = 0; i < 10; i++) {
      colunms[i] = [];
      for (let j = 0; j < 10; j++) {
        colunms[i][j] = {
          color: ColorCell.White,
        }
      }
    }
    return colunms;
  }
}
