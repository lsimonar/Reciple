import { Component, Renderer2, OnInit, AfterContentChecked, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {recipes, RecipleInterface, ingredientToEmoji, DailyGuesses, GameHistoric} from 'src/app/models/recipes';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { StatisticsDialogComponent } from '../dialogs/statistics-dialog/statistics-dialog.component';
import { SettingsDialogComponent } from '../dialogs/settings-dialog/settings-dialog.component';
import { AppService } from '../app.service';
import { Store } from '@ngrx/store';
import { setGameHistoric, setIsDarkMode, setIsFirstLogin, setIsHighContrast } from '../store/reciple.actions';
import { TodayDateHelper } from '../helpers/todayDateHelper';
import { selectSettings } from '../store';
import { RecipleSettings } from '../store/reciple.reducer';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeScreenComponent implements OnInit, AfterContentChecked {

  @ViewChild('recipleInput') input1ElementRef: { nativeElement: any; } | undefined;

  recipes = recipes;
  ingredientToEmoji = ingredientToEmoji;
  control = new FormControl('');

  filteredOptions: Observable<string[]> = of([]);

  isRecipeValid: boolean  = false; 
  guessedRecipe: RecipleInterface = {} as RecipleInterface;
  recipeList   : string[] = [];
  solution = recipes[7];
  todaySolved : boolean = false;
  guessedRecipes : RecipleInterface[] = [];
  numberOfSquares: number[] = [0, 1, 2, 3, 4];
  numberOfTries: number[] = [0, 1, 2, 3, 4, 5];
  guess: Array<boolean[]> = [[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false]];
  guessList: Array<string[]> = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
  guessBoxList: string[] = ['','','','','','']
  attempt: number = 0;
  isDarkMode: boolean = false;
  isHighContrast: boolean = false;

  todaysGuesses?: DailyGuesses = {} as DailyGuesses;
  gameHistoric?: GameHistoric;
  recipeUrl: string | undefined;


  constructor(
    private cdref: ChangeDetectorRef,
    private service: AppService,
    private renderer: Renderer2,
    private store: Store,
    public dialog: MatDialog
  ) {
    const self = this;
    this.recipeList = this.getRecipeList();
    document.addEventListener("visibilitychange", function() {
      if(!document.hidden) {
        self.ngOnInit();
      }
    });
    this.store.select(selectSettings).subscribe((settings: RecipleSettings) => {
      this.isHighContrast = settings.isHighContrast;
      this.isDarkMode = settings.isDarkMode;
    });
   }

  ngOnInit(): void {
    this.fetchSettings();
    this.checkFirstLogin();
    let stringDate = TodayDateHelper.getTodaysDateString();
    this.gameHistoric = this.service.getLocalStoreGameHistoric();
    this.todaysGuesses = this.service.getDayHistoric(stringDate);
    if(this.todaysGuesses?.attempts && this.todaysGuesses?.attempts.length > 0 
       && this.todaysGuesses?.complete === true) {
      this.todaySolved = true;
    }
    
    this.todaysGuesses === undefined? this.attempt = 0 : this.attempt = this.todaysGuesses.attempts.length;
    this.todaysGuesses?.attempts.forEach((attempt, index) => {
      this.guess[index] = attempt.ingredientsHit
      this.guessBoxList[index] = attempt.recipe
      attempt.ingredients.forEach((ingredient, index2) => {
          this.guessList[index][index2] = ingredientToEmoji[ingredient as keyof typeof ingredientToEmoji];
      });
    });

    this.control.valueChanges.subscribe((value: any) => {
      this.isRecipeValid=false;
      this.filteredOptions;
    });
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    let inputButton = document.getElementById("Input");
    inputButton?.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("Btn")?.click();
      }
    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  captureKeyboardChange(event: any){
    this.control.setValue(event,{emitEvent: true});
    this.filteredOptions;
  }

  fetchSettings(){
    this.fetchDarkMode();
    const isHighContrast = this.service.isHighContrast();
    this.service.setIsHighContrast(isHighContrast);
    this.store.dispatch(setIsHighContrast({isHighContrast: isHighContrast}));
    this.isHighContrast = isHighContrast;
  }

  fetchDarkMode() {
    const isDarkMode = this.service.isDarkMode();
    this.isDarkMode = isDarkMode
    if(isDarkMode) {
      this.renderer.addClass(document.body, 'darkMode');
    } else {
      this.renderer.removeClass(document.body, 'darkMode');
    }
    this.service.setIsDarkMode(isDarkMode);
    this.store.dispatch(setIsDarkMode({isDarkMode: isDarkMode}));
  }

  openSettingsDialog(){
    this.dialog.open(SettingsDialogComponent, {width: '300px', height: '300px', maxHeight : '95vh'});
  }

  openStatisticsDialog(){
    this.dialog.open(StatisticsDialogComponent, {width: '300px', height: '500px', maxHeight : '95vh'});
  }

  openInfoDialog(){
    this.dialog.open(InfoDialogComponent, {width: '420px', height: '95vh', maxHeight : '90vh'});
  }

  onChange(){
    this.isRecipeValid = false;
    this.recipes.find(r => {
      if(r.name === this.control.value){
        this.isRecipeValid = true;
        this.guessedRecipe = r;
    }});
  }

  makeGuess() {
    this.todaysGuesses = this.service.makeGuess(this.guessedRecipe);
    if(this.todaysGuesses.complete === true) {
      this.todaySolved = true;
      const todayRecipe = this.solution.name;
      this.recipeUrl = this.recipes.find(c => c.name === todayRecipe)?.recipeUrl;
      this.gameHistoric = this.service.getLocalStoreGameHistoric();
      this.store.dispatch(setGameHistoric({gameHistoric: this.gameHistoric}));
      setTimeout(() => { this.openStatisticsDialog(); }, 3000);
    }
    this.attempt = this.todaysGuesses.attempts.length;
    this.todaysGuesses?.attempts.forEach((attempt, index) => {
      this.guess[index] = attempt.ingredientsHit
      attempt.ingredients.forEach((ingredient, index2) => {
          this.guessList[index][index2] = ingredientToEmoji[ingredient as keyof typeof ingredientToEmoji];
        });
    });
    this.control.setValue('');    
  }

  _filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.recipeList.filter(recipe => {
      const guessedRecipes = this.todaysGuesses?.attempts?.map(a => a.recipe.toLowerCase());
      if(guessedRecipes && guessedRecipes.length){
        return this.normalizeValue(recipe).toLowerCase().includes(filterValue)
               && guessedRecipes.indexOf(recipe.toLowerCase()) == -1
      } else{
        return this.normalizeValue(recipe).toLowerCase().includes(filterValue);
      }
    });
  }

  normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  getRecipeList(): string[] {
    let recipeList=[];
    for (let i = 0; i < Object.values(this.recipes).length; i++) {
      recipeList.push(this.recipes[i].name);
    }
    return recipeList;
  }

  checkFirstLogin() {
    const isFirstLogin = this.service.isFirstLogin();
    this.store.dispatch(setIsFirstLogin({isFirstLogin: isFirstLogin}));
    if(isFirstLogin) {
      this.openInfoDialog();
      this.service.setFirstLoginToFalse();
    }
  }

}
