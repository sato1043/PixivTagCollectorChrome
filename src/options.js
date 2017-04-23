/**
 * Chrome拡張のオプションページ内部処理
 *
 * 思い出しリスト；設定を追加した時すること
 *  - optionsPageOnLoad()で、オプションページ内のclickイベントなどbind
 *  - showOptions
 *  - saveOptions
 *  - background.js で初期値設定
 */
require('pickadate/lib/compressed/picker');
require('pickadate/lib/compressed/picker.date');
require('pickadate/lib/compressed/picker.time');
require('pickadate/lib/compressed/translations/ja_JP');
require('pickadate/lib/compressed/themes/classic.css');
require('pickadate/lib/compressed/themes/classic.date.css');
require('pickadate/lib/compressed/themes/classic.time.css');


$(optionsPageOnLoad); // eslint-disable-line no-use-before-define

/**
 * ロード時動作
 */
function optionsPageOnLoad() {
	require('src/css/style.css');
	// タグを表示するチェック中だけ、すべてのページにチェックを入れられるようにした。
	$('#pixivShowTagList').click(function () {
		if ($('#pixivShowTagList').is(':checked')) {
			$('#pixivApplyToAll').prop('disabled', false);
		} else {
			$('#pixivApplyToAll').prop('checked', false).prop('disabled', true);
		}
	});

	// デッドラインを追加するボタン
	$('#deadline-add').click(function () {
		addInputDeadLine('', '', '', ''); // eslint-disable-line no-use-before-define
	});
	// キャプション検索を追加するボタン
	$('#cation-search-add').click(function () {
		addInputCaptionSearch('', ''); // eslint-disable-line no-use-before-define
	});

	// ナビゲーションリンクをクリックしてスクロールする
	$('#navigation a[href^="#"]').click(function (event) {
		const id = $(this).attr('href');
		const offset = 60;
		const target = $(id).offset().top - offset;
		$('html, body').animate({scrollTop: target}, 300);
		event.preventDefault();
		return false;
	});

	// 設定のインポート、エクスポート
	$('#settings-export').click(function () {
		if (window.confirm('入力中の設定を保存しますか？\n(保存した設定のみエクスポートされます)')) {
			saveOptions(false); // eslint-disable-line no-use-before-define
		}
		$('#settings-import-export').val(JSON.stringify(localStorage.options).replace(/\\/g, '').slice(1).slice(0, -1));
	});
	$('#settings-import').click(function () {
		if (!window.confirm('設定を上書きインポートします。よろしいですか？\n(入力した設定のみインポートされます)')) {
			return;
		}
		if ($('#settings-import-export').val() === '') {
			return;
		}
		try {
			showOptions(JSON.parse($('#settings-import-export').val())); // eslint-disable-line no-use-before-define
			if (window.confirm('インポート後の設定を今すぐ保存しますか？\n(インポート内容は保存した場合のみ有効になります)')) {
				saveOptions(false); // eslint-disable-line no-use-before-define
			}
		} catch (e) {
			alert(e);
		}
	});

	// SAVEボタン押下で saveOptions を呼び出すように設定
	$('#saveOptions').click(function () {
		saveOptions(); // eslint-disable-line no-use-before-define
	});

	// 保存済み設定を取得して表示
	if (localStorage.options) {
		showOptions(JSON.parse(localStorage.options)); // eslint-disable-line no-use-before-define
	}
}


