export interface GameHistoric {
    [key: string]: DailyGuesses;
}

export interface RecipleInterface {
    id         : number,
    name       : string,
    ingredients: string[],
    cookTime   : number,
    serves : number,
    foodType   : string,
    country    : string,
    recipeUrl : string,
}

export interface DailyGuesses {
    complete : boolean,
    solved   : boolean,
    number   : number,
    attempts : Array<Attempt> 
}

export interface Attempt {
    recipe : string,
    hit    : boolean,
    ingredients : Array<string>,
    ingredientsHit : Array<boolean>
}

export const ingredientToEmoji = {
    'rice': '🍚',
    'chicken' : '🐓',
    'tomato' : '🍅',
    'mushroom': '🍄',
    'cheese': '🧀',
    'wine' : '🍷',
    'pasta': '🍝',
    'onion' : '🧅',
    'meat' : '🥩',
    'seafood': '🦐',
    'carrot': '🥕',
    'curry': '🍛',
    'bacon': '🥓',
    'leafygreen': '🥬',
    'olives': '🫒',
    'egg': '🥚',
    'bread': '🥖',
    'rabbit': '🐇',
    'bean': '🫘',
    'fish' : '🐟',
    'pepper' : '🌶️',
    'milk' : '🥛',
    'butter' : '🧈',
    'avocado' : '🥑',
    'beef' : '🐄',
    'pork' : '🐖',
    'wrap' : '🌯',
    'alcohol' : '🍶',
    'broth' : '🥣',
    'garlic': '🧄',
    'apple' : '🍏',
    'water' : '🥤',
    'lemon' : '🍋',
    'potato' : '🥔',
    'chocolate' : '🍫',
    'flour' : '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/flour.svg" alt="Flour"/>',
    'celery': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/celery.svg" alt="Celery"/>',
    'cinnamon': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/cinnamon.svg" alt="Cinnamon"/>',
    'yeast': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/yeast.png" alt="Yeast"/>',
    'salt': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/salt.svg" alt="Salt"/>',
    'sugar': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/sugar.svg" alt="Sugar"/>',
    'oil': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/oil.png" alt="Oil"/>',
    'jelly': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/jelly.svg" alt="Jelly"/>',
    'soy' : '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/soy.png" alt="Soy Sauce"/>'

} 

