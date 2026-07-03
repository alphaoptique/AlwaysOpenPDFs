import { getEnabled } from "./lib/settings.js";

console.log("Always Open PDFs service worker started");

// Initialisation extension
chrome.runtime.onInstalled.addListener(() => {
  console.log("Always Open PDFs installed");

  chrome.storage.sync.get(["enabled"], (res) => {
    if (res.enabled === undefined) {
      chrome.storage.sync.set({ enabled: true });
    }
  });
});

// Intercepter téléchargements PDF
chrome.downloads.onCreated.addListener((downloadItem) => {
  const url = downloadItem.url || "";

  if (!url.toLowerCase().includes(".pdf")) return;

  getEnabled().then((enabled) => {
    if (!enabled) return;

    chrome.downloads.cancel(downloadItem.id, () => {
      chrome.tabs.create({ url });
    });
  });
});
