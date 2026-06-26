import { NutritionGoals } from "./nutrition";

export type NutritionTotals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type NutritionSummary = {
  totals: NutritionTotals;
  goals: NutritionGoals;
};