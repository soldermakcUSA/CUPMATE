const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const sourcePath = path.join(__dirname, "../lib/content-localization.ts");
const source = fs.readFileSync(sourcePath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;

const moduleExports = { exports: {} };
Function("exports", "module", transpiled)(moduleExports.exports, moduleExports);
const { pickLocalizedTranslation, localizedDateFormatterLocale } = moduleExports.exports;

const rows = [
  { language_code: "en", title: "English title" },
  { language_code: "ru", title: "Русский заголовок" },
  { language_code: "es", title: "Título español" }
];

assert.equal(pickLocalizedTranslation(rows, "ru").title, "Русский заголовок");
assert.equal(pickLocalizedTranslation(rows, "fr").title, "English title");
assert.equal(pickLocalizedTranslation([{ language_code: "de", title: "Deutsch" }], "ja").title, "Deutsch");
assert.equal(pickLocalizedTranslation([], "ru"), undefined);
assert.equal(localizedDateFormatterLocale("ru"), "ru-RU");
assert.equal(localizedDateFormatterLocale("en"), "en-US");

console.log("content localization tests passed");
