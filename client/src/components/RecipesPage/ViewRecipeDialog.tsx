import React from "react"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { ChefHat, Clock, Users } from "lucide-react"

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
}

interface ViewRecipeDialogProps {
  recipe: Recipe;
  onClose: () => void;
}

const ViewRecipeDialog: React.FC<ViewRecipeDialogProps> = ({ recipe, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-md" />
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <ChefHat className="mr-1 h-4 w-4" />
              {recipe.category}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {recipe.cooktime}
            </span>
            <span className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              {recipe.servings} servings
            </span>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Ingredients:</h3>
            <p>{recipe.ingredients}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <p>{recipe.instructions}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ViewRecipeDialog