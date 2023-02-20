import React from 'react';

type Props = {
  title: string;
  recipeProperties: string[];
  recipeInstructions: string;
  ingredients: object[];
  details: object[];
};

export default function RecipeCardBack({
  title,
  recipeProperties,
  recipeInstructions,
  ingredients,
  details,
}: Props) {
  return <div>RecipeCardBack</div>;
}
