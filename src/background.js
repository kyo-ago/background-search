chrome.contextMenus.onClicked.addListener(function (evn) {
	chrome.tabs.query({
		'active' : true,
		'currentWindow' : true
	}, function (tabs) {
		var search = encodeURIComponent(evn.selectionText);
		chrome.tabs.create({
			'active' : false,
			'url' : 'https://www.google.co.jp/search?q=' + search,
			'index' : tabs[0].index + 1
		});
	});
});
chrome.contextMenus.create({
	'id' : 'root',
	'title' : 'Search Google for \'%s\'',
	'contexts' : ['selection', 'editable']
});
