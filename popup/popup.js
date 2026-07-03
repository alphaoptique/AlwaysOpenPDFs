let enabled = true;

const status = document.getElementById("status");
const btn = document.getElementById("toggleBtn");

btn.addEventListener("click", () => {
  enabled = !enabled;

  if (enabled) {
    status.textContent = "Enabled";
    status.style.background = "#e8f5e9";
    status.style.color = "#2e7d32";
  } else {
    status.textContent = "Disabled";
    status.style.background = "#ffebee";
    status.style.color = "#c62828";
  }
});
