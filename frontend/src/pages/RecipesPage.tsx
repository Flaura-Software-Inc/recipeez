import React from 'react';
import RecipeCardFront from '../components/RecipeCard/RecipeCardFront';

export default function RecipesPage() {
  return (
    <div>
      <RecipeCardFront
        title="Test A Really Long Title Ma Ma Mia"
        imgUrl="AlsoTest"
        recipeProperties={['test1', 'test2', 'test3']}
      />
      <RecipeCardFront
        title="Test A Really Long Title Ma Ma Mia"
        imgUrl="AlsoTest"
        recipeProperties={['test1', 'test2', 'test3']}
      />
    </div>
  );
}
