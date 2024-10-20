import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { AddRecipeDialog } from "./AddRecipeDialog"

interface FilterBarProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  onAddRecipe: (newRecipe: any) => void
}

export function FilterBar({ selectedCategory, setSelectedCategory, onAddRecipe }: FilterBarProps) {
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
      
      <AddRecipeDialog onAddRecipe={onAddRecipe} />
    </div>
  )
}