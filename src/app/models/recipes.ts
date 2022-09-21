
export interface RecipeInterface {
    id         : number,
    name       : string,
    ingredients: string[],
    cookTime   : number,
    cookMethod : string,
    foodType   : string
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
    'shrimp': '🦐',
    'mussels': '🦐',
    'carrot': '🥕',
    'curry': '🍛',
    'bechamel':'☃️',
    'bacon': '🥓',
    'lettuce': '🥬',
    'olives': '🫒',
    'egg': '🥚',
    'bread': '🥖'
}

export const recipes = [
    {
        "id"         : 1,
        "name"       : "Paella",
        "ingredients": ['rice', 'chicken', 'tomato'],
        "cookTime"   : 2,
        "cookMethod" : "fire",
        "foodType"   : "main"
    },
    {
        "id"         : 2,
        "name"       : "Risotto",
        "ingredients": ['rice', 'cheese', 'wine', 'mushrooms'],
        "cookTime"   : 1,
        "cookMethod" : "hob",
        "foodType"   : "main"
    },
    {
        "id"         : 3,
        "name"       : "Pasta bolognesa",
        "ingredients": ['pasta', 'tomato', 'meat', 'onion'],
        "cookTime"   : 0.5,
        "cookMethod" : "hob",
        "foodType"   : "main"
    },
    {
        "id"         : 4,
        "name"       : "Seafood paella",
        "ingredients": ['rice', 'tomato', 'mussels', 'shrimp'],
        "cookTime"   : 2,
        "cookMethod" : "hob",
        "foodType"   : "main"
    },
    {
        "id"         : 5,
        "name"       : "Chicken thighs",
        "ingredients": ['chicken', 'tomato', 'wine', 'carrot'],
        "cookTime"   : 1.5,
        "cookMethod" : "oven",
        "foodType"   : "main"
    },
    {
        "id"         : 6,
        "name"       : "Katso Curry",
        "ingredients": ['chicken', 'rice', 'curry', 'carrot'],
        "cookTime"   : 1,
        "cookMethod" : "oven",
        "foodType"   : "main"
    },
    {
        "id"         : 7,
        "name"       : "Lasagne",
        "ingredients": ['meat', 'pasta', 'cheese', 'bechamel sauce', 'tomato'],
        "cookTime"   : 1,
        "cookMethod" : "oven",
        "foodType"   : "main"
    },
    {
        "id"         : 8,
        "name"       : "Pasta carbonara",
        "ingredients": ['egg', 'pasta', 'onion', 'cheese', 'bacon'],
        "cookTime"   : 0.5,
        "cookMethod" : "hob",
        "foodType"   : "main"
    },
    {
        "id"         : 9,
        "name"       : "Salad",
        "ingredients": ['tomato', 'lettuce', 'onion', 'olives'],
        "cookTime"   : 0.5,
        "cookMethod" : "hob",
        "foodType"   : "main"
    },
    {
        "id"         : 10,
        "name"       : "Burguer",
        "ingredients": ['meat', 'bread', 'onion', 'tomato', 'cheese'],
        "cookTime"   : 0.5,
        "cookMethod" : "hob",
        "foodType"   : "main"
    },/*
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
]