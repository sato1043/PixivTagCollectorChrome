require('debug').enable(__DEBUG_LOG_MASK__);
const debug = require('debug')(`${__APP_NAME__}:background`);

// tagCollector がpixiv.netドメイン以下のページの表示毎に実行する処理

// PixivTagCollector用のスタイルシートを加える
require('src/css/style_ptc.css');

// 現在地パスを取得して前後のスラッシュと.phpを削除
let pathname = location.pathname.replace(/(\.php|^\/|\/$)/g, '');
if (pathname.length === 0) {
	pathname = 'mypage';
}
debug('PTCC:content_script: pathname=', pathname);

// PixivTagCollectorのタグ一覧表示を Ctrl+Q でトグルできるように。
document.addEventListener('keydown', function (e) {
	const tl = $('.pixiv_tag_collector');
	if (e.ctrlKey && e.keyCode === 81) {
		if (tl.is(':hidden')) {
			tl.show();
			chrome.runtime.sendMessage({action: 'showTagList'});
		} else {
			tl.hide();
			chrome.runtime.sendMessage({action: 'hideTagList'});
		}
	}
}, true);

// AutoPatchworkプラグインで動くように。
const autopageCallback = function () {
	chrome.runtime.sendMessage({action: 'getOptions'}, function (response) {
		const o = response.resultOptions;
		if (o === null) {
			return;
		}

		// sendRequestのcallbackがまとめて来るようなのでdocumentから探します。
		const node = document;

		// autoページャーなのでタグリストなんかはすでに表示されているものと想定します。
		applySearchNGWords(node, o); // eslint-disable-line no-use-before-define

		if (o.pixivOpenInNewTab) {
			forceMemberIllustPageOpenInNewTab(node); // eslint-disable-line no-use-before-define
		}
		if (o.pixivBookmarkLink) {
			forceBookmarkDetailLink(node); // eslint-disable-line no-use-before-define
		}
	});
};
document.body.addEventListener('AutoPagerize_DOMNodeInserted', autopageCallback, false); // AutoPagerize対応
document.body.addEventListener('AutoPatchWork.DOMNodeInserted', autopageCallback, false); // AutoPatchwork対応


// 画面にタグ一覧を追加する（これがメインの処理）
collectPixivTags(document); // eslint-disable-line no-use-before-define

// このスクリプトの処理はここで終わり。以降メソッド


// 画面にタグ一覧を追加する（これがメインの処理）
// background.jsにオプションを問い合わせて、返答があれば追加する
function collectPixivTags(node) {
	chrome.runtime.sendMessage({action: 'getOptions'}, function (response) {
		const o = response.resultOptions;
		if (o === null) {
			return;
		}

		/* eslint-disable no-use-before-define */
		addDeadLineList(node, o);
		addCollectedPixivTags(node, o);
		applySearchNGWords(node, o);

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

		if (o.pixivOpenInNewTab) {
			forceMemberIllustPageOpenInNewTab(node);
		}
		if (o.pixivBookmarkLink) {
			forceBookmarkDetailLink(node);
		}
		/* eslint-enable no-use-before-define */

		const flt = o.pixivFilterAlways;
		if (o.pixivDoFilterAlways && flt.length > 0) {
			// 検索ボックスsubmitイベント発火時に検索条件を追加
			$('#suggest-container').submit(function () {
				const box = $('#suggest-input');
				let q = box.val();
				if (q.indexOf(flt) < 0) {
					if (q.match(/[ 　]/)) {
						q = '(' + q + ')';
					}
					q += ' ' + flt;
					// alert(q);
					box.val(q);
				}
			});

			// 作品ページタグ一覧と検索結果関連タグのリンク先に検索条件を追加
			let parent = '';
			if (pathname === 'search') {
				parent = '.column-related';
			} else if (pathname === 'member_illust') {
				parent = '.tags-container';
			}
			if (parent.length > 0) {
				const tags = $(parent).find('a.text');
				if (tags.length > 0) {
					tags.each(function (i, e) {
						e.setAttribute('href', '/search.php?s_mode=s_tag&word=' + encodeURI(e.innerText + ' ' + flt));
					});
				}
			}
		}
	});
}


