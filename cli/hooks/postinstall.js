#!/usr/bin/env node

// Postinstall: warm-up SQLite deps into ~/.0Router/runtime so the first
// `0Router` start doesn't need network. Failure here is non-fatal —
// cli.js will retry at runtime if anything is missing.
const { ensureSqliteRuntime } = require("./sqliteRuntime");
const { ensureTrayRuntime } = require("./trayRuntime");

try {
  ensureSqliteRuntime({ silent: false });
  console.log("[0Router] runtime SQLite deps ready");
} catch (e) {
  console.warn(`[0Router] runtime warm-up skipped: ${e.message}`);
}

try {
  ensureTrayRuntime({ silent: false });
} catch (e) {
  console.warn(`[0Router] tray runtime skipped: ${e.message}`);
}

process.exit(0);
