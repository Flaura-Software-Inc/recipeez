import React from 'react';
import RecipeCardFront from '../components/RecipeCardFront';

export default function HomePage() {
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
