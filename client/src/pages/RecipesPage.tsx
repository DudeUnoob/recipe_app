import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Search, Plus } from "lucide-react"
import RecipeCard from "../components/RecipesPage/RecipeCard"
import AddRecipeDialog from "../components/RecipesPage/AddRecipeDialog"
import EditRecipeDialog from "../components/RecipesPage/EditRecipeDialog"
import ViewRecipeDialog from "../components/RecipesPage/ViewRecipeDialog"
import imageApi from "../functions/imageApi"
import { supabase } from "../lib/supabase"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "../hooks/use-toast"

interface Recipe {
  id: number;
  title: string;
  category: string;
  cooktime: string;
  servings: number;
  image: string;
  ingredients: string;
  instructions: string;
  isFavorite: boolean;
  dateadded: Date;
  user_id: string;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({ title: "", category: "", cooktime: "", servings: 0, ingredients: "", instructions: "" })
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [isAddRecipeDialogOpen, setIsAddRecipeDialogOpen] = useState(false)
  const [isEditRecipeDialogOpen, setIsEditRecipeDialogOpen] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    fetchRecipes()
  }, [user])

  const fetchRecipes = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", user.id)
        .order('dateadded', { ascending: false })

      if (error) {
        console.error("Error fetching recipes:", error)
        toast({
          title: "Error",
          description: "Failed to fetch recipes. Please try again.",
          variant: "destructive",
        })
      } else {
        setRecipes(data || [])
      }
    }
  }

  const handleAddRecipe = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add a recipe.",
        variant: "destructive",
      })
      return
    }

    if (!newRecipe.title || !newRecipe.category || !newRecipe.cooktime || !newRecipe.servings || !newRecipe.ingredients || !newRecipe.instructions) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
      })
      return
    }

    try {
      const imageResult: any = await imageApi(newRecipe.title)
      const imageUrl = imageResult.results[0].urls.regular

      const { data, error } = await supabase
        .from("recipes")
        .insert([
          {
            ...newRecipe,
            image: imageUrl,
            isFavorite: false,
            dateadded: new Date().toISOString(),
            user_id: user.id
          }
        ])
        .select()

      if (error) throw error

      setRecipes([data[0], ...recipes])
      setNewRecipe({ title: "", category: "", cooktime: "", servings: 0, ingredients: "", instructions: "" })
      setIsAddRecipeDialogOpen(false)
      toast({
        title: "Success",
        description: "Recipe added successfully!",
      })
    } catch (error) {
      console.error("Error adding recipe:", error)
      toast({
        title: "Error",
        description: "Failed to add recipe. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditRecipe = async (updatedRecipe: Recipe) => {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .update(updatedRecipe)
        .eq("id", updatedRecipe.id)
        .select()

      if (error) throw error

      setRecipes(recipes.map(recipe => recipe.id === updatedRecipe.id ? data[0] : recipe))
      setIsEditRecipeDialogOpen(false)
      setEditingRecipe(null)
      toast({
        title: "Success",
        description: "Recipe updated successfully!",
      })
    } catch (error) {
      console.error("Error updating recipe:", error)
      toast({
        title: "Error",
        description: "Failed to update recipe. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleFavorite = async (id: number) => {
    try {
      const recipeToUpdate = recipes.find(recipe => recipe.id === id)
      if (!recipeToUpdate) return

      const { error } = await supabase
        .from("recipes")
        .update({ isFavorite: !recipeToUpdate.isFavorite })
        .eq("id", id)
        .select()

      if (error) throw error

      setRecipes(recipes.map(recipe => 
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      ))

      toast({
        title: "Success",
        description: `Recipe ${recipeToUpdate.isFavorite ? "removed from" : "added to"} favorites.`,
      })
    } catch (error) {
      console.error("Error updating favorite status:", error)
      toast({
        title: "Error",
        description: "Failed to update favorite status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const deleteRecipe = async (id: number) => {
    try {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", id)

      if (error) throw error

      setRecipes(recipes.filter(recipe => recipe.id !== id))
      toast({
        title: "Success",
        description: "Recipe deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting recipe:", error)
      toast({
        title: "Error",
        description: "Failed to delete recipe. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || recipe.category === selectedCategory)
  )

  const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite)
  const recentlyAddedRecipes = recipes.slice(0, 5)

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
                <SelectItem value="Breakfast Ideas">Breakfast Ideas</SelectItem>
                <SelectItem value="Similar Recipes">Similar Recipes</SelectItem>
                <SelectItem value="Dessert Suggestions">Dessert Suggestions</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={() => setIsAddRecipeDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Recipe
            </Button>
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
                  onDelete={() => deleteRecipe(recipe.id)}
                  onEdit={() => {
                    setEditingRecipe(recipe)
                    setIsEditRecipeDialogOpen(true)
                  }}
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
                    onDelete={() => deleteRecipe(recipe.id)}
                    onEdit={() => {
                      setEditingRecipe(recipe)
                      setIsEditRecipeDialogOpen(true)
                    }}
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
                  onDelete={() => deleteRecipe(recipe.id)}
                  onEdit={() => {
                    setEditingRecipe(recipe)
                    setIsEditRecipeDialogOpen(true)
                  }}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <AddRecipeDialog
        isOpen={isAddRecipeDialogOpen}
        onClose={() => setIsAddRecipeDialogOpen(false)}
        newRecipe={newRecipe}
        setNewRecipe={setNewRecipe}
        handleAddRecipe={handleAddRecipe}
      />

      <EditRecipeDialog
        isOpen={isEditRecipeDialogOpen}
        onClose={() => {
          setIsEditRecipeDialogOpen(false)
          setEditingRecipe(null)
        }}
        recipe={editingRecipe}
        handleEditRecipe={handleEditRecipe}
      />

      {selectedRecipe && (
        <ViewRecipeDialog recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  )
}