import { chromium } from "playwright";
import { createStorageService, generateArtifactUUID } from "./storage";
import fs from "fs/promises";

(async () => {
  console.log("🎬  Launching browser…");
  
  const storage = createStorageService();
  await storage.ensureBucketExists?.();
  
  const uuid = generateArtifactUUID();
  console.log(`📦  Artifact UUID: ${uuid}`);
  
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    recordHar: { path: `temp-${uuid}.har`, mode: "full" },
  });

  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
    title: "PerfAI.ai walk-through",
  });

  const page = await context.newPage();
  await page.goto("https://perfai.ai/");
  
  await page.screenshot({ path: `temp-${uuid}.png`, fullPage: true });
  
  const domContent = await page.content();
  await fs.writeFile(`temp-${uuid}.html`, domContent);

  await context.tracing.stop({ path: `temp-${uuid}.zip` });

  await context.close();
  await browser.close();

  console.log("📁  Storing artifacts…");
  
  const snapshotPath = await storage.uploadSnapshot(`temp-${uuid}.png`, uuid);
  const domPath = await storage.uploadDOM(`temp-${uuid}.html`, uuid);
  const harPath = await storage.uploadHAR(`temp-${uuid}.har`, uuid);
  const tracePath = await storage.uploadTrace(`temp-${uuid}.zip`, uuid);

  await fs.unlink(`temp-${uuid}.png`);
  await fs.unlink(`temp-${uuid}.html`);
  await fs.unlink(`temp-${uuid}.har`);
  await fs.unlink(`temp-${uuid}.zip`);

  console.log("✅  Done – artifacts stored:");
  console.log(`   📸  Snapshot: ${snapshotPath}`);
  console.log(`   🌐  DOM: ${domPath}`);
  console.log(`   🌍  HAR: ${harPath}`);
  console.log(`   📊  Trace: ${tracePath}`);
})();
