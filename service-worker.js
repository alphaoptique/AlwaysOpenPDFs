console.log("Always Open PDFs service worker started");

// Quand l'extension est installée
chrome.runtime.onInstalled.addListener(() => {
  console.log("Always Open PDFs installed");

  // Valeur par défaut
  chrome.storage.sync.get(["enabled"], (result) => {
    if (result.enabled === undefined) {
      chrome.storage.sync.set({ enabled: true });
    }
  });
});

// Intercepter les téléchargements
chrome.downloads.onCreated.addListener((downloadItem) => {
  const url = downloadItem.url || "";

  if (!url.toLowerCase().includes(".pdf")) return;

  chrome.storage.sync.get(["enabled"], (result) => {
    const enabled = result.enabled !== false;

    if (!enabled) return;

    console.log("PDF download intercepted:", url);

    // On tente d'annuler le téléchargement
    chrome.downloads.cancel(downloadItem.id, () => {
      console.log("Download cancelled:", url);

      // Ouvrir dans un nouvel onglet
      chrome.tabs.create({ url });
    });
  });
});
