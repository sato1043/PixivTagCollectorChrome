// vim: ts=2 sw=2 expandtab fenc=utf8 :
// tagCollector がpixiv.netドメイン以下のページの表示毎に実行する処理
'use strict';

// PixivTagCollector用のスタイルシートを加える
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('style_ptc.css');
(document.head || document.documentElement).appendChild(style);


// PixivTagCollectorのタグ一覧表示を Ctrl+Q でトグルできるように。
document.addEventListener("keydown", function (e) {
	if (e.ctrlKey && e.keyCode == 81) {
		if ($('.tag_lists').css('display') == 'none') {
			$('.tag_lists').css('display', 'block');
			chrome.extension.sendRequest({ action : "showTagList" }, function (response) {});
		} else {
			$('.tag_lists').css('display', 'none');
			chrome.extension.sendRequest({ action : "hideTagList" }, function (response) {});
		}
	}
}, true);


// AutoPagerize対応(してるのか？)
document.addEventListener('GM_AutoPagerizeNextPageLoaded', function (e) {
	unsafeWindow.pixiv.scrollView.add('.ui-scroll-view', e.target);
}, false);
document.body.addEventListener('AutoPagerize_DOMNodeInserted', function (e) {
	chrome.extension.sendRequest({
		action : "getOptions"
	}, function (response) {
		
		if (response.resultOptions == null)
			return;
		
		addCollectedPixivTags(e.target, response.resultOptions);
		
		if (options.pixivOpenInNewTab)
			forceMemberIllustPageOpenInNewTab(e.target);
	});
}, false);


// 画面にタグ一覧を追加する（ここがメインの処理）
// background.jsにオプションを問い合わせて、返答があれば追加する
chrome.extension.sendRequest({
	action : "getOptions"
}, function (response) {
	
	if (response.resultOptions == null)
		return;
	
	if (response.resultOptions.pixivDeadLines1Name != ""
	 || response.resultOptions.pixivDeadLines2Name != ""
	 || response.resultOptions.pixivDeadLines3Name != "" ) {
		addDeadLineList(document, response.resultOptions);
	}
	
	addCollectedPixivTags(document, response.resultOptions);
	
	showLogo(document, response.resultOptions.pixivShowLogo);
	
	showMyProfile(document, response.resultOptions.pixivShowMyProfile);
	showMyMenu(document, response.resultOptions.pixivShowMyMenu);
	showMyGroup(document, response.resultOptions.pixivShowMyGroup);
	showOfficialGroup(document, response.resultOptions.pixivShowOfficialGroup);
	showRecommendUser(document, response.resultOptions.pixivShowRecommendUser);
	showFollowing(document, response.resultOptions.pixivShowFollowing);
	showMyPixiv(document, response.resultOptions.pixivShowMyPixiv);
	showEvents(document, response.resultOptions.pixivShowEvents);
	
	showNewsTop(document, response.resultOptions.pixivShowNewsTop);
	showNewIllust(document, response.resultOptions.pixivShowNewIllust);
	showPopularTags(document, response.resultOptions.pixivShowPopularTags);
	showUserEvent(document, response.resultOptions.pixivShowUserEvent);
	showBookmarkNews(document, response.resultOptions.pixivShowBookmarkNews);
	showMyPixivNews(document, response.resultOptions.pixivShowMyPixivNews);
	
	showDailyRank(document, response.resultOptions.pixivShowDailyRank);
	showComicRank(document, response.resultOptions.pixivShowComicRank);
	showOtherRank(document, response.resultOptions.pixivShowOtherRank);
	showMaleRank(document, response.resultOptions.pixivShowMaleRank);
	showFemaleRank(document, response.resultOptions.pixivShowMaleRank);
	showRookieRank(document, response.resultOptions.pixivShowRookieRank);
	showDicRank(document, response.resultOptions.pixivShowDicRank);
	showOriginalRank(document, response.resultOptions.pixivShowOriginalRank);
	showNovelRank(document, response.resultOptions.pixivShowNovelRank);
	
	if (response.resultOptions.pixivOpenInNewTab)
		forceMemberIllustPageOpenInNewTab(document);
});


// 以降ユーティリティメソッド
	
