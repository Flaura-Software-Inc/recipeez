import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import puppeteer, { Browser } from "puppeteer";

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT;

app.get("/", (_, res) => {
  res.send("Express + Typescript Server");
});

app.get("/fetch-html", async (req, res) => {
  let browser: Browser;
  const url = req.query.url as string;
  fetch(url)
    .then((res) => res.text())
    .then(async (html) => {
      if (html.includes("application/ld+json")) {
        res.send(html);
      } else {
        browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(req.query.url as string, {
          //wait for content to load
          waitUntil: "networkidle0",
        });
        const html = await page.content();
        res.send(html);
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
