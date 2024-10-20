import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { SearchBar } from "../components/RecipesPage/SearchBar"
import { FilterBar } from "../components/RecipesPage/FilterBar"
import { AddRecipeDialog } from "../components/RecipesPage/AddRecipeDialog"
import { RecipeCard } from "../components/RecipesPage/RecipeCard"
import imageApi from "../functions/imageApi"

// Mock data for recipes



const mockRecipes = [
  { id: 1, title: "Spaghetti Carbonara", category: "Dinner", cookTime: "30 mins", servings: 4, image: "/placeholder.svg?height=200&width=300" },
  { id: 2, title: "Avocado Toast", category: "Breakfast", cookTime: "10 mins", servings: 2, image: "/placeholder.svg?height=200&width=300" },
  { id: 3, title: "Chicken Stir Fry", category: "Dinner", cookTime: "25 mins", servings: 3, image: "/placeholder.svg?height=200&width=300" },
  { id: 4, title: "Greek Salad", category: "Lunch", cookTime: "15 mins", servings: 2, image: "/placeholder.svg?height=200&width=300" },
  { id: 5, title: "Banana Smoothie", category: "Breakfast", cookTime: "5 mins", servings: 1, image: "/placeholder.svg?height=200&width=300" },
  { id: 6, title: "Beef Tacos", category: "Dinner", cookTime: "35 mins", servings: 4, image: "/placeholder.svg?height=200&width=300" },
]

mockRecipes.forEach(async(item) => {
  const newImage = await imageApi(item.title);
  item.image = newImage.results[0].urls.raw
})

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredRecipes = mockRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || recipe.category === selectedCategory)
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Recipes</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Recipes</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <p>Your favorite recipes will appear here.</p>
          </TabsContent>
          
          <TabsContent value="recent">
            <p>Your recently added recipes will appear here.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}