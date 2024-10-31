import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"

interface Recipe {
  id: number
  title: string
  category: string
  cooktime: string
  servings: number
  ingredients: string
  instructions: string
  image: string
  isFavorite: boolean
}

interface ViewRecipeDialogProps {
  recipe: Recipe | null
  onClose: () => void
}

export default function ViewRecipeDialog({ recipe, onClose }: ViewRecipeDialogProps) {
  if (!recipe) return null

  const ingredientsList = recipe.ingredients.split('\n').map(ingredient => ingredient.trim())

  return (
    <Dialog open={!!recipe} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
          <DialogDescription>
            {recipe.category} | {recipe.cooktime} | Serves {recipe.servings}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-md" />
        </div>
        <ScrollArea className="mt-4 h-[300px] pr-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
              <ol>
                {ingredientsList.map((ingredient, index) => (
                  <li key={index} className="text-sm mb-1">{ingredient}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
              <p className="text-sm whitespace-pre-wrap">{recipe.instructions}</p>
            </div>
          </div>
        </ScrollArea>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}