// pixivロゴを表示する
function showLogo(node, on) {
	if (on) return;
	
	showWhereId(node, 'logoMap', 1, on);
	showWhereClass(node, 'link-item', 1, on);
	showWhereClass(node, 'link-item', 2, on);
	showWhereClass(node, 'link-item', 3, on);
	showWhereClass(node, 'ui-selectbox-container', 1, true);
	showWhereClass(node, 'category-list', 1, on);
	//showWhereClass(node, 'notifications', 1, on);
	
	//*[@class="layout-wrapper"/div[3]
	
	var xpath = '//*[contains(concat(" ",normalize-space(@class)," "), " ui-search ")]';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.bottom = 'auto';
		targetNode.snapshotItem(0).style.right = 'auto';
		targetNode.snapshotItem(0).style.left = '600px';
	}
	var xpath = '//*[contains(concat(" ",normalize-space(@class)," "), " navigation-list ")]';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.bottom = 'auto';
		targetNode.snapshotItem(0).style.right = 'auto';
		//targetNode.snapshotItem(0).style.z-index = '10';
	}
	var xpath = '//*[contains(concat(" ",normalize-space(@class)," "), " layout-wrapper ")]';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.height = '30px';
	}
}

function showMyProfile(node, on) { showWhereClass(node, 'my-profile-unit', 1, on); }// マイプロフィールを表示する
function showMyMenu(node, on) { showWhereClass(node, 'menu-unit', 1, on); }// マイメニューを表示する
function showMyGroup(node, on) { showWhereClass(node, 'group-list', 1, on); }// マイグループを表示する
function showOfficialGroup(node, on) { showWhereClass(node, 'group-list', 2, on); }// 公式グループを表示する
function showRecommendUser(node, on) { showWhereId(node, 'user-recommend-container', 1, on); }// おすすめユーザーを表示する
function showFollowing(node, on) { showWhereClass(node, 'following-unit', 1, on); }// フォロー中を表示する
function showMyPixiv(node, on) { showWhereClass(node, 'mypixiv-unit', 1, on); }// マイピクを表示する
function showEvents(node, on) { showAreaTitleParent(node, 'event.php', 1, on); }// イベントを表示する

function showNewsTop     (node, on) { showWhereClassParent(node, 'NewsTop', 1, on); } // お知らせを表示する
function showNewIllust   (node, on) { showWhereHasLinkContainer(node, '/new_illust.php', on); }// みんなの新着を表示する
function showPopularTags (node, on) { showWhereHasLinkContainer(node, '/tags.php', on); }// 注目のタグを表示する
function showUserEvent   (node, on) { showWhereHasLinkContainer(node, '/user_event.php', on); }// 企画目録を表示する
function showBookmarkNews(node, on) { showWhereHasLinkContainer(node, '/bookmark_new_illust.php', on); }// フォロー新着作品
function showMyPixivNews (node, on) { showWhereHasLinkContainer(node, '/mypixiv_new_illust.php', on); }// マイピク新着作品

// xxxランキングを表示する
function showDailyRank   (node, on) { showWhereClass(node, 'daily', 1, on); }
function showComicRank   (node, on) { showWhereClass(node, 'comic-container', 1, on); }
function showOtherRank   (node, on) { showWhereClass(node, 'other-ranking', 1, on); }
function showMaleRank    (node, on) { showWhereClass(node, 'male', 1, on); }
function showFemaleRank  (node, on) { showWhereClass(node, 'female', 1, on); }
function showRookieRank  (node, on) { showWhereClass(node, 'rookie', 1, on); }
function showDicRank     (node, on) { showWhereId(node, 'dic_ranking', 1, on); }
function showOriginalRank(node, on) { showWhereClass(node, 'original', 1, on); }
function showNovelRank   (node, on) { showWhereClass(node, 'daily-novel', 1, on); }

function showWhereClass(node, where, siblingIndex, on)
{
	if (on) return;
	
	var xpath = '//*[contains(concat(" ",normalize-space(@class)," "), " '+where+' ")]['+siblingIndex+']';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.display = 'none';
	}
}
function showWhereClassParent(node, where, siblingIndex, on)
{
	if (on) return;
	
	var xpath = '//*[contains(concat(" ",normalize-space(@class)," "), " '+where+' ")]['+siblingIndex+']';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).parentNode.style.display = 'none';
	}
}
function showWhereId(node, where, siblingIndex, on)
{
	if (on) return;
	
	var xpath = '//*[@id="'+where+'"]['+siblingIndex+']';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.display = 'none';
	}
}
function showWhereHasLinkContainer(node, href, on)
{
	var xpath = '//*[@id="item-container"]/section/header/h1/a[@href="'+href+'"]';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).parentNode.parentNode.parentNode.style.display = on?'block':'none';
	}
}
function showAreaTitleParent(node, href, siblingIndex, on)
{
	if (on) return;
	
	var xpath = '//*[@class="area_title"]/a[@href="'+href+'"]['+siblingIndex+']';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).parentNode.parentNode.style.display = 'none';
	}
}


