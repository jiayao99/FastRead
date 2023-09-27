let isEnabled = false;

chrome.browserAction.onClicked.addListener((tab) => {
  isEnabled = !isEnabled;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "toggleFastRead", isEnabled: isEnabled });
  });
});
