import { processEntryRequest } from './utilities/task3';
import { processEntryAdd } from './utilities/task2';
import { toUpperFirstFormat } from './utilities/task1';
import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
export interface cookbookEntry {
  name: string;
  type: string;
}

export interface requiredItem {
  name: string;
  quantity: number;
}

export interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

export interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: any = {
  recipe: [],
  ingredient: []
};

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

export const getCookBook = () => {
  return cookbook;
}
// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 

const parse_handwriting = (recipeName: string): string | null => {

  let recipeVar: string = recipeName.replace("-", " ").replace("_", " ");

  // handles whitespaces
  recipeVar = recipeVar.trim().replace(/  +/g, ' ');
  if (recipeVar.length == 0) return null;

  // handles special characters and formatting
  return toUpperFirstFormat(recipeVar.replace(/[^a-zA-Z ]/g, "").toLowerCase());
}


// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  const entry = req.body;
  let result;
  try {
    console.log(entry);
    result = processEntryAdd(entry);
  } catch (err) {
    res.status(400).json(err.Message);
  }
  return res.json(result);
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  const { name } = req.query;
  let result;
  console.log(name);
  try {
    result = processEntryRequest(name);
  } catch (err) {
    res.status(400).json(err.Message);
  }
  return res.json(result);
});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
