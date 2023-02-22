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
    yield: 'ServingNum',
    difficulty: 'easy/med/hard',
    proteinPerServing: 34,
    carbsPerServing: 18,
    fatPerServing: 6,
    saltPerServing: 2,
  },
  {
    title: "Tony's RigaToni",
    recipeProperties: recipePropertyOptions
      .sort(() => Math.random() - Math.random())
      .slice(0, 3),
    ingredients: [],
    steps: [],
    prepTime: 20,
    cookTime: 20,
    ovenTemp: 0,
    yield: 'ServingNum',
    difficulty: 'easy/med/hard',
    proteinPerServing: 34,
    carbsPerServing: 18,
    fatPerServing: 6,
    saltPerServing: 2,
  },
  {
    title: "Sugar-E's Scrumptious Sweetiess",
    imgUrl: '',
    recipeProperties: recipePropertyOptions
      .sort(() => Math.random() - Math.random())
      .slice(0, 2),
    ingredients: [],
    steps: [],
    prepTime: 20,
    cookTime: 20,
    ovenTemp: 180,
    difficulty: 'easy/med/hard',
    proteinPerServing: 34,
    carbsPerServing: 18,
    fatPerServing: 6,
    saltPerServing: 2,
  },
];

export default recipes;
