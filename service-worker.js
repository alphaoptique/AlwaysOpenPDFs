console.log("Always Open PDFs service worker started");

// Activer par défaut à l'installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["enabled"], (res) => {
    if (res.enabled === undefined) {
      chrome.storage.sync.set({ enabled: true });
    }
  });
});

// Fonction notification
function notifyPDF(url) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon.png",
    title: "PDF Opened",
    message: url
  });
}

// Interception des téléchargements
chrome.downloads.onCreated.addListener((downloadItem) => {
  const url = downloadItem.url || "";

  if (!url.toLowerCase().includes(".pdf")) return;

  chrome.storage.sync.get(["enabled"], (res) => {
    const enabled = res.enabled !== false;

    if (!enabled) return;

    chrome.downloads.cancel(downloadItem.id, () => {
      chrome.tabs.create({ url });

      notifyPDF(url);
    });
  });
});
