import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from 'src/app/app.service';
import { TodayDateHelper } from 'src/app/helpers/todayDateHelper';
import { GameHistoric } from 'src/app/models/recipes';
import { selectGameHistoric } from 'src/app/store';

@Component({
  selector: 'app-statistics-dialog',
  templateUrl: './statistics-dialog.component.html',
  styleUrls: ['./statistics-dialog.component.scss'],
})
export class StatisticsDialogComponent implements OnInit {

  gameHistoric : GameHistoric = {} as GameHistoric;
  todayDate : string = "";

  playedGames : number = 0;
  wins : number = 0;
  currentStreak: number = 0;
  maxStreak : number = 0;
  guessDistr : number[] = [0,0,0,0,0,0];
  countDistr : number[] = [0,0,0,0,0,0];


  constructor(
    private store : Store,
    private service: AppService
  ) { 
    this.store.select(selectGameHistoric).subscribe((gameHistoric: GameHistoric) => {
      if(JSON.stringify(gameHistoric) === "{}") {
        gameHistoric = this.service.getLocalStoreGameHistoric();
      }
      this.gameHistoric = gameHistoric;
    });
  }

  ngOnInit(): void {
    this.todayDate = TodayDateHelper.getTodaysDateString();
    this.getValuesFromGameHistoric();
    this.getStreak();
  }

  getValuesFromGameHistoric() {
    if(this.gameHistoric != null && this.gameHistoric != undefined) {
      const gameHistoricKeys = Object.keys(this.gameHistoric);
      let playedGames = 0;
      let wins = 0;
      let tries = 0;
      let data = new Array();

      gameHistoricKeys.forEach(key => {
        if(this.gameHistoric![key].complete === true) {
          wins ++;
          playedGames ++;
          tries = this.gameHistoric![key].attempts.length;
          console.log(tries)
          data.push(tries);
        } else if(this.gameHistoric![key].attempts.length === 6){
          playedGames ++;
        }
      });
      this.wins = wins;
      this.playedGames = playedGames;
      for (let num of data) {
          this.guessDistr[num - 1] = this.guessDistr[num - 1] ? this.guessDistr[num - 1] + 1 : 1;
        }
      }
      let maxDistr = Math.max(...this.guessDistr);
      this.guessDistr.forEach((dataEl, i) => {
        this.countDistr[i] = Math.round((dataEl/maxDistr)*100);
      });
  }

  getStreak(){
    let streak = 0;
    let prevNumber = this.gameHistoric![Object.keys(this.gameHistoric!)[0]].number;
    for (let day in this.gameHistoric) {
      if(day !== this.todayDate){
        if(this.gameHistoric[day].number != prevNumber + 1){
          if(this.gameHistoric[day].complete === false){
            streak = 0;
          } else {
            streak = 1;
          }
        } else if(this.gameHistoric[day].complete && this.gameHistoric[day].number === prevNumber + 1){
          streak += 1;
        }
      } else{
        if(this.gameHistoric[day].complete){
          streak += 1;
        }
      }

      if(this.maxStreak < streak){
        this.maxStreak = streak;
      }
      prevNumber = this.gameHistoric[day].number;
    }
    this.currentStreak = streak;
  }


}
