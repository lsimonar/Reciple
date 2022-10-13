import { Component, Renderer2, OnInit, AfterContentChecked, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import {recipes, RecipleInterface, ingredientToEmoji, DailyGuesses, GameHistoric} from 'src/app/models/recipes';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { Store } from '@ngrx/store';
import { setAvailableLanguages, setGameHistoric, setIsDarkMode, setIsFirstLogin, setIsHighContrast, setLanguage } from '../store/reciple.actions';
import { TodayDateHelper } from '../helpers/todayDateHelper';
import { selectSettings } from '../store';
import { RecipleSettings } from '../store/reciple.reducer';
import { dailyReciples } from '../models/dailyReciples';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';
import { StatisticsDialogComponent } from '../dialogs/statistics-dialog/statistics-dialog.component';
import { SettingsDialogComponent } from '../dialogs/settings-dialog/settings-dialog.component';
import { ContactDialogComponent } from '../dialogs/contact-dialog/contact-dialog.component';

export const recipleAvailableLangs = ['en', 'es'];

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeScreenComponent implements OnInit, AfterContentChecked{

  recipes = recipes;
  ingredientToEmoji = ingredientToEmoji;

  solution = recipes[7];
  todaySolved : boolean = false;
  todayFailed : boolean = false;

  isDarkMode: boolean = false;
  isHighContrast: boolean = false;

  todaysGuesses?: DailyGuesses = {} as DailyGuesses;
  gameHistoric?: GameHistoric;

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
    if(this.todaysGuesses?.attempts && this.todaysGuesses?.attempts.length > 0) {
      if (this.todaysGuesses?.solved === true){
      this.todaySolved = true;
      }
      else if (this.todaysGuesses.complete) {
        this.todayFailed = true;
      }
    }

    this.todaySolved = false;
    this.todayFailed = false;

  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
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
      if(navigatorLang.toLowerCase().indexOf('es') > -1 || navigatorLang.toLowerCase().indexOf('ca') > -1) {
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
    this.dialog.open(StatisticsDialogComponent, {width: '320px', height: '520px', maxHeight : '95vh'});
  }

  openInfoDialog(){
    this.dialog.open(InfoDialogComponent, {width: '440px', maxWidth: '100vw', height: '90vh', maxHeight : '90vh'});
  }

  openContactDialog(){
    this.dialog.open(ContactDialogComponent, {width: '300px', maxWidth: '100vw', height: '290px', maxHeight : '90vh'});
  }

  makeGuess(guessedRecipe: RecipleInterface) {
    let todaysGuesses = this.service.makeGuess(guessedRecipe);
    this.todaysGuesses = {...todaysGuesses}; //so that angular detects a change!
    if(this.todaysGuesses.complete === true) {
      this.todaysGuesses.solved ? this.todaySolved = true : this.todayFailed = true ; 
      this.gameHistoric = this.service.getLocalStoreGameHistoric();
      this.store.dispatch(setGameHistoric({gameHistoric: this.gameHistoric}));
      setTimeout(() => { this.openStatisticsDialog(); }, 2000);
    }
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

