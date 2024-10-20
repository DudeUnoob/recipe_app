import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import AddRecipeDialog from "./AddRecipeDialog"

interface Recipe {
  title: string;
  category: string;
  cookTime: string;
  servings: number;
  ingredients: string;
  instructions: string;
}

interface FilterBarProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  onAddRecipe: (newRecipe: Recipe) => void
}

export function FilterBar({ selectedCategory, setSelectedCategory, onAddRecipe }: FilterBarProps) {
  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({});

  const handleAddRecipe = () => {
    if (newRecipe.title && newRecipe.category && newRecipe.cookTime && newRecipe.servings && newRecipe.ingredients && newRecipe.instructions) {
      onAddRecipe(newRecipe as Recipe);
      setNewRecipe({});
    }
  };

  return (
    <div className="flex space-x-4 w-full md:w-auto">
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Categories</SelectItem>
          <SelectItem value="Breakfast">Breakfast</SelectItem>
          <SelectItem value="Lunch">Lunch</SelectItem>
          <SelectItem value="Dinner">Dinner</SelectItem>
          <SelectItem value="Dessert">Dessert</SelectItem>
        </SelectContent>
      </Select>
      
      <AddRecipeDialog 
        newRecipe={newRecipe} 
        setNewRecipe={setNewRecipe} 
        handleAddRecipe={handleAddRecipe}
        onAddRecipe={onAddRecipe}
      />
    </div>
  )
}