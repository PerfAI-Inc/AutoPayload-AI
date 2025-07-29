import { chromium } from "playwright";

(async () => {
  console.log("🎬  Launching browser…");
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    // optional: still record HAR at the same time
    recordHar: { path: "network.har", mode: "full" },
  });

  // 1️⃣  Start tracing
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true, // include source code in the viewer
    title: "PerfAI.ai walk-through",
  });

  const page = await context.newPage();
  await page.goto("https://perfai.ai/");
  await page.screenshot({ path: "screenshot.png", fullPage: true });

  // 2️⃣  Stop tracing and save the archive
  await context.tracing.stop({ path: "trace.zip" });

  await context.close();
  await browser.close();
  console.log("✅  Done – trace.zip created");
})();
