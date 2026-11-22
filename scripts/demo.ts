/**
 * Demo content CLI. Not run automatically against anything.
 *   npx tsx scripts/demo.ts seed     add demo users and posts
 *   npx tsx scripts/demo.ts remove   delete only rows flagged isDemo
 * Uses DATABASE_URL from your environment, so check which database that is first.
 */
import { removeDemoContent } from "../src/server/admin";
import { seedDemo } from "../src/server/seed";

async function main() {
  const cmd = process.argv[2];
  if (cmd === "seed") await seedDemo();
  else if (cmd === "remove") console.log(await removeDemoContent());
  else throw new Error("Usage: demo.ts seed | remove");
  console.log("done");
}
main().then(() => process.exit(0), (e) => { console.error(e); process.exit(1); });
