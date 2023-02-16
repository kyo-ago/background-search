(async () => {
  const { tabsCreateUrl, contextMenusTitle } = await chrome.storage.sync.get({
    tabsCreateUrl: chrome.i18n.getMessage("tabsCreateUrl"),
    contextMenusTitle: chrome.i18n.getMessage("contextMenusTitle"),
  });
  document.getElementById("tabsCreateUrl").value = tabsCreateUrl;
  document.getElementById("contextMenusTitle").value = contextMenusTitle;
})();

document.getElementById("save").addEventListener("click", async () => {
  const tabsCreateUrl = document.getElementById("tabsCreateUrl").value;
  const contextMenusTitle = document.getElementById("contextMenusTitle").value;
  await chrome.storage.sync.set({
    tabsCreateUrl: tabsCreateUrl,
    contextMenusTitle: contextMenusTitle,
  });

  const save = document.getElementById("save");
  const baseText = save.textContent;
  save.textContent = "Saved!";
  setTimeout(() => {
    save.textContent = baseText;
  }, 750);
});
