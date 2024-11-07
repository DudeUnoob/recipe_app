"use client"

import { useState,  } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Checkbox } from '../components/ui/checkbox'
import { Slider } from '../components/ui/slider'
import { toast } from '../hooks/use-toast'
import { Clock, Users, Plus } from 'lucide-react'
import { supabase } from '../lib/supabase'

// Assume we have a spoonacularApi service
import { searchRecipes, getRecipeInformation } from '../services/spoonacularApi'

interface Recipe {
  id: number
  title: string
  image: string
  readyInMinutes: number
  servings: number
  cuisines: string[]
  dishTypes: string[]
  diets: string[]
  instructions: string
  extendedIngredients: {
    original: string
  }[]
}

export default function RecipeFinder() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [diet, setDiet] = useState('')
  const [maxReadyTime, setMaxReadyTime] = useState(60)
  const [intolerances, setIntolerances] = useState<string[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const cuisines = ['African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese']
  const diets = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30']
  const intoleranceOptions = ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat']

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const results: any = await searchRecipes({
        query: searchTerm,
        cuisine,
        diet,
        maxReadyTime,
        intolerances: intolerances.join(','),
      })
      setRecipes(results)
    } catch (error) {
      console.error('Error searching recipes:', error)
      toast({
        title: 'Error',
        description: 'Failed to search recipes. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewRecipe = async (recipeId: number) => {
    try {
      const recipeInfo: any = await getRecipeInformation(recipeId)
      setSelectedRecipe(recipeInfo)
    } catch (error) {
      console.error('Error fetching recipe information:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch recipe information. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleSaveRecipe = async (recipe: Recipe) => {
    try {
      const {  error } = await supabase
        .from('recipes')
        .insert({
          user_id: user?.id,
          title: recipe.title,
          image: recipe.image,
          category: recipe.cuisines[0] || recipe.dishTypes[0] || 'Uncategorized',
          cooktime: `${recipe.readyInMinutes} minutes`,
          servings: recipe.servings,
          ingredients: recipe.extendedIngredients.map(ing => ing.original).join('\n'),
          instructions: recipe.instructions,
          isFavorite: false,
        })
        .select()

      if (error) throw error

      toast({
        title: 'Success',
        description: 'Recipe saved to your collection!',
      })
    } catch (error) {
      console.error('Error saving recipe:', error)
      toast({
        title: 'Error',
        description: 'Failed to save recipe. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Recipes</h1>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Term</Label>
              <Input
                id="search"
                placeholder="Enter keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisine">Cuisine</Label>
              <Select value={cuisine} onValueChange={setCuisine}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cuisine" />
                </SelectTrigger>
                <SelectContent>
                  {cuisines.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="diet">Diet</Label>
              <Select value={diet} onValueChange={setDiet}>
                <SelectTrigger>
                  <SelectValue placeholder="Select diet" />
                </SelectTrigger>
                <SelectContent>
                  {diets.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxReadyTime">Max Ready Time (minutes)</Label>
              <Slider
                id="maxReadyTime"
                min={10}
                max={120}
                step={5}
                value={[maxReadyTime]}
                onValueChange={(value) => setMaxReadyTime(value[0])}
              />
              <div className="text-sm text-gray-500">{maxReadyTime} minutes</div>
            </div>
          </div>
          <div className="mt-4">
            <Label>Intolerances</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
              {intoleranceOptions.map((intolerance) => (
                <div key={intolerance} className="flex items-center space-x-2">
                  <Checkbox
                    id={`intolerance-${intolerance}`}
                    checked={intolerances.includes(intolerance)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIntolerances([...intolerances, intolerance])
                      } else {
                        setIntolerances(intolerances.filter(i => i !== intolerance))
                      }
                    }}
                  />
                  <label
                    htmlFor={`intolerance-${intolerance}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {intolerance}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search Recipes'}
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden">
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{recipe.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{recipe.readyInMinutes} min</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm">{recipe.servings} servings</span>
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                {recipe.cuisines.length > 0 && `Cuisine: ${recipe.cuisines.join(', ')}`}
                {recipe.dishTypes.length > 0 && ` • Dish: ${recipe.dishTypes.join(', ')}`}
              </div>
              {recipe.diets.length > 0 && (
                <div className="text-sm text-gray-500">
                  Diets: {recipe.diets.join(', ')}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => handleViewRecipe(recipe.id)}>View Recipe</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  {selectedRecipe && (
                    <>
                      <DialogHeader>
                        <DialogTitle>{selectedRecipe.title}</DialogTitle>
                        <DialogDescription>
                          {selectedRecipe.readyInMinutes} minutes • {selectedRecipe.servings} servings
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <img src={selectedRecipe.image} alt={selectedRecipe.title} className="col-span-4 w-full h-64 object-cover rounded-lg" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Ingredients:</h3>
                          <ul className="list-disc pl-5">
                            {selectedRecipe.extendedIngredients.map((ingredient, index) => (
                              <li key={index}>{ingredient.original}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Instructions:</h3>
                          <p className="whitespace-pre-wrap">{selectedRecipe.instructions}</p>
                        </div>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
              <Button onClick={() => handleSaveRecipe(recipe)}>
                <Plus className="w-4 h-4 mr-2" /> Save Recipe
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}