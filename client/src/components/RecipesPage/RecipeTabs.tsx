import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Recipe } from '../../lib/types';
import { RecipeCard } from './RecipeCard';

interface RecipeTabsProps {
  filteredRecipes: Recipe[];
}

const RecipeTabs: React.FC<RecipeTabsProps> = ({ filteredRecipes }) => {
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
            <RecipeCard key={recipe.id} recipe={recipe} />
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