// pixivロゴを表示する
function showLogo(node, on) {
	if (on) {
		return;
	}

	/* eslint-disable no-use-before-define */
	showWhereClass(node, 'title', 1, on);
	showWhereId(node, 'logoMap', 1, on);
	showWhereClass(node, 'link-item', 1, on);
	showWhereClass(node, 'link-item', 2, on);
	showWhereClass(node, 'link-item', 3, on);
	showWhereClass(node, 'ui-selectbox-container', 1, true);
	showWhereClass(node, 'category-list', 1, on);
	// showWhereClass(node, 'notifications', 1, on);
	/* eslint-enable no-use-before-define */

	// *[@class="layout-wrapper"/div[3]

	let xpath = '//*[contains(concat(" ",normalize-space(@class)," "), " ui-search ")]';
	let targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
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
		// targetNode.snapshotItem(0).style.z-index = '10';
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

/* eslint-disable no-use-before-define, no-multi-spaces, space-before-function-paren, no-spaced-func */
function showMyProfile    (node, on) { showWhereClass(node, 'my-profile-unit', 1, on) }// マイプロフィールを表示する
function showMyMenu       (node, on) { showWhereClass(node, 'menu-unit', 1, on) }// マイメニューを表示する
function showMyGroup      (node, on) { showWhereClass(node, 'group-list', 1, on) }// マイグループを表示する
function showOfficialGroup(node, on) { showWhereClass(node, 'group-list', 2, on) }// 公式グループを表示する
function showRecommendUser(node, on) { showWhereId   (node, 'user-recommend-container', 1, on) }// おすすめユーザーを表示する
function showFollowing    (node, on) { showWhereClass(node, 'following-unit', 1, on) }// フォロー中を表示する
function showMyPixiv      (node, on) { showWhereClass(node, 'mypixiv-unit', 1, on) }// マイピクを表示する
function showEvents       (node, on) { showAreaTitleParent(node, 'event.php', 1, on) }// イベントを表示する

function showNewsTop     (node, on) { showWhereClassParent(node, 'NewsTop', 1, on) } // お知らせを表示する
function showNewIllust   (node, on) { showWhereHasLinkContainer(node, '/new_illust.php', on) }// みんなの新着を表示する
function showPopularTags (node, on) { showWhereHasLinkContainer(node, '/tags.php', on) }// 注目のタグを表示する
function showUserEvent   (node, on) { showWhereHasLinkContainer(node, '/user_event.php', on) }// 企画目録を表示する
function showBookmarkNews(node, on) { showWhereHasLinkContainer(node, '/bookmark_new_illust.php', on) }// フォロー新着作品
function showMyPixivNews (node, on) { showWhereHasLinkContainer(node, '/mypixiv_new_illust.php', on) }// マイピク新着作品

// xxxランキングを表示する
function showDailyRank   (node, on) { showWhereClass(node, 'daily', 1, on) }
function showComicRank   (node, on) { showWhereClass(node, 'comic-container', 1, on) }
function showOtherRank   (node, on) { showWhereClass(node, 'other-ranking', 1, on) }
function showMaleRank    (node, on) { showWhereClass(node, 'male', 1, on) }
function showFemaleRank  (node, on) { showWhereClass(node, 'female', 1, on) }
function showRookieRank  (node, on) { showWhereClass(node, 'rookie', 1, on) }
function showDicRank     (node, on) { showWhereClass(node, 'dic-ranking', 1, on) }
function showOriginalRank(node, on) { showWhereClass(node, 'original', 1, on) }
function showNovelRank   (node, on) { showWhereClass(node, 'daily-novel', 1, on) }
function showUgoiraRank  (node, on) { showWhereClass(node, 'daily', 2, on) }
/* eslint-enable no-use-before-define, no-multi-spaces, space-before-function-paren */

// 表示ON/OFFのためのユーティリティ
function showWhereClass(node, where, siblingIndex, on) {
	if (on) {
		return;
	}
	const xpath = '//*[contains(concat(" ",normalize-space(@class)," "), " ' + where + ' ")][' + siblingIndex + ']';
	const targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.display = 'none';
	}
}
function showWhereClassParent(node, where, siblingIndex, on) {
	if (on) {
		return;
	}
	const xpath = '//*[contains(concat(" ",normalize-space(@class)," "), " ' + where + ' ")][' + siblingIndex + ']';
	const targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).parentNode.style.display = 'none';
	}
}
function showWhereId(node, where, siblingIndex, on) {
	if (on) {
		return;
	}

	const xpath = '//*[@id="' + where + '"][' + siblingIndex + ']';
	const targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).style.display = 'none';
	}
}
function showWhereHasLinkContainer(node, href, on) {
	const xpath = '//*[@id="item-container"]/section/header/h1/a[@href="' + href + '"]';
	const targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).parentNode.parentNode.parentNode.style.display = on ? 'block' : 'none';
	}
}
function showAreaTitleParent(node, href, siblingIndex, on) {
	if (on) {
		return;
	}

	const xpath = '//*[@class="area_title"]/a[@href="' + href + '"][' + siblingIndex + ']';
	const targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		targetNode.snapshotItem(0).parentNode.parentNode.style.display = 'none';
	}
}

