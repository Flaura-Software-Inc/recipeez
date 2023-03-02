import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

type RecipeIngredient = {
  ingredient: string;
  quantity: number;
  unit?: string;
};

export default function CreateRecipeForm() {
  const [lookupUrl, setLookupUrl] = useState<string>();
  const [recipeJson, setRecipeJson] = useState<string>();
  const [recipeLookupMessage, setRecipeLookupMessage] = useState<string>();
  const [domParser] = useState(new DOMParser());

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = (data: Record<string, string>) => console.log(data);

  // Recipe state
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  //
  const [description, setDescription] = useState<string>();
  const [rating, setRating] = useState<number>();
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
  const setRecipeDetails = useCallback((ldJsonString: string) => {
    const recipeDetails = JSON.parse(ldJsonString);
    setValue('name', recipeDetails.name ?? '');
    // TODO: parse recipe ingredients
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
    setValue('totalTime', convertRecipeTimeToMinutes(recipeDetails.totalTime));
  }, []);

  const extractRecipeJson = useCallback(() => {
    setRecipeJson(undefined);
    if (!lookupUrl?.trim()) {
      setRecipeLookupMessage('Enter a URL!');
    } else {
      setRecipeLookupMessage(undefined);
      fetch(`http://localhost:8000/fetch-html?url=${lookupUrl}`)
        .then((res) => res.text())
        .then((html) => {
          const parsedHtml = domParser.parseFromString(html, 'text/html');
          const recipeScriptTag = parsedHtml.querySelector(
            'script[type="application/ld+json"]'
          );
          if (!recipeScriptTag) {
            setRecipeLookupMessage('Could not find recipe at provided URL');
          } else {
            setRecipeDetails(recipeScriptTag.innerHTML);
          }
        })
        .catch((reason) => {
          setRecipeLookupMessage(reason.toString());
        });
    }
  }, [domParser, lookupUrl, setRecipeDetails]);

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
      </form>
    </div>
  );
}
