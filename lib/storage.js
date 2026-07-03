export async function getEnabled() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["enabled"], (result) => {
      resolve(result.enabled !== false);
    });
  });
}

export async function setEnabled(value) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ enabled: value }, () => {
      resolve();
    });
  });
}
