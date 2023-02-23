import { useCallback, useState } from 'react';

export default function AddRecipePage() {
  const [lookupUrl, setLookupUrl] = useState<string>();
  const [recipeJson, setRecipeJson] = useState<string>();
  const [recipeLookupMessage, setRecipeLookupMessage] = useState<string>();
  const [domParser] = useState(new DOMParser());

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
            setRecipeJson(recipeScriptTag.innerHTML);
          }
        })
        .catch((reason) => {
          setRecipeLookupMessage(reason.toString());
        });
    }
  }, [domParser, lookupUrl]);

  return (
    <div className="App">
      <form>
        <button type="button" onClick={() => extractRecipeJson()}>
          Look up recipe
        </button>
        <input
          type="text"
          onChange={(input) => setLookupUrl(input.target.value)}
        />
        {recipeLookupMessage && <p>{recipeLookupMessage}</p>}
        {recipeJson && <p>{recipeJson}</p>}
      </form>
    </div>
  );
}
