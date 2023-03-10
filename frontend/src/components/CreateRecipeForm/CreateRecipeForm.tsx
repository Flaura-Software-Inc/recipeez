import { useCallback, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Rating } from '@smastrom/react-rating';

type RecipeIngredient = {
  ingredient: string;
  amount: number | null;
  unit: string | null;
  notes: string | string[] | null;
};

type RecipeDetails = {
  totalTime: string;
  cookTime: string;
  prepTime: string;
  name: string;
  description: string;
  image: string;
  author?: { url?: string };
  video?: { contentUrl: string };
  recipeInstructions: string[];
  nutrition?: {
    calories?: string;
    carbohydrateContent: '88.03';
    fatContent: string;
    fiberContent: string;
    proteinContent: string;
    sugarContent: string;
    sodiumContent: string;
  };
};

export default function CreateRecipeForm() {
  const [lookupUrl, setLookupUrl] = useState<string>();
  const [recipeJson, setRecipeJson] = useState<string>();
  const [recipeLookupMessage, setRecipeLookupMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();
  const {
    fields: ingredients,
    append: addIngredient,
    remove: removeIngredientAtIdx,
  } = useFieldArray({ control, name: 'ingredients' });
  const onSubmit = (data: Record<string, string>) => console.log(data);

  // Recipe state
  const [instructions, setInstructions] = useState<string[]>([]);
  //
  const [rating, setRating] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);

  const extractFirstNumericValue = (
    nutrientDetails: string | undefined
  ): number | undefined => {
    if (nutrientDetails) {
      const nutrientNumber = /([0-9.]+)/.exec(nutrientDetails)?.[1];
      return nutrientNumber ? Number.parseFloat(nutrientNumber) : undefined;
    }
    return undefined;
  };
  const convertRecipeTimeToMinutes = (recipeTime: string | undefined) => {
    if (recipeTime) {
      const hoursNumber = /([0-9]+)H/.exec(recipeTime)?.[1];
      const minutesNumber = /([0-9]+)M/.exec(recipeTime)?.[1];
      return (
        (hoursNumber ? Number.parseInt(hoursNumber, 10) : 0) * 60 +
        (minutesNumber ? Number.parseInt(minutesNumber, 10) : 0)
      );
    }
    return undefined;
  };

  const setRecipeDetails = useCallback(
    (recipeDetails: RecipeDetails, ingredientList: RecipeIngredient[]) => {
      setValue('name', recipeDetails.name ?? '');
      ingredientList.forEach(({ ingredient, unit, notes, amount }) => {
        let notesValue = '';
        if (Array.isArray(notes)) {
          notesValue = notes.join(', ');
        } else if (typeof notes === 'string') {
          notesValue = notes;
        }

        addIngredient({
          name: ingredient,
          unit: unit === null ? '' : unit,
          amount: amount === null ? '' : amount,
          notes: notesValue,
        });
      });
      setValue('description', recipeDetails.description);
      setValue('imgUrl', recipeDetails.image);
      setValue('recipeUrl', recipeDetails.author?.url);
      setValue('videoUrl', recipeDetails.video?.contentUrl);
      // TODO parse recipe yield
      setValue(
        'calories',
        extractFirstNumericValue(recipeDetails.nutrition?.calories)
      );
      setValue(
        'carbohydrates',
        extractFirstNumericValue(recipeDetails.nutrition?.carbohydrateContent)
      );
      setValue(
        'fat',
        extractFirstNumericValue(recipeDetails.nutrition?.fatContent)
      );
      setValue(
        'fiber',
        extractFirstNumericValue(recipeDetails.nutrition?.fiberContent)
      );
      setValue(
        'sugar',
        extractFirstNumericValue(recipeDetails.nutrition?.sugarContent)
      );
      setValue(
        'protein',
        extractFirstNumericValue(recipeDetails.nutrition?.proteinContent)
      );
      setValue(
        'salt',
        extractFirstNumericValue(recipeDetails.nutrition?.sodiumContent)
      );
      setValue('prepTime', convertRecipeTimeToMinutes(recipeDetails.prepTime));
      setValue('cookTime', convertRecipeTimeToMinutes(recipeDetails.cookTime));
      setValue(
        'totalTime',
        convertRecipeTimeToMinutes(recipeDetails.totalTime)
      );
    },
    [addIngredient, setValue]
  );

  const extractRecipeJson = useCallback(() => {
    setRecipeJson(undefined);
    if (!lookupUrl?.trim()) {
      setRecipeLookupMessage('Enter a URL!');
    } else {
      setRecipeLookupMessage(undefined);
      fetch(`http://localhost:8000/fetch-recipe-details?url=${lookupUrl}`)
        .then((res) => res.json())
        .then(({ recipeDetails, ingredientList }) => {
          setRecipeDetails(recipeDetails, ingredientList);
        })
        .catch((reason) => {
          setRecipeLookupMessage(reason.toString());
        });
    }
  }, [lookupUrl, setRecipeDetails]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="submit" value="blah" />
        <div>
          <input
            type="text"
            onChange={(input) => setLookupUrl(input.target.value)}
            placeholder="Recipe url"
          />
          <button type="button" onClick={() => extractRecipeJson()}>
            Look up recipe
          </button>
        </div>
        {recipeLookupMessage && <p>{recipeLookupMessage}</p>}
        {recipeJson && <p>{recipeJson}</p>}
        <div>
          Name
          <input type="text" {...register('name')} />
        </div>
        <div>
          Description
          <textarea id="" cols={30} rows={10} {...register('description')} />
        </div>
        {ingredients.map((ingredient, idx) => {
          return (
            <>
              <input
                type="text"
                key={`${ingredient.id}-name`}
                {...register(`ingredients.${idx}.name`)}
              />
              <input
                type="text"
                key={`${ingredient.id}-unit`}
                {...register(`ingredients.${idx}.unit`)}
              />
              <input
                type="text"
                key={`${ingredient.id}-amount`}
                {...register(`ingredients.${idx}.amount`)}
              />
              <input
                type="text"
                key={`${ingredient.id}-notes`}
                {...register(`ingredients.${idx}.notes`)}
              />
              <hr />
            </>
          );
        })}
        <button
          type="button"
          onClick={() =>
            addIngredient({ name: '', unit: undefined, amount: undefined })
          }
        >
          Add ingredient
        </button>
        <div>
          Image Url
          <input type="text" {...register('imgUrl')} />
        </div>
        <div>
          Original recipe URL
          <input type="text" {...register('recipeUrl')} />
        </div>
        <div>
          Video URL
          <input type="text" {...register('videoUrl')} />
        </div>
        <div>
          Calories
          <input type="text" {...register('calories')} />
        </div>
        <div>
          Carbohydrates
          <input type="text" {...register('carbohydrates')} />
        </div>
        <div>
          Fat
          <input type="text" {...register('fat')} />
        </div>
        <div>
          Protein
          <input type="text" {...register('protein')} />
        </div>
        <div>
          Sugar
          <input type="text" {...register('sugar')} />
        </div>
        <div>
          Fiber
          <input type="text" {...register('fiber')} />
        </div>
        <div>
          Salt
          <input type="text" {...register('salt')} />
        </div>
        <div>
          Total time
          <input type="text" {...register('totalTime')} />
        </div>
        <div>
          Prep time
          <input type="text" {...register('prepTime')} />
        </div>
        <div>
          Cook time
          <input type="text" {...register('cookTime')} />
        </div>
        <Rating
          value={rating}
          onChange={setRating}
          items={10}
          style={{ maxWidth: '300px' }}
        />
      </form>
    </div>
  );
}