// optionsPageOnLoad()から呼ばれてオプションを表示する
function showOptions(options) {
	// 以下、画面の初期表示を設定

	if (options.pixivCompleteTags) {
		$('#pixivCompleteTags').val(options.pixivCompleteTags.join('\n'));
	}
	if (options.pixivPartialTags) {
		$('#pixivPartialTags').val(options.pixivPartialTags.join('\n'));
	}
	$('#pixivShowCompleteTags').prop('checked', options.pixivShowCompleteTags);
	$('#pixivShowPartialTags').prop('checked', options.pixivShowPartialTags);
	$('#pixivShowCaptionTags').prop('checked', options.pixivShowCaptionTags);
	$('#pixivShowTagList').prop('checked', options.pixivShowTagList);
	$('#pixivApplyToAll').attr('disabled', !options.pixivShowTagList);
	$('#pixivApplyToAll').prop('checked', options.pixivApplyToAll);

	$('#pixivDoFilterAlways').prop('checked', options.pixivDoFilterAlways);
	if (options.pixivFilterAlways) {
		$('#pixivFilterAlways').val(options.pixivFilterAlways);
	}

	$('#pixivShowLogo').prop('checked', options.pixivShowLogo);

	$('#pixivShowMyProfile').prop('checked', options.pixivShowMyProfile);
	$('#pixivShowMyMenu').prop('checked', options.pixivShowMyMenu);
	$('#pixivShowMyGroup').prop('checked', options.pixivShowMyGroup);
	$('#pixivShowOfficialGroup').prop('checked', options.pixivShowOfficialGroup);
	$('#pixivShowRecommendUser').prop('checked', options.pixivShowRecommendUser);
	$('#pixivShowFollowing').prop('checked', options.pixivShowFollowing);
	$('#pixivShowMyPixiv').prop('checked', options.pixivShowMyPixiv);
	$('#pixivShowEvents').prop('checked', options.pixivShowEvents);

	$('#pixivShowNewIllust').prop('checked', options.pixivShowNewIllust);
	$('#pixivShowPopularTags').prop('checked', options.pixivShowPopularTags);
	$('#pixivShowUserEvent').prop('checked', options.pixivShowUserEvent);
	$('#pixivShowBookmarkNews').prop('checked', options.pixivShowBookmarkNews);
	$('#pixivShowMyPixivNews').prop('checked', options.pixivShowMyPixivNews);

	$('#pixivShowNewsTop').prop('checked', options.pixivShowNewsTop);
	$('#pixivShowDailyRank').prop('checked', options.pixivShowDailyRank);
	$('#pixivShowComicRank').prop('checked', options.pixivShowComicRank);
	$('#pixivShowOtherRank').prop('checked', options.pixivShowOtherRank);
	$('#pixivShowMaleRank').prop('checked', options.pixivShowMaleRank);
	$('#pixivShowRookieRank').prop('checked', options.pixivShowRookieRank);
	$('#pixivShowDicRank').prop('checked', options.pixivShowDicRank);
	$('#pixivShowOriginalRank').prop('checked', options.pixivShowOriginalRank);
	$('#pixivShowNovelRank').prop('checked', options.pixivShowNovelRank);
	$('#pixivShowUgoiraRank').prop('checked', options.pixivShowUgoiraRank);

	$('#pixivOpenInNewTab').prop('checked', options.pixivOpenInNewTab);
	$('#pixivBookmarkLink').prop('checked', options.pixivBookmarkLink);
	// $('#pixivReloadPage').prop('checked', options.pixivReloadPage);

	// デッドラインテーブルを生成・設定呼び出し
	$('#deadLines').find('tr').not(':first-child').remove();
	for (let i = 0; i < options.pixivDeadLineName.length; ++i) {
		if (!options.pixivDeadLineName[i]) { return }
		addInputDeadLine( // eslint-disable-line no-use-before-define
				options.pixivDeadLineName[i]
			, options.pixivDeadLineDate[i]
			, options.pixivDeadLineTime[i]
			, options.pixivDeadLineUrl [i]
		);
	}
	// キャプション検索テーブルを生成・設定呼び出し
	$('#caption-search-list').find('tr').not(':first-child').remove();
	for (let i = 0; i < options.pixivCaptionSearchName.length; ++i) {
		addInputCaptionSearch( // eslint-disable-line no-use-before-define
				options.pixivCaptionSearchName[i]
			, options.pixivCaptionSearchWord[i]
		);
	}

	// テーブルの行を削除するボタン
	$(document).on('click', '.button-clear', function () {
		$(this).closest('tr').remove();
	});

	if (options.pixivSearchNGWords) {
		$('#pixivSearchNGWords').val(options.pixivSearchNGWords.join('\n'));
	}
}

