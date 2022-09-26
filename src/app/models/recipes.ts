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
    'mushrooms': '🍄',
    'cheese': '🧀',
    'wine' : '🍷',
    'pasta': '🍝',
    'onion' : '🧅',
    'meat' : '🥩',
    'seafood': '🦐',
    'carrot': '🥕',
    'curry': '🍛',
    'bechamel':'☃️',
    'bacon': '🥓',
    'lettuce': '🥬',
    'olives': '🫒',
    'egg': '🥚',
    'bread': '🥖',
    'rabbit': '🐇',
    'bean': '🫘',
    'fish' : '🐟',
    'pepper' : '🌶️',
    'milk' : '🥛'
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
        "ingredients": ['rice', 'cheese', 'mushrooms', 'wine', 'onion'],
        "cookTime"   : 1,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""

    },
    {
        "id"         : 3,
        "name"       : "Pasta bolognesa",
        "ingredients": ['pasta', 'tomato', 'meat', 'onion', 'cheese'],
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
        "name"       : "Chicken thighs",
        "ingredients": ['chicken', 'tomato', 'wine', 'carrot', 'onion'],
        "cookTime"   : 1.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
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
        "ingredients": ['meat', 'pasta', 'cheese', 'milk', 'tomato'],
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
        "ingredients": ['tomato', 'lettuce', 'onion', 'olives', 'pepper'],
        "cookTime"   : 0.5,
        "serves"     : 4,
        "foodType"   : "main",
        "recipeUrl"  : ""
    },
    {
        "id"         : 10,
        "name"       : "Burguer",
        "ingredients": ['meat', 'bread', 'onion', 'tomato', 'cheese'],
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
        "id"         : 13,
        "name"       : "Yakisoba",
        "ingredients": ['pasta', 'chicken', 'onion', 'pepper', 'soy sauce'],
        "cookTime"   : 0.5,
        "cookMethod" : "hob",
        "foodType"   : "main"
    },
    {
        "id"         : 14,
        "name"       : "Caneloni",
        "ingredients": ['minced meat', 'pasta', 'bechamel sauce', 'cheese'],
        "cookTime"   : 1,
        "cookMethod" : "oven",
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
        "id"         : 16,
        "name"       : "Chicken croquetas",
        "ingredients": ['chicken', 'bechamel sauce', 'bread', 'egg'],
        "cookTime"   : 2,
        "cookMethod" : "fried",
        "foodType"   : "side"
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
        "id"         : 18,
        "name"       : "Ramen",
        "ingredients": ['pasta', 'pork', 'broth', 'egg', 'onion', 'mushrooms'],
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