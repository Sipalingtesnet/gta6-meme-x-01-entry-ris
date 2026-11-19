// main.ts — make.fun bounty entry gta6-meme-x-01
// Node 22, standard library only. No network, no wall clock.
// Copies POST.json from the bot (repo) directory to the output directory,
// honouring MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR (defaults: /bot, /output).
// The copy is a pure byte-for-byte copy, so repeated runs are deterministic.
// Exits 0 silently on success; exits 1 with an error message on failure.

import { copyFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

function main(): void {
  const botDir = resolve(process.env.MAKEFUN_BOT_DIR ?? "/bot");
  const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  const source = join(botDir, "POST.json");
  const target = join(outputDir, "POST.json");

  mkdirSync(outputDir, { recursive: true });
  copyFileSync(source, target);
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`main.ts: failed to copy POST.json: ${message}`);
  process.exit(1);
}
