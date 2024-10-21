import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import RecipeCard from './RecipeCard';

export interface Recipe {
  id: number;
  title: string;
  category: string;
  cookTime: string;
  servings: number;
  image: string;
  ingredients: string;
  instructions: string;
  isFavorite: boolean;
  dateAdded: Date;
}

interface RecipeTabsProps {
  filteredRecipes: Recipe[];
}

const RecipeTabs: React.FC<RecipeTabsProps> = ({ filteredRecipes }) => {
  const handleViewRecipe = (id: number) => {
    console.log(`Viewing recipe with id: ${id}`);
  };

  const handleToggleFavorite = (id: number) => {
    console.log(`Toggling favorite for recipe with id: ${id}`);
  };

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
              onView={() => handleViewRecipe(recipe.id)}
              onToggleFavorite={() => handleToggleFavorite(recipe.id)}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="favorites">
        <p>Your favorite recipes will appear here.</p>
      </TabsContent>
      
      <TabsContent value="recent">
        <p>Your recently added recipes will appear here.</p>
      </TabsContent>
    </Tabs>
  );
};

export default RecipeTabs;