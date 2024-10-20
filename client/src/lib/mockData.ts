// src/lib/mockData.ts
import { Recipe } from './types';

export const mockRecipes: Recipe[] = [
  { id: 1, title: "Spaghetti Carbonara", category: "Dinner", cookTime: "30 mins", servings: 4, image: "/placeholder.svg?height=200&width=300" },
  { id: 2, title: "Avocado Toast", category: "Breakfast", cookTime: "10 mins", servings: 2, image: "/placeholder.svg?height=200&width=300" },
  { id: 3, title: "Chicken Stir Fry", category: "Dinner", cookTime: "25 mins", servings: 3, image: "/placeholder.svg?height=200&width=300" },
  { id: 4, title: "Greek Salad", category: "Lunch", cookTime: "15 mins", servings: 2, image: "/placeholder.svg?height=200&width=300" },
  { id: 5, title: "Banana Smoothie", category: "Breakfast", cookTime: "5 mins", servings: 1, image: "/placeholder.svg?height=200&width=300" },
  { id: 6, title: "Beef Tacos", category: "Dinner", cookTime: "35 mins", servings: 4, image: "/placeholder.svg?height=200&width=300" },
];