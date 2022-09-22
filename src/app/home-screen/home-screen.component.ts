import { Component, Renderer2, OnInit, AfterContentChecked, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {recipes, RecipeInterface, ingredientToEmoji} from 'src/app/models/recipes';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppService } from '../app.service';
import { Store } from '@ngrx/store';
import { setIsDarkMode } from '../store/reciple.actions';

interface GuessedIngredients {
  name: string,
  nameLong : string,
  guessed: boolean
}

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeScreenComponent implements OnInit, AfterContentChecked {

  recipes = recipes;
  ingredientToEmoji = ingredientToEmoji;
  control = new FormControl('');

  filteredOptions: Observable<string[]> = of([]);

  isRecipeValid: boolean  = false; 
  guessedRecipe?: RecipeInterface;
  recipeList   : string[] = [];
  solution = recipes[7];
  hit : boolean = false;
  guessedRecipes : RecipeInterface[] = [];
  ingredientsList: GuessedIngredients[] = [];
  numberOfSquares: number[] = [0, 1, 2, 3, 4];
  numberOfTries: number[] = [0, 1, 2, 3, 4, 5];
  guess: Array<boolean[]> = [[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false]];
  guessList: Array<string[]> = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
  attempt: number = 0;
  isDarkMode: boolean = false;

  constructor(
    private router: Router,
    private cdref: ChangeDetectorRef,
    private service: AppService,
    private renderer: Renderer2,
    private store: Store,
  ) {
    this.recipeList = this.getRecipeList();
   }

  ngOnInit(): void {
    this.fetchSettings();
    this.control.valueChanges.subscribe((value: any) => {
      this.isRecipeValid=false;
      this.filteredOptions;
    });
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    Object.keys(this.solution.ingredients).forEach((ingredient) => {
      this.ingredientsList.push({name : ingredient, nameLong: this.solution.ingredients[ingredient as keyof typeof this.solution.ingredients]![0], guessed : false});
    });

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

  fetchSettings(){
    this.fetchDarkMode();
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

  goToSettings(){
    this.router.navigateByUrl('/settings', {skipLocationChange: false});
  }

  goToContact(){
    this.router.navigateByUrl('/contact', {skipLocationChange: false});
  }

  onChange(){
    this.isRecipeValid = false;
    Object.values(this.recipes).forEach((recipe) => {
      if(recipe.name === this.control.value) {
        this.isRecipeValid = true;
        this.guessedRecipe = recipe;
      }
    }) 
  }

  makeGuess() {
    if(this.guessedRecipe){
      if(this.guessedRecipe.id === this.solution.id){
        this.hit = true;
      } else{
        this.guessedRecipes.push(this.guessedRecipe);
      }
      this.getGuessedIngredients()
      this.control.setValue('');    
      this.attempt += 1; 
    }
  }

  getGuessedIngredients(){
    if(this.ingredientsList){
      let j=0;
      Object.keys(this.guessedRecipe!.ingredients).forEach(ingredient => {
        this.guessList[j][this.attempt] = ingredientToEmoji[ingredient as keyof typeof ingredientToEmoji];
          if(Object.keys(this.solution.ingredients).indexOf(ingredient) !== -1){
            this.guess[j][this.attempt] = true;
            this.ingredientsList.forEach((ing, i) => {
              if(ing.name === ingredient){
                this.ingredientsList[i].guessed = true;
              }
            })
          }
          j +=1;
      });
    }
  }

  _filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.recipeList.filter(recipe => {
      let guessedRecipes: string[] = []
      this.guessedRecipes.forEach(recipe => {
        guessedRecipes.push(recipe.name.toLowerCase());  
      });
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

}