export const recipes = [
    {
        "id"         : 1,
        "name"       : "Paella",
        "ingredients": ['rice', 'chicken', 'rabbit', 'bean', 'tomato'],
        "cookTime"   : 2,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "spain",
        "recipeUrl"  : "https://www.tasteatlas.com/paella/recipe"
    },
    {
        "id"         : 2,
        "name"       : "Risotto",
        "ingredients": ['rice', 'cheese', 'butter', 'mushroom', 'onion'],
        "cookTime"   : 1,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "italy",
        "recipeUrl"  : "https://www.tasteatlas.com/risotto/recipe"

    },
    {
        "id"         : 3,
        "name"       : "Pasta bolognesa",
        "ingredients": ['pasta', 'beef', 'tomato', 'onion', 'salt'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "italy",
        "recipeUrl"  : "https://www.tasteatlas.com/bolognese/recipe"
    },
    /*{
        "id"         : 4,
        "name"       : "Seafood paella",
        "ingredients": ['rice', 'tomato', 'seafood', 'pepper', 'broth'],
        "cookTime"   : 2,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "spain",
        "recipeUrl"  : ""
    },
    {
        "id"         : 5,
        "name"       : "beef cannelloni",
        "ingredients": ['beef', 'pasta', 'milk', 'butter', 'cheese'],
        "cookTime"   : 1,
        "cookMethod" : "oven",
        "foodType"   : "main",
        "country"    : "italy, spain",
        "recipeUrl"  : "https://www.greatitalianchefs.com/recipes/cannelloni-di-carne-recipe"
    },
    {
        "id"         : 6,
        "name"       : "Katso Curry",
        "ingredients": ['rice', 'chicken', 'curry', 'carrot', 'onion'],
        "cookTime"   : 1,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "japan",
        "recipeUrl"  : "https://thewoksoflife.com/chicken-katsu-curry-rice/"
    },*/
    {
        "id"         : 7,
        "name"       : "Lasagne",
        "ingredients": ['beef', 'pasta', 'cheese', 'milk', 'tomato'],
        "cookTime"   : 1,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "italy",
        "recipeUrl"  : "https://www.tasteatlas.com/lasagne/recipe"
    },
    /*{
        "id"         : 8,
        "name"       : "Pasta carbonara",
        "ingredients": ['egg', 'pasta', 'onion', 'cheese', 'bacon'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "italy",
        "recipeUrl"  : "https://www.tasteatlas.com/carbonara/recipe"
    },*/
    {
        "id"         : 9,
        "name"       : "caesar salad",
        "ingredients": ['bread', 'leafygreen', 'egg', 'cheese', 'garlic'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "starter",
        "country"    : "mexico",
        "recipeUrl"  : "https://www.tasteatlas.com/caesar-salad/recipe"
    },
    {
        "id"         : 10,
        "name"       : "Cheeseburguer",
        "ingredients": ['bread', 'beef', 'onion', 'tomato', 'cheese'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "usa",
        "recipeUrl"  : "https://www.tasteatlas.com/cheeseburger/recipe"
    },
    /*{
        "id"         : 11,
        "name"       : "Lobster bisque",
        "ingredients": ['seafood', 'butter', 'onion', 'carrot', 'celery'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "france",
        "recipeUrl"  : "https://www.tasteatlas.com/bisque/recipe"
    },
    {
        "id"         : 12,
        "name"       : "Tortas",
        "ingredients": ['beef', 'bread', 'bean', 'avocado', 'cheese'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "mexico",
        "recipeUrl"  : "https://www.tasteatlas.com/tortas/recipe"
    },*/
    {
        "id"         : 13,
        "name"       : "Gyros",
        "ingredients": ['wrap' ,'beef', 'tomato', 'onion', 'leafygreen'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "greece",
        "recipeUrl"  : "https://www.tasteatlas.com/gyros/recipe"
    },
    /*{
        "id"         : 14,
        "name"       : "Yakisoba",
        "ingredients": ['pasta', 'pork', 'soy', 'onion', 'carrot'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "japan",
        "recipeUrl"  : "https://www.tasteatlas.com/yakisoba/recipe"
    },
    {
        "id"         : 15,
        "name"       : "Fondue",
        "ingredients": ['cheese', 'wine', 'garlic', 'bread', 'alcohol'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "switzerland, france",
        "recipeUrl"  : "https://www.tasteatlas.com/fondue"
    },
    {
        "id"         : 16,
        "name"       : "Bibimbap",
        "ingredients": ['rice', 'beef', 'leafygreen', 'carrot', 'egg'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "south korea",
        "recipeUrl"  : "https://www.tasteatlas.com/bibimbap"
    },*/
    {
        "id"         : 17,
        "name"       : "Fajita",
        "ingredients": ['wrap', 'beef', 'pepper', 'avocado', 'onion'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "mexico",
        "recipeUrl"  : "https://www.tasteatlas.com/fajitas/recipe"
    },
    {
        "id"         : 18,
        "name"       : "Pho",
        "ingredients": ['pasta', 'beef', 'onion', 'garlic', 'broth'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "vietnam",
        "recipeUrl"  : "https://www.tasteatlas.com/pho"
    },
    /*{
        "id"         : 19,
        "name"       : "Quiche",
        "ingredients": ['egg', 'milk', 'cheese', 'bacon', 'butter'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "country"    : "france",
        "recipeUrl"  : "https://www.tasteatlas.com/quiche/recipe"
    },*/
    {
        "id"         : 20,
        "name"       : "Ramen",
        "ingredients": ['pasta', 'pork', 'broth', 'egg', 'mushroom'],
        "cookTime"   : 0.5,
        "cookMethod" : "hob",
        "foodType"   : "main",
        "country"    : "japan",
        "recipeUrl"  : "https://www.tasteatlas.com/ramen/recipe"
    },
    /*{
        "id"         : 21,
        "name"       : "Chicken croquetas",
        "ingredients": ['chicken', 'milk', 'butter', 'flour', 'bread'],
        "cookTime"   : 2,
        "cookMethod" : "fried",
        "foodType"   : "starter",
        "country"    : "spain",
        "recipeUrl"  : "https://www.tasteatlas.com/croquetas"
    },*/
    {
        "id"         : 22,
        "name"       : "pretzel",
        "ingredients": ['flour', 'yeast', 'butter', 'sugar', 'salt'],
        "cookTime"   : 0.5,
        "foodType"   : "dessert",
        "country"    : "germany",
        "recipeUrl"  : "https://www.tasteatlas.com/pretzel/recipe"
    },
    /*{
        "id"         : 23,
        "name"       : "croissant",
        "ingredients": ['flour', 'butter', 'milk', 'egg', 'sugar'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "france",
        "recipeUrl"  : "https://www.tasteatlas.com/croissant/recipe"
    },*/
    {
        "id"         : 24,
        "name"       : "crumble",
        "ingredients": ['apple', 'flour', 'butter', 'sugar', 'cinnamon'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "uk",
        "recipeUrl"  : "https://www.tasteatlas.com/crumble/recipe"   
    },
    {
        "id"         : 25,
        "name"       : "pizza margarita",
        "ingredients": ['flour', 'water', 'yeast', 'tomato', 'cheese'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "main",
        "country"    : "italy",
        "recipeUrl"  : "https://www.tasteatlas.com/margherita/recipe"   
    },
    /*{
        "id"         : 26,
        "name"       : "eclair",
        "ingredients": ['flour', 'egg', 'butter', 'milk', 'sugar'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "france",
        "recipeUrl"  : "https://www.tasteatlas.com/eclair/recipe"   
    },*/
    {
        "id"         : 27,
        "name"       : "apple pie",
        "ingredients": ['apple', 'flour', 'butter', 'sugar', 'cinnamon'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "usa",
        "recipeUrl"  : "https://www.tasteatlas.com/apple-pie/recipe"   
    },
    {
        "id"         : 28,
        "name"       : "churros",
        "ingredients": ['flour', 'water', 'oil', 'sugar', 'salt'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "spain",
        "recipeUrl"  : "https://www.tasteatlas.com/churros/recipe"   
    },
    {
        "id"         : 29,
        "name"       : "spring roll",
        "ingredients": ['flour', 'egg', 'mushroom', 'carrot', 'pork'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "starter",
        "country"    : "china",
        "recipeUrl"  : "https://www.tasteatlas.com/spring-rolls/recipe"   
    },
    /*{
        "id"         : 30,
        "name"       : "ceviche",
        "ingredients": ['fish', 'lemon', 'pepper', 'onion', 'salt'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "main",
        "country"    : "peru",
        "recipeUrl"  : "https://www.tasteatlas.com/ceviche/recipe"   
    },*/
    {        
        "id"         : 31,
        "name"       : "doughnut",
        "ingredients": ['flour', 'butter', 'egg', 'sugar', 'milk'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "usa",
        "recipeUrl"  : "https://www.tasteatlas.com/doughnut/recipe"   
    },
    {        
        "id"         : 32,
        "name"       : "guacamole",
        "ingredients": ['avocado', 'lemon', 'onion', 'pepper', 'tomato'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "starter",
        "country"    : "mexico",
        "recipeUrl"  : "https://www.tasteatlas.com/guacamole/recipe/guacamole-with-tomatoes"   
    },
    /*{        
        "id"         : 33,
        "name"       : "tonkatsu",
        "ingredients": ['pork', 'flour', 'bread', 'egg', 'oil'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "main",
        "country"    : "japan",
        "recipeUrl"  : "https://www.tasteatlas.com/tonkatsu/recipe"   
    },*/
    {        
        "id"         : 34,
        "name"       : "mochi",
        "ingredients": ['flour', 'water', 'sugar', 'bean', 'potato'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "japan",
        "recipeUrl"  : "https://www.tasteatlas.com/mochi/recipe"   
    },
    {        
        "id"         : 35,
        "name"       : "shrimp wonton",
        "ingredients": ['flour', 'egg', 'seafood', 'onion', 'soy'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "starter",
        "country"    : "china",
        "recipeUrl"  : "https://www.tasteatlas.com/wonton"   
    },
    /*{        
        "id"         : 36,
        "name"       : "spanish omelette",
        "ingredients": ['egg', 'potato', 'onion', 'salt', 'oil'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "main",
        "country"    : "spain",
        "recipeUrl"  : "https://spanishsabores.com/best-spanish-omelet-recipe/"   
    },*/
    {        
        "id"         : 37,
        "name"       : "kimchi",
        "ingredients": ['leafygreen', 'onion', 'fish', 'seafood', 'garlic'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "starter",
        "country"    : "south korea",
        "recipeUrl"  : "https://www.tasteatlas.com/kimchi/recipe"   
    },
    /*{        
        "id"         : 38,
        "name"       : "cupcake",
        "ingredients": ['flour', 'butter', 'egg', 'milk', 'sugar'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "usa",
        "recipeUrl"  : "https://www.tasteatlas.com/cupcake/recipe"   
    },*/
    {        
        "id"         : 39,
        "name"       : "catalan cream",
        "ingredients": ['milk', 'egg', 'lemon', 'cinnamon', 'sugar'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "spain",
        "recipeUrl"  : "https://www.jamieoliver.com/recipes/eggs-recipes/crema-catalana/"   
    },
    {        
        "id"         : 40,
        "name"       : "bruschetta",
        "ingredients": ['bread', 'tomato', 'garlic', 'oil', 'salt'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "starter",
        "country"    : "italy",
        "recipeUrl"  : "https://www.delish.com/uk/cooking/recipes/a30165416/best-bruschetta-tomato-recipe/"   
    },
    {        
        "id"         : 41,
        "name"       : "english breakfast",
        "ingredients": ['bean', 'pork', 'tomato', 'egg', 'mushroom'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "main",
        "country"    : "uk",
        "recipeUrl"  : "https://www.tasteatlas.com/english-breakfast/recipe"   
    },
    {        
        "id"         : 42,
        "name"       : "onion soup",
        "ingredients": ['onion', 'flour', 'butter', 'water', 'bread'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "main",
        "country"    : "france",
        "recipeUrl"  : "https://www.tasteatlas.com/soupe-a-loignon/recipe"   
    },
    /*{        
        "id"         : 43,
        "name"       : "custard tart",
        "ingredients": ['flour', 'butter', 'milk', 'egg', 'sugar'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "portugal",
        "recipeUrl"  : "https://www.tasteatlas.com/pastel-de-nata/recipe"   
    },
    {        
        "id"         : 43,
        "name"       : "spaghetti alla puttanesca",
        "ingredients": ['pasta', 'tomato', 'olive', 'fish', 'garlic'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "main",
        "country"    : "italy",
        "recipeUrl"  : "https://www.tasteatlas.com/pastel-de-nata/recipe"   
    },*/
    {        
        "id"         : 44,
        "name"       : "french toast",
        "ingredients": ['bread', 'milk', 'egg', 'sugar', 'butter'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "france",
        "recipeUrl"  : "https://tastesbetterfromscratch.com/classic-french-toast/"   
    },
    {        
        "id"         : 45,
        "name"       : "gazpacho",
        "ingredients": ['bread', 'tomato', 'onion', 'pepper', 'oil'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "starter",
        "country"    : "spain",
        "recipeUrl"  : "https://www.tasteatlas.com/gazpacho/recipe"   
    },
    /*{        
        "id"         : 46,
        "name"       : "souffle au chocolat",
        "ingredients": ['chocolate', 'flour', 'egg', 'milk', 'sugar'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "france",
        "recipeUrl"  : "https://www.tasteatlas.com/chocolate-souffle/recipe"   
    },*/
    {        
        "id"         : 47,
        "name"       : "mousse au chocolat",
        "ingredients": ['chocolate', 'egg', 'butter', 'sugar', 'salt'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "france",
        "recipeUrl"  : "https://www.tasteatlas.com/mousse-au-chocolat/recipe"   
    },
    /*{        
        "id"         : 48,
        "name"       : "minestrone",
        "ingredients": ['pasta', 'onion', 'bean', 'potato', 'water'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "main",
        "country"    : "italy",
        "recipeUrl"  : "https://www.tasteatlas.com/minestrone/recipe"   
    },*/
    {
        "id"         : 49,
        "name"       : "ratatouille",
        "ingredients": ['leafygreen', 'pepper', 'tomato', 'onion', 'garlic'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "starter",
        "country"    : "france",
        "recipeUrl"  : "https://www.tasteatlas.com/ratatouille/recipe" 
    },
    {
        "id"         : 50,
        "name"       : "cannoli",
        "ingredients": ['flour', 'cheese', 'chocolate', 'sugar', 'egg'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "dessert",
        "country"    : "italy",
        "recipeUrl"  : "https://www.tasteatlas.com/cannoli/recipe" 
    },
    {
        "id"         : 51,
        "name"       : "gyoza",
        "ingredients": ['flour', 'egg', 'pork', 'leafygreen', 'garlic'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "starter",
        "country"    : "japan",
        "recipeUrl"  : "https://www.tasteatlas.com/gyoza" 
    },
    {
        "id"         : 52,
        "name"       : "onion ring",
        "ingredients": ['onion', 'flour', 'egg', 'milk', 'oil'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "starter",
        "country"    : "usa",
        "recipeUrl"  : "https://www.tasteatlas.com/onion-rings/recipe" 
    }
] as Array<RecipleInterface>