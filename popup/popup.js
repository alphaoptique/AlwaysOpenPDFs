const status = document.getElementById("status");
const btn = document.getElementById("toggleBtn");

// Charger l'état réel
function loadState() {
  chrome.storage.sync.get(["enabled"], (result) => {
    const enabled = result.enabled !== false;
    updateUI(enabled);
  });
}

// Mettre à jour l'affichage
function updateUI(enabled) {
  if (enabled) {
    status.textContent = "Enabled";
    status.style.background = "#e8f5e9";
    status.style.color = "#2e7d32";
    btn.textContent = "Disable";
  } else {
    status.textContent = "Disabled";
    status.style.background = "#ffebee";
    status.style.color = "#c62828";
    btn.textContent = "Enable";
  }
}

// Toggle ON/OFF
btn.addEventListener("click", () => {
  chrome.storage.sync.get(["enabled"], (result) => {
    const newState = !(result.enabled !== false);

    chrome.storage.sync.set({ enabled: newState }, () => {
      updateUI(newState);
    });
  });
});

// Init
loadState();
