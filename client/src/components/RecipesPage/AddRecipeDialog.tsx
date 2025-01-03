import React from "react"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

interface AddRecipeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  newRecipe: Partial<{
    title: string;
    category: string;
    cooktime: string;
    servings: number;
    ingredients: string;
    instructions: string;
    image: string;
  }>;
  setNewRecipe: React.Dispatch<React.SetStateAction<Partial<{
    title: string;
    category: string;
    cooktime: string;
    servings: number;
    ingredients: string;
    instructions: string;
    image: string;
  }>>>;
  handleAddRecipe: () => void;
}

export default function AddRecipeDialog({ isOpen, onClose, newRecipe, setNewRecipe, handleAddRecipe }: AddRecipeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Recipe</DialogTitle>
          <DialogDescription>
            Enter the details of your new recipe here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={newRecipe.title}
              onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select value={newRecipe.category} onValueChange={(value) => setNewRecipe({...newRecipe, category: value})}>
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
              value={newRecipe.cooktime}
              onChange={(e) => setNewRecipe({...newRecipe, cooktime: e.target.value})}
              className="col-span-3"
              placeholder="e.g., 30 mins"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="servings" className="text-right">
              Servings
            </Label>
            <Input
              id="servings"
              value={newRecipe.servings}
              onChange={(e) => setNewRecipe({...newRecipe, servings: parseInt(e.target.value)})}
              className="col-span-3"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ingredients" className="text-right">
              Ingredients
            </Label>
            <Textarea
              id="ingredients"
              value={newRecipe.ingredients}
              onChange={(e) => setNewRecipe({...newRecipe, ingredients: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="instructions" className="text-right">
              Instructions
            </Label>
            <Textarea
              id="instructions"
              value={newRecipe.instructions}
              onChange={(e) => setNewRecipe({...newRecipe, instructions: e.target.value})}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddRecipe}>Save Recipe</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}