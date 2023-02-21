import React from 'react';
import { RecipeCardFront } from '../components/RecipeCard/RecipeCardFront';

export default function RecipesPage() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        // justifyContent: 'center',
      }}
    >
      <RecipeCardFront
        title="Test A Really Long Title Ma Ma Mia"
        imgUrl="https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505"
        recipeProperties={['t1', 't2', 't3']}
      />
      <RecipeCardFront
        title="Test A Really Long Title Ma Ma Mia"
        imgUrl="https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505"
        recipeProperties={['t1', 't2', 't3']}
      />
      <RecipeCardFront
        title="Test A Really Long Title Ma Ma Mia"
        imgUrl="https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505"
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
