chrome.contextMenus.onClicked.addListener(function (evn) {
	chrome.tabs.query({
		'active' : true,
		'currentWindow' : true
	}, function (tabs) {
		var search = encodeURIComponent(evn.selectionText);
		chrome.tabs.create({
			'active' : false,
			'url' : chrome.i18n.getMessage('tabsCreateUrl', search),
			'index' : tabs[0].index + 1
		});
	});
});
chrome.contextMenus.create({
	'id' : 'root',
	'title' : chrome.i18n.getMessage('contextMenusTitle'),
	'contexts' : ['selection', 'editable']
});
