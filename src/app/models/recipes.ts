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
    'flour' : '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/flour.svg" alt="Flour"/>',
    'celery': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/celery.svg" alt="Celery"/>',
    'cinnamon': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/cinnamon.svg" alt="Cinnamon"/>',
    'yeast': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/yeast.png" alt="Yeast"/>',
    'salt': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/salt.svg" alt="Salt"/>',
    'sugar': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/sugar.svg" alt="Sugar"/>',
    'oil': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/oil.png" alt="Oil"/>',
    'jelly': '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/jelly.svg" alt="Jelly"/>'

} 

export const recipes = [
    {
        "id"         : 1,
        "name"       : "Paella",
        "ingredients": ['rice', 'chicken', 'rabbit', 'bean', 'tomato'],
        "cookTime"   : 2,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 2,
        "name"       : "Risotto",
        "ingredients": ['rice', 'cheese', 'butter', 'mushroom', 'onion'],
        "cookTime"   : 1,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""

    },
    {
        "id"         : 3,
        "name"       : "Pasta bolognesa",
        "ingredients": ['pasta', 'tomato', 'beef', 'onion', 'cheese'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 4,
        "name"       : "Seafood paella",
        "ingredients": ['rice', 'tomato', 'seafood', 'pepper', 'onion'],
        "cookTime"   : 2,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 5,
        "name"       : "Meat caneloni",
        "ingredients": ['beef', 'pasta', 'milk', 'butter', 'cheese'],
        "cookTime"   : 1,
        "cookMethod" : "oven",
        "foodType"   : "main"
    },
    {
        "id"         : 6,
        "name"       : "Katso Curry",
        "ingredients": ['chicken', 'rice', 'curry', 'carrot', 'onion'],
        "cookTime"   : 1,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 7,
        "name"       : "Lasagne",
        "ingredients": ['beef', 'pasta', 'cheese', 'milk', 'tomato'],
        "cookTime"   : 1,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 8,
        "name"       : "Pasta carbonara",
        "ingredients": ['egg', 'pasta', 'onion', 'cheese', 'bacon'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 9,
        "name"       : "Salad",
        "ingredients": ['tomato', 'leafygreen', 'onion', 'olives', 'pepper'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 10,
        "name"       : "Cheeseburguer",
        "ingredients": ['bread', 'beef', 'onion', 'tomato', 'cheese'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 11,
        "name"       : "Lobster bisque",
        "ingredients": ['seafood', 'onion', 'carrot', 'leafygreen', 'butter'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 12,
        "name"       : "Tortas",
        "ingredients": ['beef', 'bread', 'bean', 'avocado', 'cheese'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 13,
        "name"       : "Gyros",
        "ingredients": ['wrap' ,'beef', 'bean', 'avocado', 'cheese'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 14,
        "name"       : "Yakisoba",
        "ingredients": ['pasta', 'pork', 'leafygreen', 'onion', 'carrot'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 15,
        "name"       : "Fondue",
        "ingredients": ['cheese', 'wine', 'garlic', 'bread', 'alcohol'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 16,
        "name"       : "Bibimbap",
        "ingredients": ['rice', 'beef', 'leafygreen', 'carrot', 'egg'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 17,
        "name"       : "Fajita",
        "ingredients": ['wrap', 'beef', 'onion', 'avocado', 'garlic'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 18,
        "name"       : "Pho",
        "ingredients": ['pasta', 'beef', 'onion', 'garlic', 'broth'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 19,
        "name"       : "Quiche",
        "ingredients": ['egg', 'milk', 'cheese', 'bacon', 'butter'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 20,
        "name"       : "Ramen",
        "ingredients": ['pasta', 'pork', 'broth', 'egg', 'mushrooms'],
        "cookTime"   : 0.5,
        "cookMethod" : "hob",
        "foodType"   : "main"
    },
    {
        "id"         : 21,
        "name"       : "Chicken croquetas",
        "ingredients": ['chicken', 'milk', 'butter', 'egg', 'bread'],
        "cookTime"   : 2,
        "cookMethod" : "fried",
        "foodType"   : "side"
    },
    {
        "id"         : 22,
        "name"       : "pretzel",
        "ingredients": ['celery', 'cinnamon', 'salt', 'sugar', 'yeast'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },/*
        {
        "id"         : 0,
        "name"       : "Spinach caneloni",
        "ingredients": ['pasta', 'spinach', 'milk', 'cheese', 'pinenuts'],
        "cookTime"   : 2,
        "cookMethod" : "fire",
        "foodType"   : "main"
    },
    {
        "id"         : 11,
        "name"       : "Sushi",
        "ingredients": ['rice', 'fish', 'algae', 'rice vinegar', 'soy sauce'],
        "cookTime"   : 1.5,
        "cookMethod" : "raw",
        "foodType"   : "main"
    },
    {
        "id"         : 12,
        "name"       : "Fish and Chips",
        "ingredients": ['fish', 'potatoes', 'beer', 'flour'],
        "cookTime"   : 1,
        "cookMethod" : "hob",
        "foodType"   : "main"
    },

    {
        "id"         : 15,
        "name"       : "Spinach and Ricotta Caneloni",
        "ingredients": ['spinach', 'cheese', 'bechamel sauce', 'pasta'],
        "cookTime"   : 0.5,
        "cookMethod" : "hob",
        "foodType"   : "main"
    },
    {
        "id"         : 17,
        "name"       : "Patatas bravas",
        "ingredients": ['potatoes', 'tomato sauce'],
        "cookTime"   : 0.5,
        "cookMethod" : "hob",
        "foodType"   : "main"
    },
    {
        "id"         : 19,
        "name"       : "Escudella",
        "ingredients": ['minced meat', 'broth', 'pasta'],
        "cookTime"   : 0.5,
        "cookMethod" : "hob",
        "foodType"   : "main"
    },
    {
        "id"         : 20,
        "name"       : "Chicken Fajitas",
        "ingredients": ['Chicken', 'tortilla wrap', 'onion', 'pepper', 'tomato sauce'],
        "cookTime"   : 0.5,
        "cookMethod" : "hob",
        "foodType"   : "main"
    }*/
] as Array<RecipleInterface>