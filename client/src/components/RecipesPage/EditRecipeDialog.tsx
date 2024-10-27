import React, { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

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

interface EditRecipeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
  handleEditRecipe: (recipe: Recipe) => void;
}

export default function EditRecipeDialog({ isOpen, onClose, recipe, handleEditRecipe }: EditRecipeDialogProps) {
  const [editedRecipe, setEditedRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    if (recipe) {
      setEditedRecipe({ ...recipe })
    }
  }, [recipe])

  if (!editedRecipe) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editedRecipe) {
      handleEditRecipe(editedRecipe)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Recipe</DialogTitle>
          <DialogDescription>
            Make changes to your recipe here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={editedRecipe.title}
                onChange={(e) => setEditedRecipe({ ...editedRecipe, title: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select 
                value={editedRecipe.category} 
                onValueChange={(value) => setEditedRecipe({...editedRecipe, category: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cooktime" className="text-right">
                Cook Time
              </Label>
              <Input
                id="cooktime"
                value={editedRecipe.cooktime}
                onChange={(e) => setEditedRecipe({...editedRecipe, cooktime: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="servings" className="text-right">
                Servings
              </Label>
              <Input
                id="servings"
                type="number"
                value={editedRecipe.servings}
                onChange={(e) => setEditedRecipe({...editedRecipe, servings: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ingredients" className="text-right">
                Ingredients
              </Label>
              <Textarea
                id="ingredients"
                value={editedRecipe.ingredients}
                onChange={(e) => setEditedRecipe({...editedRecipe, ingredients: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructions" className="text-right">
                Instructions
              </Label>
              <Textarea
                id="instructions"
                value={editedRecipe.instructions}
                onChange={(e) => setEditedRecipe({...editedRecipe, instructions: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}