import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { RecipeCardFront, RecipeCardFrontProps } from './RecipeCardFront';

export default {
  title: 'Recipe Card: Front',
  component: RecipeCardFront,
} as Meta<typeof RecipeCardFront>;

const Template: StoryFn<typeof RecipeCardFront> = (
  args: RecipeCardFrontProps
) => <RecipeCardFront {...args} />;

export const WithImage = Template.bind({});
WithImage.args = {
  title: 'Test A Really Long Title Ma Ma Mia',
  imgUrl: 'AlsoTest',
  recipeProperties: ['t1', 't2', 't3'],
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  title: "Mama's Spicy Meatballs",
  recipeProperties: ['t1', 't2', 't3'],
};
