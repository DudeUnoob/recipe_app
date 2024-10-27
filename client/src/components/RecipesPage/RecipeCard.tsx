import React from "react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { ChefHat, Clock, Users, BookOpen, Heart, Share2, Trash2, Edit } from "lucide-react"

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    category: string;
    cooktime: string;
    servings: number;
    image: string;
    isFavorite: boolean;
  };
  onView: () => void;
  onToggleFavorite: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onView, onToggleFavorite, onDelete, onEdit }: RecipeCardProps) => {
  return (
    <Card className="overflow-hidden">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
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
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={onView}>
            <BookOpen className="mr-2 h-4 w-4" />
            View
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={onToggleFavorite}>
              <Heart className={`h-4 w-4 ${recipe.isFavorite ? 'fill-current text-red-500' : ''}`} />
            </Button>
            <Button variant={"ghost"} size={"sm"} onClick={onEdit}>
              <Edit className="h-4 w-4"/>
            </Button>
              <Button variant="ghost" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RecipeCard