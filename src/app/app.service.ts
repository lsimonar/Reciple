import { Renderer2, RendererFactory2 } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RecipleInterface, Attempt, DailyGuesses, GameHistoric } from './models/recipes';
import { TodayDateHelper } from './helpers/todayDateHelper';
import { recipes } from './models/recipes';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private settingsStorageKey = 'reciple_settings';
  private gameHistoricStorageKey = 'reciple_game_historic';
  private renderer : Renderer2;
  private todaysRecipe = recipes[7];
  private gameHistoric: GameHistoric = {};
  private todaysNumber: number = 0;
  private todaysHistoric?: DailyGuesses;

  constructor(
    private router: Router,
    rendererFactory: RendererFactory2
    ) { 
      this.renderer = rendererFactory.createRenderer(null, null);
      this.gameHistoric = this.getLocalStoreGameHistoric();
  }
  
  makeGuess(country: RecipleInterface) {
    let todaysDate = TodayDateHelper.getTodaysDateString();
    const attempt: Attempt = this.populateAttemptFromGuess(country, this.todaysRecipe);
    let todayHistoric = this.getDayHistoric(todaysDate);
    if(todayHistoric != null && todayHistoric != undefined) {
      todayHistoric.attempts.push(attempt);
    } else {
      todayHistoric = {
        complete: false,
        solved  : false, 
        number: this.todaysNumber,
        attempts: [attempt]
      } as DailyGuesses;
    }
    if(attempt.hit === true) {
      todayHistoric.solved = true;
      todayHistoric.complete = true;
    } else if(todayHistoric.attempts.length === 6){
      todayHistoric.complete = true;
    }
    this.todaysHistoric = todayHistoric;
    this.gameHistoric[todaysDate] = todayHistoric;
    this.setLocalStoreGameHistoric();
    return todayHistoric;
  }

  populateAttemptFromGuess(guess:RecipleInterface, gameSolution: RecipleInterface) {
    const attempt: Attempt = {} as Attempt;
    if(gameSolution.id != null && gameSolution.id != undefined && gameSolution.id != 0) {
      attempt.recipe = guess.name;
      attempt.ingredients = guess.ingredients.slice(0,4);
      attempt.ingredients.push(guess.foodType)
      attempt.ingredientsHit = [false, false , false, false, false]
      attempt.hit = false;
      if(guess.id === gameSolution.id) {
        attempt.hit = true;
        attempt.ingredientsHit = [true, true, true, true, true]
      } else {
          guess.ingredients.forEach((ingredient, i) => {
            if(gameSolution.ingredients.indexOf(ingredient) !== -1) {
              attempt.ingredientsHit[i] = true;
            }
        });
      }
    }
    return attempt;
  }

  getDayHistoric(day: string): DailyGuesses | undefined {
    return this.gameHistoric[day];
  }

  setTodaysRecipe(recipe: RecipleInterface){
    this.todaysRecipe = recipe;
  }

  setTodaysNumber(number: number){
    this.todaysNumber = number;
  }
  
  //Store functions

  getLocalSettings() {
    const strLocalSettings = localStorage.getItem(this.settingsStorageKey);
    return strLocalSettings == null ? null : JSON.parse(strLocalSettings);
  }

  setLocalSettings(localSettings: any) {
    localStorage.setItem(this.settingsStorageKey, JSON.stringify(localSettings));
  }

  isHighContrast(): boolean {
    const localSettings = this.getLocalSettings();
    if(localSettings != null && localSettings.isHighContrast != null && localSettings.isHighContrast != undefined) {
      return this.isTrue(localSettings.isHighContrast);
    } else {
      return false;
    }
  }

  setIsHighContrast(isHighContrast: boolean) {
    let localSettings = this.getLocalSettings();
    if(localSettings == null) {
      localSettings = {};
    }
    localSettings.isHighContrast = isHighContrast;
    this.setLocalSettings(localSettings);
  }

  setIsDarkMode(isDarkMode: boolean) {
    if(isDarkMode) {
      this.renderer.addClass(document.body, 'darkMode');
    } else {
      this.renderer.removeClass(document.body, 'darkMode');
    }
    let localSettings = this.getLocalSettings();
    if(localSettings == null) {
      localSettings = {};
    }
    localSettings.isDarkMode = isDarkMode;
    this.setLocalSettings(localSettings);
  }

  setLocalStoreGameHistoric() {
    localStorage.setItem(this.gameHistoricStorageKey, JSON.stringify(this.gameHistoric));
  }

  getLocalStoreGameHistoric(): GameHistoric {
    const localHistoric = localStorage.getItem(this.gameHistoricStorageKey);
    if(localHistoric != null) {      
      return JSON.parse(localHistoric);
    } else {
      return {} as GameHistoric;
    }
  }

  isDarkMode(): boolean {
    const localSettings = this.getLocalSettings();
    if(localSettings != null && localSettings.isDarkMode != null && localSettings.isDarkMode != undefined) {
      return this.isTrue(localSettings.isDarkMode);
    } else {
      return false;
    }
  }

  isFirstLogin() {
    const localSettings = this.getLocalSettings();
    if(localSettings == null) {
      return true;
    } else {
      return localSettings.isFirstLogin == undefined ||
      localSettings.isFirstLogin == null ||
      localSettings.isFirstLogin == true ||
      localSettings.isFirstLogin == 'true';
    }
  }

  setFirstLoginToFalse() {
    let localSettings = this.getLocalSettings();
    if(localSettings == null) {
      localSettings = {};
    }
    localSettings.isFirstLogin = false;
    this.setLocalSettings(localSettings);
  }

  getLanguage() {
    const localSettings = this.getLocalSettings();
    if(localSettings != null && localSettings.language != null && localSettings.language != undefined) {
      return localSettings.language;
    } else {
      return null;
    }
  }

  setLanguage(language: string) {
    let localSettings = this.getLocalSettings();
    if(localSettings == null) {
      localSettings = {};
    }
    localSettings.language = language;
    this.setLocalSettings(localSettings);
  }
  
  private isTrue(checkVar: any) {
    return checkVar == true || checkVar == 'true' || checkVar == 'True';
  }
  
}

