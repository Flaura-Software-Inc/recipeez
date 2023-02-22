import React from 'react';
import { RecipeCardFront } from '../components/RecipeCard/RecipeCardFront';
import recipes from '../data/recipes';

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
      {recipes.map((recipe) => {
        return (
          <RecipeCardFront
            key={`${recipe.title}`}
            title={recipe.title}
            recipeProperties={recipe.recipeProperties}
            imgUrl={recipe.imgUrl}
          />
        );
      })}
    </div>
  );
}
