const recipePropertyOptions = [
  'vegan',
  'vegetarian',
  'dairyfree',
  'glutenfree',
  'spicy',
];

const recipes = [
  {
    title: "Mama's Spicy Meatballs",
    imgUrl: '',
    recipeProperties: recipePropertyOptions
      .sort(() => Math.random() - Math.random())
      .slice(0, 2),
    ingredients: [],
    steps: [],
    prepTime: 20,
    cookTime: 20,
    ovenTemp: 200,
    ovenTempUnit: 'C', // TODO: automatically convert F to C
    yield: 'ServingNum',
    difficulty: 'easy/med/hard',
    proteinPerServing: 34,
    carbsPerServing: 18,
    fatPerServing: 6,
    saltPerServing: 2,
  },
];

export default recipes;
