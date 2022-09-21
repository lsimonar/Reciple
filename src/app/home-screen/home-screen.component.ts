import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {recipes, RecipeInterface, ingredientToEmoji} from 'src/app/models/recipes';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface GuessedIngredients {
  name: string,
  guessed: boolean
}

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit, AfterContentChecked {

  recipes = recipes;
  ingredientToEmoji = ingredientToEmoji;
  control = new FormControl('');

  filteredOptions: Observable<string[]> = of([]);

  isRecipeValid: boolean  = false; 
  guessedRecipe?: RecipeInterface;
  recipeList   : string[] = [];
  solution = recipes[9];
  hit : boolean = false;
  guessedRecipes : RecipeInterface[] = [];
  ingredientsList: GuessedIngredients[] = [];
  numberOfSquares: number[] = [0, 1, 2, 3, 4];
  numberOfTries: number[] = [0, 1, 2, 3, 4, 5];
  guess: Array<boolean[]> = [[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false]];
  guessList: Array<string[]> = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
  attempt: number = 0;

  constructor(
    private router: Router,
    private cdref: ChangeDetectorRef
  ) {
    this.recipeList = this.getRecipeList();
   }

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value: any) => {
      this.isRecipeValid=false;
      this.filteredOptions;
    });
    console.log(this.solution)
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.solution.ingredients.forEach((ingredient) => {
      this.ingredientsList.push({name : ingredient, guessed : false});
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

  goToSettings(){
    this.router.navigateByUrl('/settings', {skipLocationChange: false});
  }

  goToContact(){
    this.router.navigateByUrl('/contact', {skipLocationChange: false});
  }

  onChange(event: any){
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
      this.guessedRecipe?.ingredients.forEach(ingredient => {
        this.guessList[j][this.attempt] = ingredientToEmoji[ingredient as keyof typeof ingredientToEmoji];
          if(this.solution.ingredients.indexOf(ingredient) !== -1){
            this.guess[j][this.attempt] = true;
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
