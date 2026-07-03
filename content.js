import { getEnabled } from "./lib/settings.js";

function isPDF(url) {
  if (!url) return false;
  return url.toLowerCase().includes(".pdf");
}

document.addEventListener("click", function (e) {
  let target = e.target;

  while (target && target.tagName !== "A") {
    target = target.parentElement;
  }

  if (!target) return;

  const url = target.href;

  if (!isPDF(url)) return;

  getEnabled().then((enabled) => {
    if (!enabled) return;

    console.log("PDF detected:", url);

    window.open(url, "_blank");

    e.preventDefault();
    e.stopPropagation();
  });
});
