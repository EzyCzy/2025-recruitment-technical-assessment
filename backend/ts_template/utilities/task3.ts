import { getCookBook, recipe } from "../devdonalds"

// process GET request
export const processEntryRequest = (name: string) => {
  const cookBook = getCookBook();

  // validify recipe
  const recipeLookup = getRecipe(name, cookBook);
  if (!recipeLookup)
    throw Error("Not a valid recipe name");

  // get the uncompressed ingredients from all recipe recursively
  let baseIngredients = [];
  getBaseIngredients(recipeLookup, cookBook, baseIngredients, 1);

  let cookTime = 0;
  const ingredientMap = new Map();

  // compress all the ingredients into its unique variable
  for (const ingredient of baseIngredients) {
    if (!ingredientMap.has(ingredient.name)) {
      ingredientMap.set(ingredient.name, ingredient.quantity);
    } else {
      ingredientMap.set(ingredient.name, ingredientMap.get(ingredient.name) + ingredient.quantity);
    }
  }

  const ingredients = [];
  // insert all unique named ingredients
  // calculate cookTime
  for (const [key, value] of ingredientMap) {
    ingredients.push({name: key, quantity: value});
    cookTime += getIngredient(key, cookBook).cookTime * value; 
  }

  return { name, cookTime, ingredients };
}


// get the ingredient in the cookbook
const getIngredient = (name: string, cookBook: any) => {
  return cookBook.ingredient.find((ingredient => ingredient.name === name));
}

// get the recipe in the cookbook
const getRecipe = (name: string, cookBook: any) => {
  return cookBook.recipe.find((recipe => recipe.name === name));
}

// a method to recursively traverse a recipe and gets its ingredient
const getBaseIngredients = (recipeLookup: recipe, cookBook: any, baseIngredient: any[], amount: number) => {

  for (const childItem of recipeLookup.requiredItems) {

    // check if this item is a ingredient
    // if yes we push onto baseIngredient else we check for recipe
    let placeHolder = getIngredient(childItem.name, cookBook);
    if (!placeHolder) {
      placeHolder = getRecipe(childItem.name, cookBook);
    } else {
      baseIngredient.push({
        name: childItem.name,
        quantity: childItem.quantity * amount,
      });
      continue;
    }

    // if this is not a recipe, means its an invalid,
    // else we recursively call
    if (!placeHolder) {
      throw Error("Invalid name");
    } else {
      getBaseIngredients(placeHolder, cookBook, baseIngredient, childItem.quantity * amount);
    }
  }

}
