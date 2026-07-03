const status = document.getElementById("status");
const btn = document.getElementById("toggleBtn");

// Charger état global
function loadState() {
  chrome.storage.sync.get(["enabled"], (res) => {
    const enabled = res.enabled !== false;
    updateUI(enabled);
  });
}

// Mettre à jour UI
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
  chrome.storage.sync.get(["enabled"], (res) => {
    const newState = !(res.enabled !== false);

    chrome.storage.sync.set({ enabled: newState }, () => {
      updateUI(newState);
    });
  });
});

// Init
loadState();
