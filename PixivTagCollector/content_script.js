
// tagCollector がpixiv.netドメイン以下のページの表示毎に実行する処理
'use strict';

// PixivTagCollector用のスタイルシートを加える
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('css/style_ptc.css');
(document.head || document.documentElement).appendChild(style);

// 現在地パスを取得して前後のスラッシュと.phpを削除
var pathname = location.pathname.replace(/(\.php|^\/|\/$)/g, '');
if(pathname.length === 0) pathname = 'mypage';
// console.log('pathname='+pathname); // debug

//PixivTagCollectorのタグ一覧表示を Ctrl+Q でトグルできるように。
document.addEventListener("keydown", function (e) {
	var tl = $('.pixiv_tag_collector');
	if (e.ctrlKey && e.keyCode == 81) {
		if (tl.is(':hidden')) {
			tl.show();
			chrome.extension.sendRequest({ action : "showTagList" }, function (response) {});
		} else {
			tl.hide();
			chrome.extension.sendRequest({ action : "hideTagList" }, function (response) {});
		}
	}
}, true);


var autopageCallback = function(e) {
	chrome.extension.sendRequest({
		action : "getOptions"
	}, function (response) {

		var o = response.resultOptions;
		if (o === null)
			return;

		//sendRequestのcallbackがまとめて来るようなのでdocumentから探します。
		var node = document;

		//autoページャーなのでタグリストなんかはすでに表示されているものと想定します。
		applySearchNGWords(node,o);

		if (o.pixivOpenInNewTab)
			forceMemberIllustPageOpenInNewTab(node);
		if (o.pixivBookmarkLink)
			forceBookmarkDetailLink(node);
	});
};
document.body.addEventListener('AutoPagerize_DOMNodeInserted', autopageCallback, false); // AutoPagerize対応
document.body.addEventListener('AutoPatchWork.DOMNodeInserted', autopageCallback, false); // AutoPatchwork対応


// 画面にタグ一覧を追加する（これがメインの処理）
collectPixivTags(document);

// このスクリプトの処理はここで終わり。以降メソッド




// 画面にタグ一覧を追加する（これがメインの処理）
// background.jsにオプションを問い合わせて、返答があれば追加する
function collectPixivTags(node) {

	chrome.extension.sendRequest({
		action : "getOptions"
	}, function (response) {

		var o = response.resultOptions;
		if (o === null)
			return;

		addDeadLineList(node, o);
		addCollectedPixivTags(node, o);
		applySearchNGWords(node,o);

		showLogo(node, o.pixivShowLogo);

		showMyProfile(node, o.pixivShowMyProfile);
		showMyMenu(node, o.pixivShowMyMenu);
		showMyGroup(node, o.pixivShowMyGroup);
		showOfficialGroup(node, o.pixivShowOfficialGroup);
		showRecommendUser(node, o.pixivShowRecommendUser);
		showFollowing(node, o.pixivShowFollowing);
		showMyPixiv(node, o.pixivShowMyPixiv);
		showEvents(node, o.pixivShowEvents);

		showNewsTop(node, o.pixivShowNewsTop);
		showNewIllust(node, o.pixivShowNewIllust);
		showPopularTags(node, o.pixivShowPopularTags);
		showUserEvent(node, o.pixivShowUserEvent);
		showBookmarkNews(node, o.pixivShowBookmarkNews);
		showMyPixivNews(node, o.pixivShowMyPixivNews);

		showDailyRank(node, o.pixivShowDailyRank);
		showComicRank(node, o.pixivShowComicRank);
		showOtherRank(node, o.pixivShowOtherRank);
		showMaleRank(node, o.pixivShowMaleRank);
		showFemaleRank(node, o.pixivShowMaleRank);
		showRookieRank(node, o.pixivShowRookieRank);
		showDicRank(node, o.pixivShowDicRank);
		showOriginalRank(node, o.pixivShowOriginalRank);
		showNovelRank(node, o.pixivShowNovelRank);
		showUgoiraRank(node, o.pixivShowUgoiraRank);

		if (o.pixivOpenInNewTab)
			forceMemberIllustPageOpenInNewTab(node);
		if (o.pixivBookmarkLink)
			forceBookmarkDetailLink(node);
		
		var flt = o.pixivFilterAlways;
		if(flt.length > 0){
			// 検索ボックスsubmitイベント発火時に検索条件を追加
			$('#suggest-container').submit(function(e){
				var box = $('#suggest-input');
				var q = box.val();
				if(q.indexOf(flt) < 0){
					if(q.match(/[ 　]/)){
						q = '('+q+')';
					}
					q += ' '+flt;
					// alert(q);
					box.val(q);
				}
			});
			
			// 作品ページタグ一覧と検索結果関連タグのリンク先に検索条件を追加
			var parent = '';
			if(pathname == 'search'){
				parent = '.column-related';
			}else if(pathname == 'member_illust'){
				parent = '.tags-container';
			}
			if(parent.length > 0){
				var tags = $(parent).find('a.text');
				if(tags.length > 0){
					tags.each(function(i, e){
						e.setAttribute('href', '/search.php?s_mode=s_tag&word='+encodeURI(e.innerText+' '+flt));
					});
				}
			}
		}
	});
}


