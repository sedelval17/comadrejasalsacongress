import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';

export async function launchBrowser() {
  const cached = ['1194', '1187'].map(version => `${homedir()}/.cache/ms-playwright/chromium-${version}/chrome-linux/chrome`);
  const executablePath = process.env.CHROMIUM_PATH || cached.find(path => existsSync(path));
  return chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
}
