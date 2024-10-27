import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import RecipeCard from './RecipeCard';

export interface Recipe {
  id: number;
  title: string;
  category: string;
  cooktime: string;
  servings: number;
  image: string;
  ingredients: string;
  instructions: string;
  isFavorite: boolean;
  dateadded: string;
  user_id: string;
}

interface RecipeTabsProps {
  filteredRecipes: Recipe[];
  onView: (recipe: Recipe) => void;
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (recipe: Recipe) => void;
}

const RecipeTabs: React.FC<RecipeTabsProps> = ({ 
  filteredRecipes, 
  onView, 
  onToggleFavorite, 
  onDelete, 
  onEdit 
}) => {
  return (
    <Tabs defaultValue="all" className="w-full">
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
              onView={() => onView(recipe)}
              onToggleFavorite={() => onToggleFavorite(recipe.id)}
              onDelete={() => onDelete(recipe.id)}
              onEdit={() => onEdit(recipe)}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="favorites">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes
            .filter(recipe => recipe.isFavorite)
            .map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onView={() => onView(recipe)}
                onToggleFavorite={() => onToggleFavorite(recipe.id)}
                onDelete={() => onDelete(recipe.id)}
                onEdit={() => onEdit(recipe)}
              />
            ))}
        </div>
      </TabsContent>
      
      <TabsContent value="recent">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes
            .sort((a, b) => new Date(b.dateadded).getTime() - new Date(a.dateadded).getTime())
            .slice(0, 5)
            .map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onView={() => onView(recipe)}
                onToggleFavorite={() => onToggleFavorite(recipe.id)}
                onDelete={() => onDelete(recipe.id)}
                onEdit={() => onEdit(recipe)}
              />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default RecipeTabs;