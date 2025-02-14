import { ingredient, recipe } from './../devdonalds';
import { getCookBook } from './../devdonalds';

export const processEntryAdd = (entry: recipe | ingredient) => {
  const data = getCookBook();

  // error checking
  if (entry.type != 'ingredient' && entry.type != 'recipe') 
    throw Error('Invalid type');
  if (searchEntryName(entry.name, data)) {
    throw Error('Entry with the same name already exist');
  }

  // process respective to type
  if (entry.type == 'recipe') {
    processRecipe(entry as recipe, data);
  } else {
    processIngredient(entry as ingredient, data);
  }
  return {};
}

const processRecipe = (entry: recipe, cookBook: any) => {
  if (searchRequiredItemName(entry.name, entry).length > 1) 
    throw Error('Recipe contains similar named required item');
  cookBook.recipe.push(entry);
}

const processIngredient = (entry: ingredient, cookBook: any) => {
  if (entry.cookTime < 0) throw Error("Invalid cooked time");
  cookBook.ingredient.push(entry);
}

const searchEntryName = (name: string, cookBook: any) => {
  return cookBook.recipe.some((recipe) => recipe.name === name) ||
         cookBook.ingredient.some((ingredient) => ingredient.name === name);
}

const searchRequiredItemName = (name: string, entry: recipe) => {
  return entry.requiredItems.filter((requiredItem) => requiredItem.name === name);
}