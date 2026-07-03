function isPDF(url) {
  if (!url) return false;

  url = url.toLowerCase();

  return (
    url.includes(".pdf") ||
    url.startsWith("blob:") && url.includes("pdf") ||
    url.includes("application/pdf")
  );
}

function getEnabled(callback) {
  chrome.storage.sync.get(["enabled"], (res) => {
    callback(res.enabled !== false);
  });
}

// Intercepter les clics sur les liens
document.addEventListener("click", (e) => {
  let target = e.target;

  while (target && target.tagName !== "A") {
    target = target.parentElement;
  }

  if (!target || !target.href) return;

  const url = target.href;

  if (!isPDF(url)) return;

  getEnabled((enabled) => {
    if (!enabled) return;

    console.log("📄 PDF detected:", url);

    window.open(url, "_blank");

    e.preventDefault();
    e.stopPropagation();
  });
});
