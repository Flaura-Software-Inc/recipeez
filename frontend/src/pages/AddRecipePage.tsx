import { useCallback, useState } from 'react';
import style from './AddRecipePage.module.css';

type RecipeIngredient = {
  ingredient: string;
  quantity: number;
  unit?: string;
};

export default function AddRecipePage() {
  const [lookupUrl, setLookupUrl] = useState<string>();
  const [recipeJson, setRecipeJson] = useState<string>();
  const [recipeLookupMessage, setRecipeLookupMessage] = useState<string>();
  const [domParser] = useState(new DOMParser());
  // Recipe state
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [description, setDescription] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [originalRecipeUrl, setOriginalRecipeUrl] = useState<string>();
  const [videoUrl, setVideoUrl] = useState<string>();
  const [servings, setServings] = useState<number>();
  const [calories, setCalories] = useState<number>();
  const [carbs, setCarbs] = useState<number>();
  const [fat, setFat] = useState<number>();
  const [protein, setProtein] = useState<number>();
  const [sugar, setSugar] = useState<number>();
  const [fiber, setFiber] = useState<number>();
  const [salt, setSalt] = useState<number>();
  const [prepTime, setPrepTime] = useState<number>();
  const [cookTime, setCookTime] = useState<number>();
  const [totalTime, setTotalTime] = useState<number>();
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
  const setRecipeDetails = (ldJsonString: string) => {
    const recipeDetails = JSON.parse(ldJsonString);
    setName(recipeDetails.name ?? '');
    // TODO: parse recipe ingredients
    setDescription(recipeDetails.description);
    setImageUrl(recipeDetails.image);
    setOriginalRecipeUrl(recipeDetails.author?.url);
    setVideoUrl(recipeDetails.video?.contentUrl);
    // TODO parse recipe yield
    setCalories(extractFirstNumericValue(recipeDetails.nutrition?.calories));
    setCarbs(
      extractFirstNumericValue(recipeDetails.nutrition?.carbohydrateContent)
    );
    setFat(extractFirstNumericValue(recipeDetails.nutrition?.fatContent));
    setFiber(extractFirstNumericValue(recipeDetails.nutrition?.fiberContent));
    setSugar(extractFirstNumericValue(recipeDetails.nutrition?.sugarContent));
    setProtein(
      extractFirstNumericValue(recipeDetails.nutrition?.proteinContent)
    );
    setSalt(extractFirstNumericValue(recipeDetails.nutrition?.sodiumContent));
    setPrepTime(convertRecipeTimeToMinutes(recipeDetails.prepTime));
    setCookTime(convertRecipeTimeToMinutes(recipeDetails.cookTime));
    setTotalTime(convertRecipeTimeToMinutes(recipeDetails.totalTime));
  };

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
  }, [domParser, lookupUrl]);

  return (
    <div className="App">
      <form className={style.recipeDetailsForm}>
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
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          Description
          <textarea name="" id="" cols={30} rows={10} value={description} />
        </div>
        <div>
          Image Url
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          Original recipe URL
          <input
            type="text"
            value={originalRecipeUrl}
            onChange={(e) => setOriginalRecipeUrl(e.target.value)}
          />
        </div>
        <div>
          Video URL
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
        <div>
          Calories
          <input
            type="text"
            value={calories}
            onChange={(e) => setCalories(Number.parseFloat(e.target.value))}
          />
        </div>
        <div>
          Carbohydrates
          <input
            type="text"
            value={carbs}
            onChange={(e) => setCarbs(Number.parseFloat(e.target.value))}
          />
        </div>
        <div>
          Fat
          <input
            type="text"
            value={fat}
            onChange={(e) => setFat(Number.parseFloat(e.target.value))}
          />
        </div>
        <div>
          Protein
          <input
            type="text"
            value={protein}
            onChange={(e) => setProtein(Number.parseFloat(e.target.value))}
          />
        </div>
        <div>
          Sugar
          <input
            type="text"
            value={sugar}
            onChange={(e) => setSugar(Number.parseFloat(e.target.value))}
          />
        </div>
        <div>
          Fiber
          <input
            type="text"
            value={fiber}
            onChange={(e) => setFiber(Number.parseFloat(e.target.value))}
          />
        </div>
        <div>
          Salt
          <input
            type="text"
            value={salt}
            onChange={(e) => setSalt(Number.parseFloat(e.target.value))}
          />
        </div>
        <div>
          Total time
          <input
            type="text"
            value={totalTime}
            onChange={(e) => setTotalTime(Number.parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          Prep time
          <input
            type="text"
            value={prepTime}
            onChange={(e) => setPrepTime(Number.parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          Cook time
          <input
            type="text"
            value={cookTime}
            onChange={(e) => setCookTime(Number.parseInt(e.target.value, 10))}
          />
        </div>
      </form>
    </div>
  );
}