// optionsPageOnLoad()から呼ばれて'デッドラインを追加するボタン'を作る
function addInputDeadLine(name, date, time, url) {
	const line = $('table#deadLines').append(
		'<tr>\n' +
		'<td><input type="text" class="deadline-name" value="' + name + '"/></td>\n' +
		'<td><input type="text" class="deadline-datepicker" value="' + date + '"/></td>\n' +
		'<td><input type="text" class="deadline-timepicker" value="' + time + '"/></td>\n' +
		'<td><input type="text" class="deadline-url" value="' + url + '"/></td>\n' +
		'<td><button type="button" class="button-clear deadline-clear">削除</button></td>\n' +
		'</tr>\n'
	);

	const datepicker = line.find('.deadline-datepicker');
	datepicker.pickadate();

	const timepicker = line.find('.deadline-timepicker');
	timepicker.pickatime();

	line.find('.button-clear').click(function () {
		$(this).closest('tr').remove();
	});
}

// optionsPageOnLoad()から呼ばれて'キャプション検索を追加するボタン'を作る
function addInputCaptionSearch(name, word) {
	const line = $('table#caption-search-list').append(
			'<tr>\n' +
			'<td><input type="text" class="caption-search-name" value="' + name + '"/></td>\n' +
			'<td><input type="text" class="caption-search-word" value="' + word + '"/></td>\n' +
			'<td><button type="button" class="button-clear caption-search-clear">削除</button></td>\n' +
			'</tr>\n'
	);

	line.find('.button-clear').click(function () {
		$(this).closest('tr').remove();
	});
}