// pixivロゴを表示する
function showLogo(node, on) {
	if (on) return;

	showWhereClass(node, 'title', 1, on);
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
	xpath = '//*[contains(concat(" ",normalize-space(@class)," "), " navigation-list ")]';
	targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.bottom = 'auto';
		targetNode.snapshotItem(0).style.right = 'auto';
		//targetNode.snapshotItem(0).style.z-index = '10';
	}
	xpath = '//*[contains(concat(" ",normalize-space(@class)," "), " layout-wrapper ")]';
	targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.height = '30px';
	}
	xpath = '//*[@id="header-banner"]';
	targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.position = 'static';
	}
	xpath = '//header/*/*[contains(concat(" ",normalize-space(@class)," "), " ad ")]';
	targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.height = '0px';
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
function showDicRank     (node, on) { showWhereClass(node, 'dic-ranking', 1, on); }
function showOriginalRank(node, on) { showWhereClass(node, 'original', 1, on); }
function showNovelRank   (node, on) { showWhereClass(node, 'daily-novel', 1, on); }
function showUgoiraRank  (node, on) { showWhereClass(node, 'daily', 2, on); }

function showWhereClass(node, where, siblingIndex, on) {
	if (on) return;

	var xpath = '//*[contains(concat(" ",normalize-space(@class)," "), " '+where+' ")]['+siblingIndex+']';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.display = 'none';
	}
}
function showWhereClassParent(node, where, siblingIndex, on) {
	if (on) return;

	var xpath = '//*[contains(concat(" ",normalize-space(@class)," "), " '+where+' ")]['+siblingIndex+']';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).parentNode.style.display = 'none';
	}
}
function showWhereId(node, where, siblingIndex, on) {
	if (on) return;

	var xpath = '//*[@id="'+where+'"]['+siblingIndex+']';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.display = 'none';
	}
}
function showWhereHasLinkContainer(node, href, on) {
	var xpath = '//*[@id="item-container"]/section/header/h1/a[@href="'+href+'"]';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).parentNode.parentNode.parentNode.style.display = on?'block':'none';
	}
}
function showAreaTitleParent(node, href, siblingIndex, on) {
	if (on) return;

	var xpath = '//*[@class="area_title"]/a[@href="'+href+'"]['+siblingIndex+']';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).parentNode.parentNode.style.display = 'none';
	}
}

