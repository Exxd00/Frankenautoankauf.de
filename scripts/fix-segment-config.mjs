import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "src", "app");

const allowedDynamic = new Set(["force-dynamic", "force-static", "error"]);
const allowedRuntime = new Set(["nodejs", "edge"]);

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx|js|jsx)$/.test(name)) out.push(p);
  }
  return out;
}

function read(p) {
  return fs.readFileSync(p, "utf8");
}
function write(p, s) {
  fs.writeFileSync(p, s, "utf8");
}

function fixFile(file) {
  let src = read(file);
  const orig = src;
  const issues = [];
  let changed = false;

  // legacy `config` export (not used in App Router; can trigger invalid segment config)
  const configRe = /(^|\n)\s*export\s+const\s+config\s*=\s*[^;]+;?\s*/g;
  if (configRe.test(src)) {
    src = src.replace(configRe, "\n");
    changed = true;
    issues.push("Removed `export const config = ...` (legacy)");
  }

  // dynamic boolean -> force-*
  const dynBoolRe = /export\s+const\s+dynamic\s*=\s*(true|false)\s*;?/g;
  src = src.replace(dynBoolRe, (_, v) => {
    changed = true;
    const val = v === "true" ? "force-dynamic" : "force-static";
    issues.push(`Fixed dynamic boolean -> "${val}"`);
    return `export const dynamic = "${val}"`;
  });

  // dynamic "static"/"dynamic" -> force-*
  const dynBadStrRe = /export\s+const\s+dynamic\s*=\s*["'](static|dynamic)["']\s*;?/g;
  src = src.replace(dynBadStrRe, (_, v) => {
    changed = true;
    const val = v === "dynamic" ? "force-dynamic" : "force-static";
    issues.push(`Fixed dynamic "${v}" -> "${val}"`);
    return `export const dynamic = "${val}"`;
  });

  // revalidate "3600" -> 3600
  const revalidateStrRe = /export\s+const\s+revalidate\s*=\s*["'](\d+)["']\s*;?/g;
  src = src.replace(revalidateStrRe, (_, num) => {
    changed = true;
    issues.push(`Fixed revalidate string -> number (${num})`);
    return `export const revalidate = ${num}`;
  });

  // runtime invalid value -> remove
  const runtimeRe = /export\s+const\s+runtime\s*=\s*["']([^"']+)["']\s*;?/g;
  src = src.replace(runtimeRe, (m, v) => {
    if (!allowedRuntime.has(v)) {
      changed = true;
      issues.push(`Removed invalid runtime "${v}" (allowed: nodejs|edge)`);
      return "";
    }
    return m;
  });

  // preferredRegion "iad1" -> ["iad1"]
  const prefRegionStrRe = /export\s+const\s+preferredRegion\s*=\s*["']([^"']+)["']\s*;?/g;
  src = src.replace(prefRegionStrRe, (_, v) => {
    changed = true;
    issues.push(`Fixed preferredRegion string -> array ["${v}"]`);
    return `export const preferredRegion = ["${v}"]`;
  });

  // report invalid dynamic strings
  const dynRe = /export\s+const\s+dynamic\s*=\s*["']([^"']+)["']\s*;?/g;
  for (const match of src.matchAll(dynRe)) {
    const v = match[1];
    if (!allowedDynamic.has(v)) {
      issues.push(`Found invalid dynamic "${v}" (allowed: ${[...allowedDynamic].join(", ")})`);
    }
  }

  if (changed && src !== orig) write(file, src);
  return { file, changed, issues };
}

function main() {
  if (!fs.existsSync(APP_DIR)) {
    console.error("src/app not found.");
    process.exit(1);
  }

  const files = walk(APP_DIR);
  const results = files.map(fixFile);

  const touched = results.filter((r) => r.changed);
  const flagged = results.filter((r) => r.issues.length);

  console.log("\n=== Segment Config Scan Report ===");
  console.log(`Scanned files: ${files.length}`);
  console.log(`Auto-fixed files: ${touched.length}`);
  console.log(`Files with notes/issues: ${flagged.length}\n`);

  for (const r of flagged) {
    console.log(`- ${path.relative(ROOT, r.file)}`);
    for (const i of r.issues) console.log(`   • ${i}`);
  }

  console.log("\nDone.");
}

main();
