"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
// CardHeader, CardTitle
import { Card, CardContent, } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Clock, Users } from 'lucide-react'
import { toast } from '../hooks/use-toast'
import RecipeSkeleton from '../components/SharedRecipePage/RecipeSkeleton'

interface Recipe {
  id: number
  title: string
  category: string
  cooktime: string
  servings: number
  image: string
  ingredients: string
  instructions: string
}

export default function SharedRecipePage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        setRecipe(data)
      } catch (error) {
        console.error('Error fetching recipe:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch the recipe. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  if (isLoading) {
    return <RecipeSkeleton />
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <p>Sorry, we couldn't find the recipe you're looking for.</p>
      </div>
    )
  }
//className="container mx-auto px-4 py-8 mt-20"
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-20">
      <Card className="overflow-hidden">
        <div className="relative h-64 md:h-96">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{recipe.title}</h1>
            <Badge variant="secondary" className="text-sm">
              {recipe.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
              <span>{recipe.cooktime}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-muted-foreground" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <ul className="list-disc pl-5 space-y-2">
                {recipe.ingredients.split('\n').map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <ol className="list-decimal pl-5 space-y-4">
                {recipe.instructions.split('\n').map((step, index) => (
                  <li key={index} className="pl-2">{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

