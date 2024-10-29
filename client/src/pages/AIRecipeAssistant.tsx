"use client"

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
//import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Card } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { toast } from "../hooks/use-toast"
import { Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

// Assume we have these AI service functions
import { 
  generateRecipe, 
  enhanceRecipe, 
  getPersonalizedRecommendations, 
  getNutritionalAnalysis 
} from '../services/aiService'

interface UserPreferences {
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
  dairyFree: boolean
  nutFree: boolean
  otherRestrictions: string
}

interface Recipe {
  id: number
  title: string
  ingredients: string
  instructions: string
  description: string
}

export default function AIRecipeAssistant() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null)
  const [ingredients, setIngredients] = useState('')
  const [recipeToEnhance, setRecipeToEnhance] = useState('')
  const [generatedRecipe, setGeneratedRecipe] = useState('')
  const [enhancedRecipe, setEnhancedRecipe] = useState('')
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [nutritionalInfo, setNutritionalInfo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([])
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      fetchUserPreferences()
      fetchPersonalizedRecommendations()
      fetchUserRecipes()
    }
  }, [user, navigate])

  const fetchUserPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (error) throw error

      setUserPreferences(data)
    } catch (error) {
      console.error('Error fetching user preferences:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch user preferences. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const fetchUserRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user?.id)

      if (error) throw error

      setUserRecipes(data)
    } catch (error) {
      console.error('Error fetching user recipes:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch your recipes. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const fetchPersonalizedRecommendations = async () => {
    setIsLoading(true)
    try {
      const recommendations = await getPersonalizedRecommendations(user?.id, userPreferences)
      setRecommendations(recommendations)
    } catch (error) {
      console.error('Error fetching personalized recommendations:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch recommendations. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateRecipe = async () => {
    setIsLoading(true)
    try {
      const recipe = await generateRecipe(ingredients, userPreferences)
      setGeneratedRecipe(recipe)
    } catch (error) {
      console.error('Error generating recipe:', error)
      toast({
        title: 'Error',
        description: 'Failed to generate recipe. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEnhanceRecipe = async () => {
    setIsLoading(true)
    try {
      let recipeToEnhanceContent = recipeToEnhance
      if (selectedRecipeId) {
        const selectedRecipe = userRecipes.find(recipe => recipe.id === selectedRecipeId)
        if (selectedRecipe) {
          recipeToEnhanceContent = `Title: ${selectedRecipe.title}\nDescription: ${selectedRecipe.description}\nIngredients: ${selectedRecipe.ingredients}\nInstructions: ${selectedRecipe.instructions}`
        }
      }
      const enhanced = await enhanceRecipe(recipeToEnhanceContent, userPreferences)
      setEnhancedRecipe(enhanced)
    } catch (error) {
      console.error('Error enhancing recipe:', error)
      toast({
        title: 'Error',
        description: 'Failed to enhance recipe. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNutritionalAnalysis = async () => {
    setIsLoading(true)
    try {
      const analysis = await getNutritionalAnalysis(generatedRecipe || enhancedRecipe)
      setNutritionalInfo(analysis)
    } catch (error) {
      console.error('Error getting nutritional analysis:', error)
      toast({
        title: 'Error',
        description: 'Failed to get nutritional analysis. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Recipe Assistant</h1>
      
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate Recipe</TabsTrigger>
          <TabsTrigger value="enhance">Enhance Recipe</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Generate Recipe</h2>
            <p className="text-gray-600 mb-4">Enter ingredients to generate a new recipe</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingredients</Label>
                <Textarea
                  id="ingredients"
                  placeholder="Enter ingredients, separated by commas..."
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>
              <Button onClick={handleGenerateRecipe} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Recipe
              </Button>
            </div>
            {generatedRecipe && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Generated Recipe:</h3>
                <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
                  {generatedRecipe}
                </div>
                <Button onClick={handleNutritionalAnalysis} className="mt-4" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Get Nutritional Analysis
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="enhance">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Enhance Recipe</h2>
            <p className="text-gray-600 mb-4">Enhance one of your saved recipes or enter a new recipe to enhance</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipeSelect">Select a saved recipe (optional)</Label>
                <Select onValueChange={(value) => setSelectedRecipeId(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a recipe" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRecipes.map((recipe) => (
                      <SelectItem key={recipe.id} value={recipe.id.toString()}>
                        {recipe.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipeToEnhance">Recipe to Enhance (or enter a new recipe)</Label>
                <Textarea
                  id="recipeToEnhance"
                  placeholder="Enter your recipe here..."
                  value={recipeToEnhance}
                  onChange={(e) => setRecipeToEnhance(e.target.value)}
                />
              </div>
              <Button onClick={handleEnhanceRecipe} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enhance Recipe
              </Button>
            </div>
            {enhancedRecipe && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Enhanced Recipe:</h3>
                <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
                  {enhancedRecipe}
                </div>
                <Button onClick={handleNutritionalAnalysis} className="mt-4" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Get Nutritional Analysis
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Personalized Recommendations</h2>
            <p className="text-gray-600 mb-4">Discover recipes tailored to your preferences and history</p>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Breakfast Ideas</h3>
                <ul className="list-disc pl-5">
                  {recommendations.slice(0, 3).map((recipe, index) => (
                    <li key={index}>{recipe}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Similar Recipes</h3>
                <ul className="list-disc pl-5">
                  {recommendations.slice(3, 6).map((recipe, index) => (
                    <li key={index}>{recipe}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Seasonal Suggestions</h3>
                <ul className="list-disc pl-5">
                  {recommendations.slice(6, 9).map((recipe, index) => (
                    <li key={index}>{recipe}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Button onClick={fetchPersonalizedRecommendations} className="mt-6" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Refresh Recommendations
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
      
      {nutritionalInfo && (
        <Card className="mt-8 p-6">
          <h2 className="text-2xl font-semibold mb-2">Nutritional Analysis</h2>
          <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
            {nutritionalInfo}
          </div>
        </Card>
      )}
    </div>
  )
}