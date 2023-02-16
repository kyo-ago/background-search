chrome.contextMenus.onClicked.addListener(async (evn) => {
  const [{ tabsCreateUrl }, tabs] = await Promise.all([
    chrome.storage.sync.get({
      tabsCreateUrl: chrome.i18n.getMessage("tabsCreateUrl"),
    }),
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }),
  ]);
  const search = encodeURIComponent(evn.selectionText);
  chrome.tabs.create({
    active: false,
    url: tabsCreateUrl.replace(/%s/g, search),
    index: tabs[0].index + 1,
  });
});

const contextMenuCreate = async () => {
  const { contextMenusTitle } = await chrome.storage.sync.get({
    contextMenusTitle: chrome.i18n.getMessage("contextMenusTitle"),
  });

  chrome.contextMenus.create({
    id: "root",
    title: contextMenusTitle,
    contexts: ["selection", "editable"],
  });
};

chrome.storage.onChanged.addListener(
  async ({ contextMenusTitle }, namespace) => {
    if (!contextMenusTitle) {
      return;
    }
    if (namespace !== "sync") {
      return;
    }
    await chrome.contextMenus.removeAll();
    await contextMenuCreate();
  }
);

contextMenuCreate();
