// vim: ts=2 sw=2 expandtab fenc=utf8 :
// content_scriptからのリクエストのたびに応答する。
'use strict';

// 設定がまだ作られていない時はデフォルト値で作っておく
if (!localStorage.options) {
	localStorage.options = JSON.stringify({
		  pixivShowTagList      : true
		, pixivApplyToAll       : true

		, pixivCompleteTags     : []
		, pixivPartialTags      : []
		, pixivShowCompleteTags : true
		, pixivShowPartialTags  : true

		, pixivShowLogo         : true
		
		, pixivShowMyProfile    : true
		, pixivShowMyMenu       : true
		, pixivShowMyGroup      : true
		, pixivShowOfficialGroup: true
		, pixivShowRecommendUser: true
		, pixivShowFollowing    : true
		, pixivShowMyPixiv      : true
		, pixivShowEvents       : true
		
		, pixivShowNewIllust    : true
		, pixivShowPopularTags  : true
		, pixivShowUserEvent    : true
		, pixivShowBookmarkNews : true
		, pixivShowMyPixivNews  : true
		
		, pixivShowNewsTop      : true
		, pixivShowDailyRank    : true
		, pixivShowComicRank    : true
		, pixivShowOtherRank    : true
		, pixivShowMaleRank     : true
		, pixivShowRookieRank   : true
		, pixivShowDicRank      : true
		, pixivShowOriginalRank : true
		, pixivShowNovelRank    : true
		
		, pixivDeadLineName     : ['','','']
		, pixivDeadLineDate     : ['','','']
		, pixivDeadLineTime     : ['','','']
		, pixivDeadLineUrl      : ['','','']

		, pixivOpenInNewTab     : false
		, pixivReloadPage       : false

	});
}

//　content_script.js からのリクエストに応答する
//
// "getOptions"
//   pixiv.net以下のページが描画されるたびに応答して、
//   localStorage.optionsに保存したオプションを返してあげる。
//   オプションには検索対象のタグの一覧等が保存されていて、
//   content_scriptはオプションを元に処理を行う。
//
// "showComplateTags"
//   完全一致タグ一覧を表示する
// "hideComplateTags"
//   完全一致タグ一覧を隠す
//
// "showPartialTags"
//   部分一致タグ一覧を表示する
// "hidePartialTags"
//   部分一致タグ一覧を隠す
//
chrome.extension.onRequest.addListener(
	function (request, sender, sendResponse) {
	var options = JSON.parse(localStorage.options);
	if (request.action == "getOptions") {
		sendResponse({
			resultOptions : options
		});
	} else if (request.action == "showComplateTags") {
		options.pixivShowCompleteTags = true;
		localStorage.options = JSON.stringify(options);
		sendResponse({});
	} else if (request.action == "hideComplateTags") {
		options.pixivShowCompleteTags = false;
		localStorage.options = JSON.stringify(options);
		sendResponse({});
	} else if (request.action == "showPartialTags") {
		options.pixivShowPartialTags = true;
		localStorage.options = JSON.stringify(options);
		sendResponse({});
	} else if (request.action == "hidePartialTags") {
		options.pixivShowPartialTags = false;
		localStorage.options = JSON.stringify(options);
		sendResponse({});
	} else if (request.action == "showTagList") {
		options.pixivShowTagList = true;
		localStorage.options = JSON.stringify(options);
		sendResponse({});
	} else if (request.action == "hideTagList") {
		options.pixivShowTagList = false;
		localStorage.options = JSON.stringify(options);
		sendResponse({});
	} else {
		sendResponse({}); // 不明なリクエストに対しては空のレスポンスを返しておく
	}
});