// ページ中から追加場所を見つけてDOMを追加する
function addToPixivPages(node, options, func) {
	var xpath = null;
	switch(pathname) {
		case 'search':
		case 'ranking':
		case 'novel/tags':
			xpath = (node == document)
				? './/div[contains(concat(" ",normalize-space(@class)," "), " layout-body ")]'
				: './/li[contains(concat(" ",normalize-space(@class)," "), " image-item ")]'
				;
			break;
		case 'mypage': // マイページ
			xpath = './/div[contains(concat(" ",normalize-space(@class)," "), " contents-east ")]';
			break;
		case 'member': // プロフィール
		case 'member_illust': // 作品管理、作品詳細
		case 'bookmark': // ブックマーク
		case 'novel/member': // 小説作品詳細
		case 'novel/bookmark': // 小説のブックマーク
			xpath = './/div[contains(concat(" ",normalize-space(@class)," "), " layout-a ")]';
			break;
		case 'novel': // 小説(トップ)
		case 'event': // イベント一覧
		case 'stacc': // フィード(スタック)
		case 'event_detail': // イベント詳細
			xpath = './/div[contains(concat(" ",normalize-space(@id)," "), " contents ")]';
			break;
		case 'profile_event': // イベント管理
			xpath = './/div[contains(concat(" ",normalize-space(@class)," "), " eventHeader ")]';
			break;
		case 'cate_r18':
			xpath = './/div[contains(concat(" ",normalize-space(@id)," "), " page-mypage-r18 ")]';
			break;
		default: // いずれにも当てはまらないとき
			xpath = './/div[contains(concat(" ",normalize-space(@class)," "), " layout-body ")]';
	}
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		func(node, options, targetNode);
	}
}


// ページ中から追加場所を見つけてリストを追加する
function addCollectedPixivTags(node, options) {
	addToPixivPages(node,options,tagLists);
}