// clickイベントから呼ばれてオプションを保存する
function saveOptions(closingForm) {
	if (typeof closingForm === 'undefined') {
		closingForm = true; // eslint-disable-line no-param-reassign
	}

	// 保存するオプションハッシュをoptionsに新しく作り直す。最終的にこれを保存する。
	const options = {};

	// 以下、保存する値を準備

	options.pixivCompleteTags = [];
	let completeTagsText = $('#pixivCompleteTags').val();
	if (completeTagsText) {
		completeTagsText = completeTagsText.replace(/[ 　]/g, '');
		completeTagsText = completeTagsText.replace(/\n{2,}/g, '\n');
		completeTagsText = completeTagsText.replace(/^\n|\n$/g, '');
		options.pixivCompleteTags = completeTagsText.split('\n');
	}

	options.pixivPartialTags = [];
	let partialTagsText = $('#pixivPartialTags').val();
	if (partialTagsText) {
		partialTagsText = partialTagsText.replace(/[ 　]/g, ' ');
		partialTagsText = partialTagsText.replace(/\n{2,}/g, '\n');
		partialTagsText = partialTagsText.replace(/^\n|\n$/g, '');
		options.pixivPartialTags = partialTagsText.split('\n');
	}

	/* eslint-disable no-multi-spaces */
	options.pixivShowCompleteTags  = $('#pixivShowCompleteTags').is(':checked');
	options.pixivShowPartialTags   = $('#pixivShowPartialTags').is(':checked');
	options.pixivShowCaptionTags   = $('#pixivShowCaptionTags').is(':checked');
	options.pixivShowTagList       = $('#pixivShowTagList').is(':checked');
	options.pixivApplyToAll        = $('#pixivApplyToAll').is(':checked');

	options.pixivDoFilterAlways    = $('#pixivDoFilterAlways').is(':checked');
	options.pixivFilterAlways      = $('#pixivFilterAlways').val();

	options.pixivShowLogo          = $('#pixivShowLogo').is(':checked');

	options.pixivShowMyProfile     = $('#pixivShowMyProfile').is(':checked');
	options.pixivShowMyMenu        = $('#pixivShowMyMenu').is(':checked');
	options.pixivShowMyGroup       = $('#pixivShowMyGroup').is(':checked');
	options.pixivShowOfficialGroup = $('#pixivShowOfficialGroup').is(':checked');
	options.pixivShowRecommendUser = $('#pixivShowRecommendUser').is(':checked');
	options.pixivShowFollowing     = $('#pixivShowFollowing').is(':checked');
	options.pixivShowMyPixiv       = $('#pixivShowMyPixiv').is(':checked');
	options.pixivShowEvents        = $('#pixivShowEvents').is(':checked');

	options.pixivShowNewIllust     = $('#pixivShowNewIllust').is(':checked');
	options.pixivShowPopularTags   = $('#pixivShowPopularTags').is(':checked');
	options.pixivShowUserEvent     = $('#pixivShowUserEvent').is(':checked');
	options.pixivShowBookmarkNews  = $('#pixivShowBookmarkNews').is(':checked');
	options.pixivShowMyPixivNews   = $('#pixivShowMyPixivNews').is(':checked');

	options.pixivShowNewsTop       = $('#pixivShowNewsTop').is(':checked');
	options.pixivShowDailyRank     = $('#pixivShowDailyRank').is(':checked');
	options.pixivShowComicRank     = $('#pixivShowComicRank').is(':checked');
	options.pixivShowOtherRank     = $('#pixivShowOtherRank').is(':checked');
	options.pixivShowMaleRank      = $('#pixivShowMaleRank').is(':checked');
	options.pixivShowRookieRank    = $('#pixivShowRookieRank').is(':checked');
	options.pixivShowDicRank       = $('#pixivShowDicRank').is(':checked');
	options.pixivShowOriginalRank  = $('#pixivShowOriginalRank').is(':checked');
	options.pixivShowNovelRank     = $('#pixivShowNovelRank').is(':checked');
	options.pixivShowUgoiraRank    = $('#pixivShowUgoiraRank').is(':checked');

	options.pixivListHide          = $('#pixivListHide').is(':checked');
	options.pixivOpenInNewTab      = $('#pixivOpenInNewTab').is(':checked');
	options.pixivBookmarkLink      = $('#pixivBookmarkLink').is(':checked');
	// options.pixivReloadPage        = $('#pixivReloadPage').is(':checked');
	/* eslint-enable no-multi-spaces */

	options.pixivDeadLineName = [];
	options.pixivDeadLineDate = [];
	options.pixivDeadLineTime = [];
	options.pixivDeadLineUrl = [];
	if (!!$('table#deadLines > tbody > tr').length) {
		const dlNum = $('table#deadLines > tbody > tr').length - 1;
		for (let i = 0; i < dlNum; ++i) {
			const line = $('table#deadLines > tbody >  tr').eq((i + 1));
			options.pixivDeadLineName[i] = line.find('.deadline-name').val();
			options.pixivDeadLineDate[i] = line.find('.deadline-datepicker').val();
			options.pixivDeadLineTime[i] = line.find('.deadline-timepicker').val();
			options.pixivDeadLineUrl [i] = line.find('.deadline-url').val();

			// 入力されていない項目があったらエラーにする
			if (!options.pixivDeadLineName[i]) {
				window.alert((i + 1) + '番目の〆切に名前が入力されていません。');
				return;
			}
			if (!options.pixivDeadLineDate[i]) {
				window.alert((i + 1) + '番目の〆切に日付が入力されていません。');
				return;
			}
			if (!options.pixivDeadLineTime[i]) {
				window.alert((i + 1) + '番目の〆切に時刻が入力されていません。');
				return;
			}
		}
	}

	options.pixivCaptionSearchName = [];
	options.pixivCaptionSearchWord = [];
	const capNum = $('table#caption-search-list tr').length - 1;
	for (let i = 0; i < capNum; ++i) {
		const line = $('table#caption-search-list tr').eq((i + 1));
		options.pixivCaptionSearchName[i] = line.find('.caption-search-name').val();
		options.pixivCaptionSearchWord[i] = line.find('.caption-search-word').val();

		// 入力されていない項目があったらエラーにする
		if (options.pixivCaptionSearchName[i] === '') {
			window.alert((i + 1) + '番目のキャプション検索に名前が入力されていません。');
			return;
		}
		if (options.pixivCaptionSearchWord[i] === '') {
			window.alert((i + 1) + '番目のキャプション検索に検索条件が入力されていません。');
			return;
		}
	}

	options.pixivSearchNGWords = [];
	let ngwordsText = $('#pixivSearchNGWords').val();
	if (ngwordsText) {
		ngwordsText = ngwordsText.replace(/[ 　]/g, ' ');
		ngwordsText = ngwordsText.replace(/\n{2,}/g, '\n');
		ngwordsText = ngwordsText.replace(/^\n|\n$/g, '');
		options.pixivSearchNGWords = ngwordsText.split('\n');
	}

	// localStorageに設定を保存
	chrome.runtime.sendMessage({action: 'saveOptions', options});

	// 設定タブを閉じる
	if (closingForm) {
		close();
	}
}

// __END__
