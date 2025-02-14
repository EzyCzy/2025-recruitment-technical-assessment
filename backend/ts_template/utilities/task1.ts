// takes and string and returns it formatted uppercase first char for each word
export const toUpperFirstFormat = (recipe: string): string => {
  let formatted = recipe;
  for (let index = 0; index < formatted.length; index++) {
    if (index == 0 || (index - 1 >= 0 && recipe[index - 1] === " ")) {
      formatted = replaceChar(formatted, index, 
        (formatted[index] >= 'a' && formatted[index] <= 'z') ? formatted[index].toUpperCase() : formatted[index]);
    }
  }
  return formatted;
}

// replaces substring with another string at beginning at an index
const replaceChar = (recipe: string, index: number, replacement: string): string => {
  return recipe.substring(0, index) + replacement + recipe.substring(index + replacement.length);
}