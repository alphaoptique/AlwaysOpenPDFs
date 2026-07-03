// Always Open PDFs - content script (v1)

// Fonction pour vérifier si un lien est un PDF
function isPDFLink(url) {
  if (!url) return false;
  return url.toLowerCase().includes(".pdf");
}

// Intercepter les clics sur la page
document.addEventListener("click", function (e) {
  let target = e.target;

  // Remonter jusqu'au lien <a>
  while (target && target.tagName !== "A") {
    target = target.parentElement;
  }

  if (!target) return;

  const url = target.href;

  if (isPDFLink(url)) {
    console.log("PDF link detected:", url);

    // Ouvrir dans un nouvel onglet
    window.open(url, "_blank");

    // Empêcher le téléchargement direct
    e.preventDefault();
    e.stopPropagation();
  }
});
