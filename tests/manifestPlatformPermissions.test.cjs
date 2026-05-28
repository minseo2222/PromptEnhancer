const assert = require("assert");
const fs = require("fs");

const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf8"));
const expectedHosts = [
  "https://chatgpt.com/*",
  "https://chat.openai.com/*",
  "https://claude.ai/*",
  "https://gemini.google.com/*"
];

assert.strictEqual(manifest.name, "Clarify Before Send");
assert.deepStrictEqual(manifest.permissions, ["storage"], "permissions must remain storage-only");
assert.deepStrictEqual(manifest.host_permissions, expectedHosts, "host permissions must be the exact supported hosts");
assert.deepStrictEqual(manifest.content_scripts[0].matches, expectedHosts, "content script matches must mirror supported hosts");
assert.ok(manifest.background && manifest.background.service_worker === "src/background.js", "background relay should be registered");
assert.ok(manifest.commands && manifest.commands["cbs-trigger-clarify"], "custom keyboard command should be registered");

const serialized = JSON.stringify(manifest);
assert.ok(!serialized.includes("<all_urls>"), "manifest must not request <all_urls>");
assert.ok(!serialized.includes("https://*/*"), "manifest must not request https wildcard hosts");

process.stdout.write("manifest platform permissions test ok\n");
