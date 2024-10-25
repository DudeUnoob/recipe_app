// src/lib/mockData.ts
import { Recipe } from './types';

export const mockRecipes: Recipe[] = [
  { id: 1, title: "Spaghetti Carbonara", category: "Dinner", cooktime: "30 mins", servings: 4, image: "/placeholder.svg?height=200&width=300" },
  { id: 2, title: "Avocado Toast", category: "Breakfast", cooktime: "10 mins", servings: 2, image: "/placeholder.svg?height=200&width=300" },
  { id: 3, title: "Chicken Stir Fry", category: "Dinner", cooktime: "25 mins", servings: 3, image: "/placeholder.svg?height=200&width=300" },
  { id: 4, title: "Greek Salad", category: "Lunch", cooktime: "15 mins", servings: 2, image: "/placeholder.svg?height=200&width=300" },
  { id: 5, title: "Banana Smoothie", category: "Breakfast", cooktime: "5 mins", servings: 1, image: "/placeholder.svg?height=200&width=300" },
  { id: 6, title: "Beef Tacos", category: "Dinner", cooktime: "35 mins", servings: 4, image: "/placeholder.svg?height=200&width=300" },
];