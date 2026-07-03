export function getEnabled() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["enabled"], (res) => {
      resolve(res.enabled !== false);
    });
  });
}

export function setEnabled(value) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ enabled: value }, () => {
      resolve();
    });
  });
}