// ページ中から追加場所を見つけてDOMを追加する
function addToPixivPages(node, options, func) {
	let xpath = null;
	switch (pathname) {
	case 'search':
	case 'ranking':
	case 'novel/tags':
		xpath = (node === document)
			? './/div[contains(concat(" ",normalize-space(@class)," "), " layout-body ")]'
			: './/li[contains(concat(" ",normalize-space(@class)," "), " image-item ")]';
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
	const targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (targetNode.snapshotLength > 0) {
		func(node, options, targetNode);
	}
}


// ページ中から追加場所を見つけてリストを追加する
function addCollectedPixivTags(node, options) {
	addToPixivPages(node, options, tagLists); // eslint-disable-line no-use-before-define
}

// ふたつのタグリストを表示
function tagLists(node, options, targetNode) {
	const completeDiv = completeTags(options); // eslint-disable-line no-use-before-define
	const partialDiv = partialTags(options); // eslint-disable-line no-use-before-define
	const captionDiv = captionTags(options); // eslint-disable-line no-use-before-define

	const tagListsDiv = document.createElement('div');
	tagListsDiv.className = 'pixiv_tag_collector';
	if (!options.pixivShowTagList) {
		tagListsDiv.style.display = 'none';
	}

	tagListsDiv.appendChild(completeDiv);
	tagListsDiv.appendChild(partialDiv);
	tagListsDiv.appendChild(captionDiv);

	targetNode.snapshotItem(0).parentNode
		.insertBefore(tagListsDiv, targetNode.snapshotItem(0));

	$('#completeTagsOnOff').click(function () {
		const tags = $('#completeTags');
		const onoff = $('#completeTagsOnOff');
		if (tags.is(':hidden')) {
			tags.css('display', 'inline');
			onoff.html('-');
			chrome.runtime.sendMessage({action: 'showComplateTags'});
		} else {
			tags.hide();
			onoff.html('+');
			chrome.runtime.sendMessage({action: 'hideComplateTags'});
		}
	});
	$('#partialTagsOnOff').click(function () {
		const tags = $('#partialTags');
		const onoff = $('#partialTagsOnOff');
		if (tags.is(':hidden')) {
			tags.css('display', 'inline');
			$('#partialTagsOnOff').html('-');
			chrome.runtime.sendMessage({action: 'showPartialTags'});
		} else {
			tags.hide();
			onoff.html('+');
			chrome.runtime.sendMessage({action: 'hidePartialTags'});
		}
	});
	$('#captionTagsOnOff').click(function () {
		const tags = $('#captionTags');
		const onoff = $('#captionTagsOnOff');
		if (tags.is(':hidden')) {
			tags.css('display', 'inline');
			$('#captionTagsOnOff').html('-');
			chrome.runtime.sendMessage({action: 'showCaptionTags'});
		} else {
			tags.hide();
			onoff.html('+');
			chrome.runtime.sendMessage({action: 'hideCaptionTags'});
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
function completeTags(options) {
	const taglistOuter = document.createElement('div');
	const onoff = document.createElement('div');
	const taglist = document.createElement('div');

	taglistOuter.id = 'pixiv_tag_collector_complete_tags';
	taglistOuter.className = 'taglist';

	onoff.id = 'completeTagsOnOff';
	onoff.className = 'taglistOnOff';
	onoff.innerText = (options.pixivShowCompleteTags) ? '-' : '+';

	taglist.id = 'completeTags';

	if (!options.pixivShowCompleteTags) {
		taglist.style.display = 'none';
	}

	const node = document.createDocumentFragment();
	for (let i = 0; i < options.pixivCompleteTags.length; i++) {
		const newA = document.createElement('a');
		newA.href = 'http://www.pixiv.net/search.php?s_mode=s_tag_full&word=' +
			encodeURIComponent(options.pixivCompleteTags[i]);
		newA.appendChild(document.createTextNode(options.pixivCompleteTags[i]));
		node.appendChild(newA);
	}
	taglist.appendChild(node);

	taglistOuter.appendChild(onoff);
	taglistOuter.appendChild(taglist);

	return taglistOuter;
}

// 部分一致/AND/OR/マイナス検索用のタグリストをDOM作成
function partialTags(options) {
	const taglistOuter = document.createElement('div');
	const onoff = document.createElement('div');
	const taglist = document.createElement('div');

	taglistOuter.id = 'pixiv_tag_collector_partial_tags';
	taglistOuter.className = 'taglist';

	onoff.id = 'partialTagsOnOff';
	onoff.className = 'taglistOnOff';
	onoff.innerText = (options.pixivShowPartialTags) ? '-' : '+';

	taglist.id = 'partialTags';

	if (!options.pixivShowPartialTags) {
		taglist.style.display = 'none';
	}

	const pattern = /(-{2,})+(\d{1,})$/;
	const node = document.createDocumentFragment();

	for (let i = 0; i < options.pixivPartialTags.length; i++) {
		const word = options.pixivPartialTags[i];

		const newA = document.createElement('a');
		newA.title = word; // title属性付与(マウスオンで省略前の検索キーワードが見える)
		newA.href = 'http://www.pixiv.net/search.php?s_mode=s_tag&word=' +
			encodeURIComponent(word)
				.replace(/%20/g, '+')
				.replace(pattern, '')
				.replace(/[+-]$/, '') +
			'&s_mode=s_tag'
		;

		if (word.match(pattern)) {
			const partword = RegExp.$2 < (word.length - RegExp.lastMatch.length + 1)
				? word.slice(0, RegExp.$2) + '...'
				: word.slice(0, -RegExp.lastMatch.length - 1);
			newA.appendChild(document.createTextNode(partword));
		} else {
			newA.appendChild(document.createTextNode(word));
		}
		node.appendChild(newA);
	}
	taglist.appendChild(node);

	taglistOuter.appendChild(onoff);
	taglistOuter.appendChild(taglist);

	return taglistOuter;
}

// キャプション検索用のタグリストをDOM作成
function captionTags(options) {
	const taglistOuter = document.createElement('div');
	const onoff = document.createElement('div');
	const taglist = document.createElement('div');

	taglistOuter.id = 'pixiv_tag_collector_caption_tags';
	taglistOuter.className = 'taglist';

	onoff.id = 'captionTagsOnOff';
	onoff.className = 'taglistOnOff';
	onoff.innerText = (options.pixivShowCaptionTags) ? '-' : '+';

	taglist.id = 'captionTags';

	if (!options.pixivShowCaptionTags) {
		taglist.style.display = 'none';
	}

	const pattern = /(-{2,})+(\d{1,})$/;
	const node = document.createDocumentFragment();

	for (let i = 0; i < options.pixivCaptionSearchName.length; i++) {
		const name = options.pixivCaptionSearchName[i];
		const word = options.pixivCaptionSearchWord[i];

		const newA = document.createElement('a');
		newA.title = name; // title属性付与(マウスオンで省略前の検索キーワードが見える)
		newA.href = 'http://www.pixiv.net/search.php?s_mode=s_tc&word=' +
			encodeURIComponent(word)
				.replace(/%20/g, '+')
				.replace(pattern, '')
				.replace(/[+-]$/, '')
		;

		if (name.match(pattern)) {
			const partword = RegExp.$2 < (name.length - RegExp.lastMatch.length + 1)
				? name.slice(0, RegExp.$2) + '...'
				: name.slice(0, -RegExp.lastMatch.length - 1);
			newA.appendChild(document.createTextNode(partword));
		} else {
			newA.appendChild(document.createTextNode(name));
		}
		node.appendChild(newA);
	}
	taglist.appendChild(node);

	taglistOuter.appendChild(onoff);
	taglistOuter.appendChild(taglist);

	return taglistOuter;
}

// デッドラインを表示する
function addDeadLineList(node, options) {
	if (options.pixivDeadLineName.length !== 0) {
		addToPixivPages(node, options, deadLines); // eslint-disable-line no-use-before-define
	}
}

// デッドラインリストのDOMを作成
function deadLines(node, options, targetNode) {
	const deadLinesOuter = document.createElement('ul');
	deadLinesOuter.id = 'pixiv_tag_collector_deadline_list';
	deadLinesOuter.className = 'pixiv_tag_collector';

	for (let i = 0; i < options.pixivDeadLineName.length; i++) {
		if (!options.pixivDeadLineName[i]) { continue }

		const now = new Date(); // 現在の日時を取得
		const dl = new Date(options.pixivDeadLineDate[i] + ', ' + options.pixivDeadLineTime[i]); // 〆切をセット
		const diff = dl - now;
		const times = 24 * 60 * 60 * 1000;
		const day = Math.floor(diff / times);
		const hour = Math.floor(diff % times / (60 * 60 * 1000));
		const min = Math.floor(diff % times / (60 * 1000)) % 60;
		let notice = '';

		const deadLine = document.createElement('li');
		deadLine.id = 'pixiv_tag_collector_deadline' + i;
		deadLine.className = 'deadline';

		if (diff > 0) {
			notice += 'あと';
			if (hour === 0 && day === 0) {
				notice += min + '分です。';
			} else if (day === 0) {
				notice += hour + '時間' + min + '分です。';
			} else {
				notice += day + '日と' + hour + '時間' + min + '分です。';
			}
		} else {
			notice += '〆切を過ぎました。';
		}
		if (diff < times * 7) {
			deadLine.className = 'deadline deadline-yabai';
		}

		let title = options.pixivDeadLineName[i];
		if (options.pixivDeadLineUrl[i] !== '') {
			title = '<a href="' + options.pixivDeadLineUrl[i] + '">' + title + '</a>';
		}
		deadLine.innerHTML =
			title + ' の〆切は <span class="deadline-date">' +
			options.pixivDeadLineDate[i] + ' ' + options.pixivDeadLineTime[i] +
			'</span> です。' + notice;
		deadLinesOuter.appendChild(deadLine);
	}
	targetNode.snapshotItem(0).parentNode
		.insertBefore(deadLinesOuter, targetNode.snapshotItem(0));
}

// 検索結果からNGワードを探して画像を非表示
// ページ中から追加場所を見つけてリストを追加する
function replaceAll(str, org, dest) {
	return str.split(org).join(dest);
}

function applySearchNGWords(node, options) {
	if (pathname === null || pathname !== 'search') {
		return;
	}
	const xpath = './/*[contains(concat(" ",normalize-space(@class)," "), " image-item ")]';
	const targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (let i = 0; i < targetNode.snapshotLength; ++i) {
		const elem = targetNode.snapshotItem(i);
		const text = elem.textContent;
		for (let w = 0; w < options.pixivSearchNGWords.length; ++w) {
			if (text.match(options.pixivSearchNGWords[w])) {
				elem.innerHTML = replaceAll(elem.innerHTML, options.pixivSearchNGWords[w], '***');
				$(elem).find('img').css('display', 'none');
				$(elem).find('._one-click-bookmark').css('display', 'none');
				break;
			}
		}
	}
}


// 個別イラストページへのリンクを常に新しいタブで開くように設定
function forceMemberIllustPageOpenInNewTab(node) {
	const xpath = './/a[contains(@href, "member_illust.php?mode=medium")]';
	const memberIllustPageAnchors = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (memberIllustPageAnchors.snapshotLength > 0) {
		for (let i = 0; i < memberIllustPageAnchors.snapshotLength; ++i) {
			memberIllustPageAnchors.snapshotItem(i).target = '_blank';
		}
	}
}


// ブックマーク詳細ページのブックマークしているユーザのリンク先をそのユーザの作品一覧に変更する
function forceBookmarkDetailLink(node) { // eslint-disable-line no-unused-vars
	if (pathname.indexOf('bookmark_detail') > -1) {
		$('.bookmark-item').find('a.user').each(function () {
			const a = $(this).attr('href');
			$(this).attr({href: a.replace(/\/bookmark/, '/member_illust')});
		});
	}
}

// __END__
