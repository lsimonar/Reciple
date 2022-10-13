import { Component, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter, OnChanges, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DailyGuesses, recipes, RecipleInterface } from 'src/app/models/recipes';
import { selectIsDarkMode } from 'src/app/store';

@Component({
  selector: 'app-recipes-panel',
  templateUrl: './recipes-panel.component.html',
  styleUrls: ['./recipes-panel.component.scss'],
})
export class RecipesPanelComponent implements AfterViewInit {

  @Input() todaySolved: boolean = false;
  @Input() todayFailed: boolean = false;
  @Input() todaysGuesses?: DailyGuesses = {} as DailyGuesses;
  @Input() solution = recipes[7];

  @Output() guessMade: EventEmitter<any> = new EventEmitter();

  @ViewChild('starterTab') starterTab: ElementRef | undefined;
  @ViewChild('mainTab') mainTab: ElementRef | undefined;
  @ViewChild('dessertsTab') dessertsTab: ElementRef | undefined;

  isDarkMode : boolean = false;

  isRecipeValid : boolean = false;
  filteredRecipeList : RecipleInterface[] = [];
  guessedRecipe = {} as RecipleInterface;
  recipeList   : RecipleInterface[] = [];
  prevEvent: any = undefined;
  recipes = recipes;

  constructor(
    private store : Store,
    public translate : TranslateService,
    private renderer : Renderer2,
  ) { 

    this.recipeList = Object.values(recipes);
    this.store.select(selectIsDarkMode).subscribe((isDarkMode: boolean) => {
      this.isDarkMode = isDarkMode;
    })
  }

  ngAfterViewInit(): void{
    this.starterTab?.nativeElement.classList.remove("activated");
    this.mainTab?.nativeElement.classList.remove("activated");
    this.dessertsTab?.nativeElement.classList.remove("activated");

    this.filteredRecipeList = this.recipeFilter('starter');
    this.starterTab?.nativeElement.classList.add("activated");
  }

  getRecipeList(): RecipleInterface[] {
    let recipeList=[];
    for (let i = 0; i < Object.values(this.recipes).length; i++) {
      recipeList.push(this.recipes[i]);
    }
    return recipeList;
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
        return recipe.foodType == filterValue && guessedRecipes.indexOf(recipe.name.toLowerCase()) == -1
      } else{
        return recipe.foodType == filterValue
      }
    });
    return filteredRecipeList.sort((a,b) => this.translate.instant('recipe.'+a.name).localeCompare(this.translate.instant('recipe.'+b.name)))
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

  makeGuess() {
    this.guessMade.emit(this.guessedRecipe);
    this.renderer.removeClass(this.prevEvent.target, 'recipe-button-active');
    this.isRecipeValid = false;
    this.guessedRecipe = {} as RecipleInterface;
    this.filteredRecipeList = this.filteredRecipeList.filter((recipe)=> {
      return recipe.name !== this.todaysGuesses?.attempts[this.todaysGuesses.attempts.length - 1]?.recipe
    });
  }

}
