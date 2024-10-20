import React, { useState, useEffect } from "react"
//import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Search } from "lucide-react"
import RecipeCard from "../components/RecipesPage/RecipeCard"
import AddRecipeDialog from "../components/RecipesPage/AddRecipeDialog"
import ViewRecipeDialog from "../components/RecipesPage/ViewRecipeDialog"
import imageApi from "../functions/imageApi"

// Initial mock data for recipes
const initialRecipes = [
  { id: 1, title: "Spaghetti Carbonara", category: "Dinner", cookTime: "30 mins", servings: 4, image: "/placeholder.svg?height=200&width=300", ingredients: "400g spaghetti, 200g pancetta, 4 eggs, 100g Parmesan cheese, Black pepper", instructions: "1. Cook pasta. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all ingredients.", isFavorite: false, dateAdded: new Date("2023-05-01") },
  { id: 2, title: "Avocado Toast", category: "Breakfast", cookTime: "10 mins", servings: 2, image: "/placeholder.svg?height=200&width=300", ingredients: "2 slices bread, 1 ripe avocado, Salt, Pepper, Red pepper flakes", instructions: "1. Toast bread. 2. Mash avocado. 3. Spread on toast. 4. Season and serve.", isFavorite: false, dateAdded: new Date("2023-05-15") },
  { id: 3, title: "Chicken Stir Fry", category: "Dinner", cookTime: "25 mins", servings: 3, image: "/placeholder.svg?height=200&width=300", ingredients: "500g chicken breast, Mixed vegetables, Soy sauce, Ginger, Garlic", instructions: "1. Cut chicken. 2. Stir-fry vegetables. 3. Add chicken. 4. Season with sauce.", isFavorite: false, dateAdded: new Date("2023-06-01") },
]

initialRecipes.forEach(async(item) => {
  const newImage: any = await imageApi(item.title);
  item.image = newImage.results[0].urls.raw
})


interface Recipe {
  id: number;
  title: string;
  category: string;
  cookTime: string;
  servings: number;
  image: string;
  ingredients: string;
  instructions: string;
  isFavorite: boolean;
  dateAdded: Date;
}

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({ title: "", category: "", cookTime: "", servings: 0, ingredients: "", instructions: "" })
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || recipe.category === selectedCategory)
  )

  const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite)
  const recentlyAddedRecipes = [...recipes].sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()).slice(0, 5)

  const handleAddRecipe = () => {
    const recipeToAdd: Recipe = {
      ...newRecipe as Recipe,
      id: recipes.length + 1,
      image: "/placeholder.svg?height=200&width=300",
      isFavorite: false,
      dateAdded: new Date()
    }
    setRecipes([...recipes, recipeToAdd])
    setNewRecipe({ title: "", category: "", cookTime: "", servings: 0, ingredients: "", instructions: "" })
  }

  const toggleFavorite = (id: number) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
    ))
  }

  useEffect(() => {
    if (activeTab === "favorites" && favoriteRecipes.length === 0) {
      setActiveTab("all")
    }
  }, [favoriteRecipes, activeTab])

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Recipes</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex-1 w-full md:w-auto md:max-w-md relative">
            <Input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
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
            
            <AddRecipeDialog newRecipe={newRecipe} setNewRecipe={setNewRecipe} handleAddRecipe={handleAddRecipe} />
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Recipes</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onView={() => setSelectedRecipe(recipe)}
                  onToggleFavorite={() => toggleFavorite(recipe.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="favorites" className="space-y-8">
            {favoriteRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteRecipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onView={() => setSelectedRecipe(recipe)}
                    onToggleFavorite={() => toggleFavorite(recipe.id)}
                  />
                ))}
              </div>
            ) : (
              <p>You haven't favorited any recipes yet.</p>
            )}
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyAddedRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onView={() => setSelectedRecipe(recipe)}
                  onToggleFavorite={() => toggleFavorite(recipe.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {selectedRecipe && (
        <ViewRecipeDialog recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  )
}

export default RecipesPage