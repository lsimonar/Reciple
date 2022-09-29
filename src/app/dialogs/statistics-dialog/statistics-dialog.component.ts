import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from 'src/app/app.service';
import { TodayDateHelper } from 'src/app/helpers/todayDateHelper';
import { recipes, DailyGuesses, GameHistoric, RecipleInterface } from 'src/app/models/recipes';
import { selectGameHistoric, selectIsDarkMode } from 'src/app/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dailyReciples } from 'src/app/models/dailyReciples';


@Component({
  selector: 'app-statistics-dialog',
  templateUrl: './statistics-dialog.component.html',
  styleUrls: ['./statistics-dialog.component.scss'],
})
export class StatisticsDialogComponent implements OnInit {

  gameHistoric : GameHistoric = {} as GameHistoric;
  isDarkMode : boolean = false;
  todayDate : string = "";
  todaySolvedIn : number = 0;
  todaySolution : RecipleInterface = {} as RecipleInterface;

  playedGames : number = 0;
  wins : number = 0;
  currentStreak: number = 0;
  maxStreak : number = 0;
  guessDistr : number[] = [0,0,0,0,0,0];
  countDistr : number[] = [0,0,0,0,0,0];
  todaysHistoric: DailyGuesses = {} as DailyGuesses;
  nextCountryDate: Date = new Date();


  constructor(
    private store : Store,
    private service: AppService,
    private _snackBar: MatSnackBar
  ) { 
    this.store.select(selectGameHistoric).subscribe((gameHistoric: GameHistoric) => {
      if(JSON.stringify(gameHistoric) === "{}") {
        gameHistoric = this.service.getLocalStoreGameHistoric();
      }
      this.gameHistoric = gameHistoric;
    });

    this.store.select(selectIsDarkMode).subscribe((isDarkMode: boolean) => {
      this.isDarkMode = isDarkMode;
    });
    this.nextCountryDate = new Date();
    this.nextCountryDate.setHours(24,0,0,0);
  }

  ngOnInit(): void {
    this.todayDate = TodayDateHelper.getTodaysDateString();
    const recipeId : number = dailyReciples[this.todayDate as keyof typeof dailyReciples].recipe
    this.todaySolution = recipes.find(c => c.id === recipeId)!;

    this.getValuesFromGameHistoric();
    this.getStreak();
    this.todaysHistoric = this.gameHistoric[this.todayDate];
    if(this.gameHistoric[this.todayDate]){
      if(this.gameHistoric[this.todayDate].solved){
        this.todaySolvedIn = this.gameHistoric[this.todayDate].attempts.length
      }
    }
  }

  getValuesFromGameHistoric() {
    if(this.gameHistoric != null && this.gameHistoric != undefined) {
      const gameHistoricKeys = Object.keys(this.gameHistoric);
      let playedGames = 0;
      let wins = 0;
      let tries = 0;
      let data = new Array();

      gameHistoricKeys.forEach(key => {
        if(this.gameHistoric![key].solved && this.gameHistoric![key].complete) {
          wins ++;
          playedGames ++;
          tries = this.gameHistoric![key].attempts.length;
          console.log(tries)
          data.push(tries);
        } else if(this.gameHistoric![key].complete){
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
    if(Object.keys(this.gameHistoric).length !== 0){
      let prevNumber = this.gameHistoric![Object.keys(this.gameHistoric!)[0]].number;
      for (let day in this.gameHistoric) {
        if(day !== this.todayDate){
          if(this.gameHistoric[day].number != prevNumber + 1){
            if(this.gameHistoric[day].solved === false){
              streak = 0;
            } else {
              streak = 1;
            }
          } else if(this.gameHistoric[day].solved && this.gameHistoric[day].number === prevNumber + 1){
            streak += 1;
          }
        } else{
          if(this.gameHistoric[day].solved){
            streak += 1;
          }
        }

        if(this.maxStreak < streak){
          this.maxStreak = streak;
        }
        prevNumber = this.gameHistoric[day].number;
      }
    }
    this.currentStreak = streak;
  }

  getSummaryToClipboard(): string {
    let summary = '';
    let todaysHistoric = this.gameHistoric[this.todayDate]
    if(todaysHistoric) {
        summary += `#Reciple `;
        if(todaysHistoric.solved){
          summary += String(todaysHistoric.number) + ' ' + todaysHistoric.attempts.length + '/6\n\n';
        } else{
          summary += String(todaysHistoric.number) + ' X/6\n\n';
        }

      todaysHistoric.attempts.forEach(attempt => {
        attempt.ingredientsHit.forEach(hit => {
          switch(hit) {
            case true:
              return summary += '🍏';
            case false: 
              return summary += '🍎';
            default:
              return ''
          }
        });
        summary += '\n';
      });
    }
    //summary += 'www.reciple.com';
    return summary;
  }

  notifyClipboard() {
    this._snackBar.open('Game copied to clipboard.', undefined, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000 //milliseconds
    });
  }
}
