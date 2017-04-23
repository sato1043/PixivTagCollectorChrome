/* eslint-disable key-spacing, no-multi-spaces */
require('debug').enable(__DEBUG_LOG_MASK__);
const debug = require('debug')(`${__APP_NAME__}:background`);
const find = require('lodash/find');
const assign = require('lodash/assign');

/**
 * Chrome拡張のバックグラウンド処理
 * content_scriptからのリクエストのたびに応答する。
 *
 * 設定は localStorage へ保存
 * このスクリプトの初回実行時にデフォルト値を設定
 *
 * "getOptions"
 *   pixiv.netのページが描画されるたびに応答し、
 *   localStorage.optionsに保存したオプションを返す。
 *   オプションには検索対象のタグの一覧等が保存されていて、
 *   content_scriptはオプションを元に処理を行う。
 *
 * "saveOptions"
 *   localStorage.optionsにオプションを保存
 *
 * "showComplateTags" 完全一致タグ一覧を表示
 * "hideComplateTags" 完全一致タグ一覧を隠す
 *
 * "showPartialTags" 部分一致タグ一覧を表示
 * "hidePartialTags" 部分一致タグ一覧を隠す
 *
 * "showCaptionTags" キャプション検索一覧を表示
 * "hideCaptionTags" キャプション検索一覧を隠す
 *
 * "showTagList" タグ一覧を表示する
 * "hideTagList" タグ一覧を隠す
 */

/** オプションのデフォルト値を保持するオブジェクト */
const OPTIONS_DEFAULT = {
	pixivShowTagList      : true,
	pixivApplyToAll       : true,

	pixivCompleteTags     : [],
	pixivPartialTags      : [],
	pixivShowCompleteTags : true,
	pixivShowPartialTags  : true,

	pixivDoFilterAlways   : true,
	pixivFilterAlways     : '',

	pixivCaptionSearchName : [],
	pixivCaptionSearchWord : [],
	pixivShowCaptionTags : true,

	pixivSearchNGWords    : [],

	pixivShowLogo         : true,

	pixivShowMyProfile    : true,
	pixivShowMyMenu       : true,
	pixivShowMyGroup      : true,
	pixivShowOfficialGroup: true,
	pixivShowRecommendUser: true,
	pixivShowFollowing    : true,
	pixivShowMyPixiv      : true,
	pixivShowEvents       : true,

	pixivShowNewIllust    : true,
	pixivShowPopularTags  : true,
	pixivShowUserEvent    : true,
	pixivShowBookmarkNews : true,
	pixivShowMyPixivNews  : true,

	pixivShowNewsTop      : true,
	pixivShowDailyRank    : true,
	pixivShowComicRank    : true,
	pixivShowOtherRank    : true,
	pixivShowMaleRank     : true,
	pixivShowRookieRank   : true,
	pixivShowDicRank      : true,
	pixivShowOriginalRank : true,
	pixivShowNovelRank    : true,
	pixivShowUgoiraRank   : true,

	pixivDeadLineName     : [],
	pixivDeadLineDate     : [],
	pixivDeadLineTime     : [],
	pixivDeadLineUrl      : [],

	pixivOpenInNewTab     : false,
	pixivReloadPage       : false,
};

/** オプションを保持するオブジェクト、起動時に初期値を補充 */
const options = {};
Object.assign(options, !!localStorage.options ? JSON.parse(localStorage.options) : OPTIONS_DEFAULT);

Object.defineProperty(options, 'default', {
	get: () => OPTIONS_DEFAULT,
	configurable: false,
	enumerable: false,
});

Object.defineProperty(options, 'valid', {
	get: () => !find(OPTIONS_DEFAULT, (v, k) => !(k in options)),
	configurable: false,
	enumerable: false,
});

localStorage.options = JSON.stringify(options);


/**
 * content_scriptからのリクエストに応答
 * @param request
 * @param sender
 * @param sendResponse
 */
function chromeRuntimeOnMessageCallback(request, sender, sendResponse) {
	if (request.action === 'getOptions') {
		sendResponse({resultOptions: options});
		return;
	}
	if (request.action === 'saveOptions') {
		if (!request.options) { return }
		assign(options, request.options);
		localStorage.options = JSON.stringify(options);
		sendResponse({resultOptions: options});
		return;
	}

	switch (request.action) {
	case 'showComplateTags': options.pixivShowCompleteTags = true; break;
	case 'hideComplateTags': options.pixivShowCompleteTags = false; break;
	case 'showPartialTags' : options.pixivShowPartialTags  = true; break;
	case 'hidePartialTags' : options.pixivShowPartialTags  = false; break;
	case 'showCaptionTags' : options.pixivShowCaptionTags  = true; break;
	case 'hideCaptionTags' : options.pixivShowCaptionTags  = false; break;
	case 'showTagList'     : options.pixivShowTagList      = true; break;
	case 'hideTagList'     : options.pixivShowTagList      = false; break;
	default: break;
	}
	localStorage.options = JSON.stringify(options);
	sendResponse({});
}

/**
 * リスナー登録
 */
debug('PTCC:background: adding listener to chrome.runtime.onMessage');
chrome.runtime.onMessage.addListener(chromeRuntimeOnMessageCallback);

// __END__
