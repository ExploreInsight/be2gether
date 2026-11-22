/**
 * Real device-emulated screenshots over the Chrome DevTools Protocol.
 *   node scripts/screenshot.mjs <baseUrl> <outDir> [path ...]
 * Env: CHROME (binary), SETTINGS (JSON written to localStorage before load).
 * Prints per-shot metrics: scrollWidth vs innerWidth, so overflow is measured, never hidden.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const [base, out, ...paths] = process.argv.slice(2);
const CHROME = process.env.CHROME;
const SETTINGS = process.env.SETTINGS;
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, dpr: 1, mobile: false },
  { name: "phone", width: 390, height: 844, dpr: 2, mobile: true },
];
mkdirSync(out, { recursive: true });
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn(CHROME, [`--remote-debugging-port=${port}`, "--no-sandbox", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function connect() {
  for (let i = 0; i < 50; i++) {
    try {
      const t = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
      const ws = new WebSocket(t.webSocketDebuggerUrl);
      await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
      return ws;
    } catch { await sleep(200); }
  }
  throw new Error("could not reach chrome");
}

const ws = await connect();
let id = 0;
const pending = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evalJs = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;

await send("Page.enable");
if (SETTINGS) await send("Page.addScriptToEvaluateOnNewDocument", { source: `localStorage.setItem("be2gether:settings", ${JSON.stringify(JSON.stringify({ state: JSON.parse(SETTINGS), version: 1 }))})` });
const metrics = [];
for (const p of paths.length ? paths : ["/"]) {
  for (const v of VIEWPORTS) {
    await send("Emulation.setDeviceMetricsOverride", { width: v.width, height: v.height, deviceScaleFactor: v.dpr, mobile: v.mobile });
    if (v.mobile) await send("Emulation.setUserAgentOverride", { userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148" });
    await send("Page.navigate", { url: base + p });
    await sleep(2500);
    // scroll through so lazy images load, then return to the top
    await evalJs(`(async()=>{const h=document.documentElement.scrollHeight;for(let y=0;y<h;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}scrollTo(0,0);})()`);
    await sleep(600);
    const m = await evalJs(`({scrollWidth:document.documentElement.scrollWidth,innerWidth:innerWidth,bodyScrollWidth:document.body.scrollWidth,height:document.documentElement.scrollHeight})`);
    const lm = await send("Page.getLayoutMetrics");
    const h = process.env.VIEWPORT_ONLY ? v.height : Math.min(Math.ceil(lm.result.cssContentSize.height), 6000);
    const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width: v.width, height: h, scale: 1 } });
    const name = `${(p.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home")}-${v.name}${process.env.TAG ? "-" + process.env.TAG : ""}.png`;
    writeFileSync(`${out}/${name}`, Buffer.from(shot.result.data, "base64"));
    metrics.push({ path: p, viewport: v.name, ...m, overflowX: m.scrollWidth > m.innerWidth, file: name });
  }
}
console.log(JSON.stringify(metrics, null, 1));
ws.close();
chrome.kill();
process.exit(0);
