// Always Open PDFs - service worker (v1)

// Quand l'extension est installée
chrome.runtime.onInstalled.addListener(() => {
  console.log("Always Open PDFs installed");
});

// Intercepter les téléchargements
chrome.downloads.onCreated.addListener((downloadItem) => {
  const url = downloadItem.url || "";

  // Si c'est un PDF
  if (url.includes(".pdf")) {
    console.log("PDF detected:", url);

    // Annule le téléchargement (si possible)
    chrome.downloads.cancel(downloadItem.id, () => {
      console.log("Download cancelled:", url);

      // Ouvre le PDF dans un nouvel onglet
      chrome.tabs.create({ url });
    });
  }
});
