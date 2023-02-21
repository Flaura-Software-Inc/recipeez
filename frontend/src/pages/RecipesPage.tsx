import React from 'react';
import RecipeCardFront from '../components/RecipeCard/RecipeCardFront';

export default function RecipesPage() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <RecipeCardFront
        title="Test A Really Long Title Ma Ma Mia"
        imgUrl="AlsoTest"
        recipeProperties={['t1', 't2', 't3']}
      />
      <RecipeCardFront
        title="Test A Really Long Title Ma Ma Mia"
        imgUrl="AlsoTest"
        recipeProperties={['t1', 't2', 't3']}
      />
      <RecipeCardFront
        title="Test A Really Long Title Ma Ma Mia"
        imgUrl="AlsoTest"
        recipeProperties={['t1', 't2', 't3']}
      />
    </div>
  );
}