// ふたつのタグリストを表示
function tagLists(node, options, targetNode) {

	var completeDiv = completeTags(options);
	var partialDiv = partialTags(options);
	var captionDiv = captionTags(options);

	var tagListsDiv = document.createElement('div');
	tagListsDiv.className = 'pixiv_tag_collector';
	if ( ! options.pixivShowTagList) { tagListsDiv.style.display = 'none'; }

	tagListsDiv.appendChild(completeDiv);
	tagListsDiv.appendChild(partialDiv);
	tagListsDiv.appendChild(captionDiv);

	targetNode.snapshotItem(0).parentNode
		.insertBefore(tagListsDiv, targetNode.snapshotItem(0));

	$('#completeTagsOnOff').click(function(){
		var tags = $('#completeTags');
		var onoff = $('#completeTagsOnOff');
		if (tags.is(':hidden')) {
			tags.css('display', 'inline');
			chrome.extension.sendRequest({ action : "showComplateTags" }, function (response) {});
			onoff.html('-');
		} else {
			tags.hide();
			chrome.extension.sendRequest({ action : "hideComplateTags" }, function (response) {});
			onoff.html('+');
		}
	});
	$('#partialTagsOnOff').click(function(){
		var tags = $('#partialTags');
		var onoff = $('#partialTagsOnOff');
		if (tags.is(':hidden')) {
			tags.css('display', 'inline');
			chrome.extension.sendRequest({ action : "showPartialTags" }, function (response) {});
			$('#partialTagsOnOff').html('-');
		} else {
			tags.hide();
			chrome.extension.sendRequest({ action : "hidePartialTags" }, function (response) {});
			onoff.html('+');
		}
	});
	$('#captionTagsOnOff').click(function(){
		var tags = $('#captionTags');
		var onoff = $('#captionTagsOnOff');
		if (tags.is(':hidden')) {
			tags.css('display', 'inline');
			chrome.extension.sendRequest({ action : "showCaptionTags" }, function (response) {});
			$('#captionTagsOnOff').html('-');
		} else {
			tags.hide();
			chrome.extension.sendRequest({ action : "hideCaptionTags" }, function (response) {});
			onoff.html('+');
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
function completeTags(options){
	var taglist_outer = document.createElement('div');
	var onoff = document.createElement('div');
	var taglist = document.createElement('div');

	taglist_outer.id        = 'pixiv_tag_collector_complete_tags';
	taglist_outer.className = 'taglist';

	onoff.id = 'completeTagsOnOff';
	onoff.className = 'taglistOnOff';
	onoff.innerText = (options.pixivShowCompleteTags) ? '-':'+';

	taglist.id = 'completeTags';

	if ( ! options.pixivShowCompleteTags) { taglist.style.display = 'none'; }

	var node = document.createDocumentFragment();
	for (var i = 0; i < options.pixivCompleteTags.length; i++) {
		var newA = document.createElement('a');
		newA.href = 'http://www.pixiv.net/search.php?s_mode=s_tag_full&word='
				+ encodeURIComponent(options.pixivCompleteTags[i]);
		newA.appendChild(document.createTextNode(options.pixivCompleteTags[i]));
		node.appendChild(newA);
	}
	taglist.appendChild(node);

	taglist_outer.appendChild(onoff);
	taglist_outer.appendChild(taglist);

	return taglist_outer;
}

// 部分一致/AND/OR/マイナス検索用のタグリストをDOM作成
function partialTags(options){
	var taglist_outer = document.createElement('div');
	var onoff = document.createElement('div');
	var taglist = document.createElement('div');

	taglist_outer.id        = 'pixiv_tag_collector_partial_tags';
	taglist_outer.className = 'taglist';

	onoff.id = 'partialTagsOnOff';
	onoff.className = 'taglistOnOff';
	onoff.innerText = (options.pixivShowPartialTags) ? '-':'+';

	taglist.id = 'partialTags';

	if ( ! options.pixivShowPartialTags) { taglist.style.display = 'none'; }

	var pattern = /(-{2,})+(\d{1,})$/;
	var node = document.createDocumentFragment();

	for (var i = 0; i < options.pixivPartialTags.length; i++) {
		var word = options.pixivPartialTags[i];

		var newA = document.createElement('a');
		newA.title = word; // title属性付与(マウスオンで省略前の検索キーワードが見える)
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
	taglist.appendChild(node);

	taglist_outer.appendChild(onoff);
	taglist_outer.appendChild(taglist);

	return taglist_outer;
}

// キャプション検索用のタグリストをDOM作成
function captionTags(options){
	var taglist_outer = document.createElement('div');
	var onoff = document.createElement('div');
	var taglist = document.createElement('div');

	taglist_outer.id = 'pixiv_tag_collector_caption_tags';
	taglist_outer.className = 'taglist';

	onoff.id = 'captionTagsOnOff';
	onoff.className = 'taglistOnOff';
	onoff.innerText = (options.pixivShowCaptionTags) ? '-':'+';

	taglist.id = 'captionTags';

	if ( ! options.pixivShowCaptionTags) { taglist.style.display = 'none'; }

	var pattern = /(-{2,})+(\d{1,})$/;
	var node = document.createDocumentFragment();

	for (var i = 0; i < options.pixivCaptionSearchName.length; i++) {
		var name = options.pixivCaptionSearchName[i];
		var word = options.pixivCaptionSearchWord[i];

		var newA = document.createElement('a');
		newA.title = name; // title属性付与(マウスオンで省略前の検索キーワードが見える)
		newA.href = 'http://www.pixiv.net/search.php?s_mode=s_tc&word='
				+ encodeURIComponent(word)
					.replace(/%20/g, '+')
					.replace(pattern, '')
					.replace(/[+-]$/, '')
				;

		if (name.match(pattern)) {
			var partword
				= RegExp.$2 < (name.length - RegExp.lastMatch.length + 1)
					? name.slice(0,   RegExp.$2) + '...'
					: name.slice(0, - RegExp.lastMatch.length - 1) ;
			newA.appendChild(document.createTextNode(partword));
		} else {
			newA.appendChild(document.createTextNode(name));
		}
		node.appendChild(newA);
	}
	taglist.appendChild(node);

	taglist_outer.appendChild(onoff);
	taglist_outer.appendChild(taglist);

	return taglist_outer;
}

// デッドラインを表示する
function addDeadLineList(node, options) {
	if(options.pixivDeadLineName.length !== 0){
		addToPixivPages(node,options,deadLines);
	}
}

// デッドラインリストをDOM作成
function deadLines(node, options, targetNode) {

	var deadLines_outer = document.createElement('ul');
	deadLines_outer.id        = 'pixiv_tag_collector_deadline_list';
	deadLines_outer.className = 'pixiv_tag_collector';

	for (var i = 0; i < options.pixivDeadLineName.length; i++) {
		if(options.pixivDeadLineName[i] === '') {
			continue;
		}

		var now = new Date(); //現在の日時を取得
		var dl  = new Date(options.pixivDeadLineDate[i] + ', ' + options.pixivDeadLineTime[i]); //〆切をセット
		var diff = dl - now;
		var times = 24 * 60 * 60 * 1000;
		var day   = Math.floor(diff / times);
		var hour  = Math.floor(diff % times / (60 * 60 * 1000));
		var min   = Math.floor(diff % times / (60 * 1000)) % 60;
		var notice = '';

		var deadLine = document.createElement('li');
		deadLine.id        = 'pixiv_tag_collector_deadline'+i;
		deadLine.className = 'deadline';

		if(diff > 0) {
			notice += 'あと';
			if(hour === 0 && day === 0) {
				notice += min + '分です。';
			} else if(day === 0) {
				notice += hour + '時間' + min + '分です。';
			} else {
				notice += day + '日と' + hour + '時間' + min + '分です。';
			}
		} else {
			notice += '〆切を過ぎました。';
		}
		if(diff < times * 7) {
			deadLine.className = 'deadline deadline-yabai';
		}

		var title = options.pixivDeadLineName[i];
		if(options.pixivDeadLineUrl[i] !== ""){
			title = '<a href="' + options.pixivDeadLineUrl[i] + '">' + title + '</a>';
		}
		deadLine.innerHTML
			= title + ' の〆切は <span class="deadline-date">'
			+ options.pixivDeadLineDate[i] + ' ' + options.pixivDeadLineTime[i]
			+ '</span> です。' + notice;
		deadLines_outer.appendChild(deadLine);
	}
	targetNode.snapshotItem(0).parentNode
		.insertBefore(deadLines_outer, targetNode.snapshotItem(0));
}

// 検索結果からNGワードを探して画像を非表示
// ページ中から追加場所を見つけてリストを追加する
String.prototype.replaceAll = function (org, dest){
	return this.split(org).join(dest);
};
function applySearchNGWords(node, options) {
	if (pathname === null || pathname !== 'search') return;
	var xpath = './/*[contains(concat(" ",normalize-space(@class)," "), " image-item ")]';
	var targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var i;
	for (i = 0; i < targetNode.snapshotLength; ++i) {
		var text = targetNode.snapshotItem(i).textContent;
		var w;
		for (w = 0; w < options.pixivSearchNGWords.length; ++w) {
			if (text.match(options.pixivSearchNGWords[w])){
				targetNode.snapshotItem(i).innerHTML =
					targetNode.snapshotItem(i).innerHTML.replaceAll(options.pixivSearchNGWords[w],'***');
				targetNode.snapshotItem(i).firstChild.firstChild.style.display = 'none';
				break;
			}
		}
	}
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


// ブックマーク詳細ページのブックマークしているユーザのリンク先をそのユーザの作品一覧に変更する
function forceBookmarkDetailLink(node) {
	if (pathname.indexOf('bookmark_detail') > -1) {
			$('.bookmark-item').find('a.user').each(function(){
				var a = $(this).attr('href');
				$(this).attr({href: a.replace(/\/bookmark/, "/member_illust")});
			});
	}
}

