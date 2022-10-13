import { Component, OnInit, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DailyGuesses, ingredientToEmoji, RecipleInterface } from 'src/app/models/recipes';

export interface GameStatus {
  attempt        : number,
  guessedRecipes : RecipleInterface[],
  squareHit      : Array<boolean[]>,
  tooltipText    : Array<string[]>,
  squareEmoji    : Array<string[]>,
}

@Component({
  selector: 'app-game-squares',
  templateUrl: './game-squares.component.html',
  styleUrls: ['./game-squares.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameSquaresComponent implements OnInit, OnChanges {

  @Input() todaysGuesses? : DailyGuesses;
  @Input() isHighContrast: boolean = false;

  gameStatus : GameStatus = {} as GameStatus;

  constructor(
    public sanitizer : DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.gameStatus.squareHit   = new Array(6).fill(0).map(e => new Array(6).fill(false));
    this.gameStatus.tooltipText = new Array(6).fill(0).map(e => new Array(6).fill(''));
    this.gameStatus.squareEmoji = new Array(6).fill(0).map(e => new Array(6).fill(''));
    this.todaysGuesses === undefined? this.gameStatus.attempt = 0 : this.gameStatus.attempt = this.todaysGuesses.attempts.length;
    
    this.todaysGuesses?.attempts.forEach((attempt, index) => {
      this.gameStatus.squareHit[index] = attempt.ingredientsHit
      attempt.ingredients.forEach((ingredient, index2) => {
        this.gameStatus.tooltipText[index][index2] = ingredient;
          this.gameStatus.squareEmoji[index][index2] = ingredientToEmoji[ingredient as keyof typeof ingredientToEmoji];
      });
    });
  }
  
  ngOnChanges(): void {
    if(this.todaysGuesses && this.todaysGuesses.attempts){
      this.gameStatus.attempt = this.todaysGuesses.attempts.length;
      this.todaysGuesses.attempts.forEach((attempt, index) => {
        this.gameStatus.squareHit[index] = attempt.ingredientsHit
        attempt.ingredients.forEach((ingredient, index2) => {
            this.gameStatus.tooltipText[index][index2] = ingredient;
            this.gameStatus.squareEmoji[index][index2] = ingredientToEmoji[ingredient as keyof typeof ingredientToEmoji];
        });
      });
    }
  }

}
