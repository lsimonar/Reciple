import { Component, Renderer2, ElementRef, OnInit, AfterContentChecked, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {recipes, RecipleInterface, ingredientToEmoji, DailyGuesses, GameHistoric} from 'src/app/models/recipes';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { StatisticsDialogComponent } from '../dialogs/statistics-dialog/statistics-dialog.component';
import { SettingsDialogComponent } from '../dialogs/settings-dialog/settings-dialog.component';
import { AppService } from '../app.service';
import { Store } from '@ngrx/store';
import { setAvailableLanguages, setGameHistoric, setIsDarkMode, setIsFirstLogin, setIsHighContrast, setLanguage } from '../store/reciple.actions';
import { TodayDateHelper } from '../helpers/todayDateHelper';
import { selectSettings } from '../store';
import { RecipleSettings } from '../store/reciple.reducer';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';
import { dailyReciples } from '../models/dailyReciples';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

export const recipleAvailableLangs = ['en', 'es'];

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeScreenComponent implements OnInit, AfterContentChecked {

  @ViewChild('recipleInput') input1ElementRef: { nativeElement: any; } | undefined;
  @ViewChild('starterTab') starterTab: ElementRef | undefined;
  @ViewChild('mainTab') mainTab: ElementRef | undefined;
  @ViewChild('dessertsTab') dessertsTab: ElementRef | undefined;

  recipes = recipes;
  ingredientToEmoji = ingredientToEmoji;
  control = new FormControl('');

  filteredOptions: Observable<RecipleInterface[]> = of([]);

  isRecipeValid: boolean  = false; 
  guessedRecipe: RecipleInterface = {} as RecipleInterface;
  recipeList   : RecipleInterface[] = [];
  filteredRecipeList : RecipleInterface[] = [];
  solution = recipes[7];
  todaySolved : boolean = false;
  guessedRecipes : RecipleInterface[] = [];
  numberOfSquares: number[] = [0, 1, 2, 3, 4];
  numberOfTries: number[] = [0, 1, 2, 3, 4, 5];
  guess: Array<boolean[]> = [[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false]];
  guessList: Array<string[]> = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
  guessListText: Array<string[]> = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
  guessBoxList: string[] = ['','','','','','']
  attempt: number = 0;
  isDarkMode: boolean = false;
  isHighContrast: boolean = false;
  prevEvent : any = undefined;

  todaysGuesses?: DailyGuesses = {} as DailyGuesses;
  gameHistoric?: GameHistoric;
  recipeUrl: string | undefined;


  constructor(
    private cdref: ChangeDetectorRef,
    private service: AppService,
    private renderer: Renderer2,
    private store: Store,
    public dialog: MatDialog,
    public translate: TranslateService,
    public sanitizer: DomSanitizer
  ) {
    translate.addLangs(recipleAvailableLangs);
    this.store.dispatch(setAvailableLanguages({availableLanguages: recipleAvailableLangs}));
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(recipleAvailableLangs[0]);
    this.store.dispatch(setLanguage({language: recipleAvailableLangs[0]}));

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

    const recipeId : number = dailyReciples[stringDate as keyof typeof dailyReciples].recipe

    const todayRecipe = this.recipes.find(c => c.id === recipeId);
    this.solution = todayRecipe!;
    if(todayRecipe != undefined) {
      this.service.setTodaysRecipe(todayRecipe);
      this.service.setTodaysNumber(dailyReciples[stringDate as keyof typeof dailyReciples].number);
    }

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
        this.guessListText[index][index2] = ingredient;
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
    this.filteredRecipeList = this.recipeFilter('main');
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
    this.fetchLanguage();
    const isHighContrast = this.service.isHighContrast();
    this.service.setIsHighContrast(isHighContrast);
    this.store.dispatch(setIsHighContrast({isHighContrast: isHighContrast}));
    this.isHighContrast = isHighContrast;
  }

  fetchLanguage() {
    const lang = this.service.getLanguage();
    if(lang != null) {
      this.translate.use(lang);
      this.service.setLanguage(lang);
      this.store.dispatch(setLanguage({language: lang}));
    } else {
      const navigatorLang = navigator.language;
      let chosenLang = 'en';
      if(navigatorLang.toLowerCase().indexOf('es') > -1) {
        chosenLang = 'es';
      }
      this.translate.use(chosenLang);
      this.service.setLanguage(chosenLang);
      this.store.dispatch(setLanguage({language: chosenLang}));
    }
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
    this.dialog.open(InfoDialogComponent, {width: '450px', maxWidth: '100vw', height: '90vh', maxHeight : '90vh'});
  }

  onChange(){
    this.isRecipeValid = false;
    this.recipes.find(r => {
      if(r.name === this.control.value){
        this.isRecipeValid = true;
        this.guessedRecipe = r;
      }
    });
  }

  makeGuess() {
    this.todaysGuesses = this.service.makeGuess(this.guessedRecipe);
    if(this.todaysGuesses.complete === true) {
      this.todaySolved = true;
      const todayRecipe = this.solution.name;
      this.recipeUrl = this.recipes.find(c => c.name === todayRecipe)?.recipeUrl;
      this.gameHistoric = this.service.getLocalStoreGameHistoric();
      this.store.dispatch(setGameHistoric({gameHistoric: this.gameHistoric}));
      setTimeout(() => { this.openStatisticsDialog(); }, 2000);
    }
    this.attempt = this.todaysGuesses.attempts.length;
    this.todaysGuesses?.attempts.forEach((attempt, index) => {
      this.guess[index] = attempt.ingredientsHit
      attempt.ingredients.forEach((ingredient, index2) => {
          this.guessListText[index][index2] = ingredient;
          this.guessList[index][index2] = ingredientToEmoji[ingredient as keyof typeof ingredientToEmoji];
      });
    });
    this.control.setValue(''); 
    this.renderer.removeClass(this.prevEvent.target, 'recipe-button-active')   
  }

  _filter(value: string): RecipleInterface[] {
    const filterValue = this.normalizeValue(value);
    return this.recipeList.filter(recipe => {
      const guessedRecipes = this.todaysGuesses?.attempts?.map(a => a.recipe.toLowerCase());
      const translatedRecipe: string = this.translate.instant('recipe.'+recipe).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if(guessedRecipes && guessedRecipes.length){
        return this.normalizeValue(translatedRecipe).toLowerCase().includes(filterValue)
               && guessedRecipes.indexOf(recipe.name.toLowerCase()) == -1
      } else{
        return this.normalizeValue(translatedRecipe).toLowerCase().includes(filterValue);
      }
    });
  }

  normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  displayCountryFn(value?: any) {      
    return value ? this.translate.instant('recipe.'+value) : undefined;
  }

  getRecipeList(): RecipleInterface[] {
    let recipeList=[];
    for (let i = 0; i < Object.values(this.recipes).length; i++) {
      recipeList.push(this.recipes[i]);
    }
    recipeList = recipeList.sort((a,b) => a.name.localeCompare(b.name))
    return recipeList;
  }

  recipeSelectorHandler(event: any, recipe : RecipleInterface) {
    this.isRecipeValid = true;
    this.guessedRecipe = recipe;
    if(this.prevEvent){
      this.renderer.removeClass(this.prevEvent.target, 'recipe-button-active')
    }
    this.renderer.addClass(event.target, 'recipe-button-active')
    this.prevEvent = event;
  }

  tabHandler(tab : string){
    this.starterTab?.nativeElement.classList.remove("activated");
    this.mainTab?.nativeElement.classList.remove("activated");
    this.dessertsTab?.nativeElement.classList.remove("activated");

    if(tab === 'starter'){
      this.starterTab?.nativeElement.classList.add("activated");
      this.filteredRecipeList = this.recipeFilter('starter');
    } else if(tab === 'main'){
      this.mainTab?.nativeElement.classList.add("activated");
      this.filteredRecipeList = this.recipeFilter('main');
    } else if(tab === 'dessert'){
      this.dessertsTab?.nativeElement.classList.add("activated");
      this.filteredRecipeList = this.recipeFilter('dessert');
    }
    this.isRecipeValid = false;
    this.guessedRecipe = {} as RecipleInterface;
  }

  recipeFilter(tab: string): RecipleInterface[] {
    const filterValue = tab;
    const filteredRecipeList = this.recipeList.filter(recipe => {
      const guessedRecipes = this.todaysGuesses?.attempts?.map(a => a.recipe.toLowerCase());
      if(guessedRecipes && guessedRecipes.length){
        return recipe.foodType == filterValue
               && guessedRecipes.indexOf(recipe.name.toLowerCase()) == -1
      } else{
        return recipe.foodType == filterValue
      }
    });
    return filteredRecipeList.sort((a,b) => a.name.localeCompare(b.name))
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