// ページ中から追加場所を見つけてリストを追加する
function addCollectedPixivTags(node, options) {
	var xpath = (node == document)
		? './/*[@id="search-result"]'
		: './/li[contains(concat(" ",normalize-space(@class)," "), " image ")]'
		;
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		tagLists(node, targetNode, options);
		return;
	}
	
	if ( ! options.pixivApplyToAll)
		return;

	xpath = './/div[contains(concat(" ",normalize-space(@class)," "), " layout-body ")]';
	targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		tagLists(node, targetNode, options);
		return;
	}
	
	xpath = './/div[contains(concat(" ",normalize-space(@id)," "), " item-container ")]';
	targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		tagLists(node, targetNode, options);
		return;
	}
	
}

// ふたつのタグリストを表示
function tagLists(node, targetNode, options) {
	
	var complateDiv = complateTags(options);
	var partialDiv = partialTags(options);
	
	var tagListsDiv = document.createElement('div');
	tagListsDiv.className = 'tag_lists';
	tagListsDiv.style.overflow = 'hidden';
	if ( ! options.pixivShowTagList) { tagListsDiv.style.display = 'none'; }
	
	tagListsDiv.appendChild(complateDiv);
	tagListsDiv.appendChild(partialDiv);
	
	targetNode.snapshotItem(0).parentNode
		.insertBefore(tagListsDiv, targetNode.snapshotItem(0));
	
	$('#complateTagsOnOff').click(function(){
		if ($('#complateTags').css('display') == 'none') {
			$('#complateTags').css('display', 'inline-block');
			chrome.extension.sendRequest({　action : "showComplateTags"　}, function (response) {});
			$('#complateTagsOnOff').html('-たたむ');
		} else {
			$('#complateTags').css('display', 'none');
			chrome.extension.sendRequest({　action : "hideComplateTags"　}, function (response) {});
			$('#complateTagsOnOff').html('+ひらく');
		}
	});
	$('#partialTagsOnOff').click(function(){
		if ($('#partialTags').css('display') == 'none') {
			$('#partialTags').css('display', 'inline-block');
			chrome.extension.sendRequest({　action : "showPartialTags"　}, function (response) {});
			$('#partialTagsOnOff').html('-たたむ');
		} else {
			$('#partialTags').css('display', 'none');
			chrome.extension.sendRequest({　action : "hidePartialTags"　}, function (response) {});
			$('#partialTagsOnOff').html('+ひらく');
		}
	});
	
	/*
	$reg = $('<a/>',{
	'href': 'javascript:void(0)',
	'text': '[[タグリスト編集]]'
	}
	);
	$reg.clone().bind('click', function(){GM_config.open();}).appendTo('div.complete:last > span');
	$reg.clone().bind('click', function(){GM_config.open();}).appendTo('div.partial:last > span');
	 */
	
}

// 完全一致検索用のタグリストをDOM作成
function complateTags(options){
	
	var div = document.createElement('div');
	var onoff = document.createElement('div');
	var span = document.createElement('span');
	
	div.className = 'pixiv_tag_collector complete';
	div.id        = 'pixiv_tag_collector_complete_tags';
	
	onoff.id = 'complateTagsOnOff';
	onoff.className = 'taglistOnOff';
	onoff.innerText = (options.pixivShowCompleteTags) ? '-たたむ':'+ひらく';
	
	span.id = 'complateTags';
	span.className = 'taglist';
	if ( ! options.pixivShowCompleteTags) { span.style.display = 'none'; }
	
	var node = document.createDocumentFragment();
	for (var i = 0; i < options.pixivCompleteTags.length; i++) {
		var newA = document.createElement('a');
		newA.href = 'http://www.pixiv.net/search.php?s_mode=s_tag_full&word='
				+ encodeURIComponent(options.pixivCompleteTags[i]);
		newA.appendChild(document.createTextNode(options.pixivCompleteTags[i]));
		node.appendChild(newA);
	}
	span.appendChild(node);
	
	div.appendChild(onoff);
	div.appendChild(span);
	
	return div;
}

