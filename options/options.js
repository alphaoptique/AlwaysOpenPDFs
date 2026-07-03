const enabledCheckbox = document.getElementById("enabled");

// Charger état
chrome.storage.sync.get(["enabled"], (result) => {
  enabledCheckbox.checked = result.enabled !== false;
});

// Sauvegarder état
enabledCheckbox.addEventListener("change", () => {
  chrome.storage.sync.set({
    enabled: enabledCheckbox.checked
  });
});
