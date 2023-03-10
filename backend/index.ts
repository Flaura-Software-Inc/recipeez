import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import puppeteer, { Browser } from "puppeteer";
import { ChatGPTAPI } from "chatgpt";
import { JSDOM, VirtualConsole } from "jsdom";

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT;
const chatGpt = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY! });
const ingredientExtractionPrompt = `Given the following JSON list of ingredient strings, I want you to convert each one into a JSON object 
  with the keys: ingredient, unit, amount, notes. "Ingredient" should represent the food item in the string, and should 
  never be null. "Unit" should be the abbreviated unit of measurement used for the ingredient. Words such as "pinch", "dash", 
  and other informal measurements should be considered a unit. "Amount" should indicate the numeric quantity of the unit, 
  and fractions should be represented as decimal numbers. When the quantity is a range, use the midpoint and add a note about 
  the range. "Notes" should be an array of additional notes that you find about the ingredient. For any fields that don't have a match, 
  set it to null: `;
const virtualConsole = new VirtualConsole();
virtualConsole.on("error", () => {
  // ignore jsdom errors
});

app.get("/", (_, res) => {
  res.send("Express + Typescript Server");
});

app.get("/fetch-recipe-details", async (req, res) => {
  let browser: Browser;
  const url = req.query.url as string;
  fetch(url)
    .then((res) => res.text())
    .then(async (html) => {
      if (!html.includes("application/ld+json")) {
        browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(req.query.url as string, {
          //wait for content to load
          waitUntil: "networkidle0",
        });
        html = await page.content();
      }

      const dom = new JSDOM(html, { virtualConsole });
      const recipeScriptTag = dom.window.document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (!recipeScriptTag) {
        res
          .status(404)
          .send({ message: "Unable to find recipe at URL provided" });
      } else {
        const recipeDetails = JSON.parse(recipeScriptTag.innerHTML);
        let ingredientList = [];
        if (recipeDetails.recipeIngredient) {
          const ingredientsResponse = await chatGpt.sendMessage(
            `${ingredientExtractionPrompt} ${JSON.stringify(
              recipeDetails.recipeIngredient
            )}`
          );
          try {
            const jsonStart = ingredientsResponse.text.indexOf("[");
            const jsonEnd = ingredientsResponse.text.lastIndexOf("]") + 1;
            ingredientList = JSON.parse(
              ingredientsResponse.text.slice(jsonStart, jsonEnd)
            );
          } catch (e) {
            console.error(
              `Failed to parse ingredients from ChatGPT response: ${ingredientsResponse}`
            );
          }
          res.send({ recipeDetails, ingredientList });
        }
      }
    })
    .catch((reason) => {
      res.status(500).send({ message: reason.toString() });
    })
    .finally(async () => {
      if (browser) {
        await browser.close();
      }
    });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