// 部分一致/AND/OR/マイナス検索用のタグリストをDOM作成
function partialTags(options){
	
	var div = document.createElement('div');
	var onoff = document.createElement('div');
	var span = document.createElement('span');
	
	div.id        = 'pixiv_tag_collector_partial_tags';
	div.className = 'pixiv_tag_collector partial';
	
	onoff.id = 'partialTagsOnOff';
	onoff.className = 'taglistOnOff';
	onoff.innerText = (options.pixivShowPartialTags) ? '-たたむ':'+ひらく';
	
	span.id = 'partialTags';
	span.className = 'taglist';
	if ( ! options.pixivShowPartialTags) { span.style.display = 'none'; }
	
	var pattern = /(-{2,})+(\d{1,})$/;
	var node = document.createDocumentFragment();
	
	for (var i = 0; i < options.pixivPartialTags.length; i++) {
		
		var word = options.pixivPartialTags[i];
		
		var newA = document.createElement('a');
		newA.title = word.replace(pattern, ''); // TODO: ?
		newA.href = 'http://www.pixiv.net/search.php?s_mode=s_tag&word='
				+ encodeURIComponent(word)
					.replace(/%20/g, '+')
					.replace(pattern, '')
					.replace(/[+-]$/, '')
				+ '&s_mode=s_tag';
		
		if (word.match(pattern)) {
			var partword
				= RegExp.$2 < (word.length - RegExp.lastMatch.length + 1)
					? word.slice(0,   RegExp.$2) + '...'
					: word.slice(0, - RegExp.lastMatch.length - 1) ;
			newA.appendChild(document.createTextNode(partword));
		} else {
			newA.appendChild(document.createTextNode(word));
		}
		node.appendChild(newA);
	}
	span.appendChild(node);
	
	div.appendChild(onoff);
	div.appendChild(span);
	
	return div;
}

// デッドラインを表示する
function addDeadLineList(node, options) {
	
	var xpath = (node == document)
		? './/*[@id="search-result"]'
		: './/li[contains(concat(" ",normalize-space(@class)," "), " image ")]'
		;
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		deadLines(node, targetNode, options);
		return;
	}
	
	if ( ! options.pixivApplyToAll)
		return;

	xpath = './/div[contains(concat(" ",normalize-space(@class)," "), " layout-body ")]';
	targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		deadLines(node, targetNode, options);
		return;
	}
	
	xpath = './/div[contains(concat(" ",normalize-space(@id)," "), " item-container ")]';
	targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		deadLines(node, targetNode, options);
		return;
	}

}

function deadLines(node, targetNode, options) {
	
	var node = document.createDocumentFragment();
	for (var i = 1; i <= 3; i++) {
		if (options['pixivDeadLines'+i+'Name'] !== ""){
		}else{
			continue;
		}
		var deadLine = document.createElement('div');
		deadLine.className = 'pixiv_tag_collector deadline';
		deadLine.id        = 'pixiv_tag_collector_deadline'+i;
		deadLine.innerHTML
			= '<STRONG>'+options['pixivDeadLines'+i+'Name'] + '</STRONG> の締め切りは「 <STRONG>'
			+ ("0"+options['pixivDeadLines'+i+'Y' ]).slice(-2) + '/'
			+ ("0"+options['pixivDeadLines'+i+'M' ]).slice(-2) + '/'
			+ ("0"+options['pixivDeadLines'+i+'D' ]).slice(-2) + '　'
			+ ("0"+options['pixivDeadLines'+i+'HH']).slice(-2) + ':'
			+ ("0"+options['pixivDeadLines'+i+'MM']).slice(-2) 
			+ '</STRONG> 」です。';
		node.appendChild(deadLine);
	}
	
	var div = document.createElement('div');
	div.id        = 'pixiv_tag_collector_deadline_list';
	div.className = 'tag_lists';
	div.style.overflow = 'hidden';
	div.appendChild(node);
	targetNode.snapshotItem(0).parentNode
		.insertBefore(div, targetNode.snapshotItem(0));
}


// 個別イラストページへのリンクを常に新しいタブで開くように設定
function forceMemberIllustPageOpenInNewTab(node) {
	var xpath = './/a[contains(@href, "member_illust.php?mode=medium")]';
	var memberIllustPageAnchors = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (memberIllustPageAnchors.snapshotLength > 0) {
		for (var i = 0; i < memberIllustPageAnchors.snapshotLength; i++) {
			memberIllustPageAnchors.snapshotItem(i).target = "_blank";
		}
	}
}

