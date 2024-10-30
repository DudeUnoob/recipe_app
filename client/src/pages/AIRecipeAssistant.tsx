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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import { toast } from '../hooks/use-toast'
import { Loader2, Plus } from 'lucide-react'
import { supabase } from '../lib/supabase'

// Assume we have these AI service functions
import { 
  generateRecipe, 
  enhanceRecipe, 
  getPersonalizedRecommendations, 
  getNutritionalAnalysis 
} from '../services/aiService'
import imageApi from '../functions/imageApi'

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
  category: string
}

interface Recommendation {
  title: string
  category: string
  ingredients: string[]
  instructions: string
}

export default function AIRecipeAssistant() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null)
  const [ingredients, setIngredients] = useState('')
  const [recipeToEnhance, setRecipeToEnhance] = useState('')
  const [generatedRecipe, setGeneratedRecipe] = useState('')
  const [enhancedRecipe, setEnhancedRecipe] = useState('')
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [nutritionalInfo, setNutritionalInfo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([])
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      fetchUserPreferences()
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
      generatePersonalizedRecommendations(data)
    } catch (error) {
      console.error('Error fetching user recipes:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch your recipes. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const generatePersonalizedRecommendations = async (recipes: Recipe[]) => {
    setIsLoading(true)
    try {
      const recommendationsString = await getPersonalizedRecommendations(recipes, userPreferences)
      const parsedRecommendations = parseRecommendations(recommendationsString)
      setRecommendations(parsedRecommendations)
    } catch (error) {
      console.error('Error generating personalized recommendations:', error)
      toast({
        title: 'Error',
        description: 'Failed to generate recommendations. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const parseRecommendations = (recommendationsString: string): Recommendation[] => {
    const sections = recommendationsString.split(/\*\*(Breakfast Ideas|Similar Recipes|Dessert Suggestions):\*\*/g)
    const parsedRecommendations: Recommendation[] = []

    for (let i = 1; i < sections.length; i += 2) {
      const category = sections[i].trim()
      const recipes = sections[i + 1].trim().split(/\d+\.\s+\*\*/).slice(1)

      recipes.forEach(recipe => {
        const [title, ...rest] = recipe.split('**:')
        const content = rest.join('**:').trim()
        const ingredientsMatch = content.match(/Ingredients:([\s\S]*?)Instructions:/)
        const instructionsMatch = content.match(/Instructions:([\s\S]*)/)

        const ingredients = ingredientsMatch 
          ? ingredientsMatch[1].trim().split('\n').map(item => item.trim().replace(/^\*\s*/, ''))
          : []
        const instructions = instructionsMatch ? instructionsMatch[1].trim() : ''

        parsedRecommendations.push({ 
          title: title.trim(), 
          category,
          ingredients,
          instructions
        })
      })
    }

    return parsedRecommendations
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
          recipeToEnhanceContent = `Title: ${selectedRecipe.title}\nIngredients: ${selectedRecipe.ingredients}\nInstructions: ${selectedRecipe.instructions}`
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

  const handleSaveRecommendation = async (recommendation: Recommendation) => {
    try {
      const imageResult: any = await imageApi(recommendation.title)
      const imageUrl = imageResult.results[0].urls.regular

      const { data, error } = await supabase
        .from('recipes')
        .insert({
          user_id: user?.id,
          title: recommendation.title,
          category: recommendation.category,
          ingredients: recommendation.ingredients.join('\n'),
          instructions: recommendation.instructions,
          image: imageUrl
        })
        .select()

      if (error) throw error

      setUserRecipes([...userRecipes, data[0]])
      toast({
        title: 'Success',
        description: 'Recipe saved successfully!',
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
            <p className="text-gray-600 mb-4">Discover recipes similar to your saved recipes</p>
            <Accordion type="single" collapsible className="w-full">
              {['Breakfast Ideas', 'Similar Recipes', 'Dessert Suggestions'].map((category) => (
                <AccordionItem value={category} key={category}>
                  <AccordionTrigger>{category}</AccordionTrigger>
                  <AccordionContent>
                    {recommendations
                      .filter(recipe => recipe.category === category)
                      .map((recipe, index) => (
                        <div key={index} className="mb-4 p-4 bg-gray-100 rounded-md">
                          <h3 className="text-lg font-semibold">{recipe.title}</h3>
                          <Accordion type="single" collapsible className="w-full mt-2">
                            <AccordionItem value="ingredients">
                              <AccordionTrigger>Ingredients</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5">
                                  {recipe.ingredients.map((ingredient, i) => (
                                    <li key={i} className="text-sm">{ingredient}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="instructions">
                              <AccordionTrigger>Instructions</AccordionTrigger>
                              <AccordionContent>
                                <p className="text-sm whitespace-pre-wrap">{recipe.instructions}</p>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                          <Button  
                            onClick={() => handleSaveRecommendation(recipe)} 
                            className="mt-2" 
                            size="sm"
                          >
                            <Plus className="mr-2 h-4 w-4" /> Save Recipe
                          </Button>
                        </div>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button onClick={() => generatePersonalizedRecommendations(userRecipes)} className="mt-6" disabled={isLoading}>
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