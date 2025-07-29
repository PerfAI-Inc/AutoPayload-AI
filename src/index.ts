import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://cloud.perfai.ai/", { waitUntil: "domcontentloaded" });
  await page.screenshot({ path: "screenshot.png", fullPage: true });
  await browser.close();
}

run().catch(console.error);
