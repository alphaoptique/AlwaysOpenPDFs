function isPDF(url) {
  if (!url) return false;
  return url.toLowerCase().includes(".pdf");
}

// Vérifier si extension activée
function isEnabled(callback) {
  chrome.storage.sync.get(["enabled"], (result) => {
    callback(result.enabled !== false);
  });
}

// Interception des clics
document.addEventListener("click", function (e) {
  let target = e.target;

  while (target && target.tagName !== "A") {
    target = target.parentElement;
  }

  if (!target) return;

  const url = target.href;

  if (!isPDF(url)) return;

  isEnabled((enabled) => {
    if (!enabled) return;

    console.log("PDF detected:", url);

    // Ouvrir dans un nouvel onglet
    window.open(url, "_blank");

    // Bloquer comportement normal
    e.preventDefault();
    e.stopPropagation();
  });
});
