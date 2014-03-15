'use strict';

// ロード時動作
$(document).ready(function(){
	// タグを表示するチェック中だけ、すべてのページにチェックを入れられるようにした。
	$('#pixivShowTagList').click(function(){
		if ($("#pixivShowTagList").is(':checked')){
			$('#pixivApplyToAll').prop('disabled', false);
		} else {
			$('#pixivApplyToAll').prop('checked', false).prop('disabled', true);
		}
	});

	// デッドラインを追加するボタン
	$('#deadline-add').click(function(){
		addInputDeadLine('','','','');
	});
	// キャプション検索を追加するボタン
	$('#cation-search-add').click(function(){
		addInputCaptionSearch('','');
	});

	// ナビゲーションリンクをクリックしてスクロールする
	$('#navigation a[href^="#"]').click(function(event) {
		var id = $(this).attr("href");
		var offset = 60;
		var target = $(id).offset().top - offset;
		$('html, body').animate({scrollTop:target}, 300);
		event.preventDefault();
		return false;
	});

	// 設定のインポート、エクスポート
	$('#settings-export').click(function(){
		$('#settings-import-export').val(JSON.stringify(localStorage.options).replace(/\\/g, '').slice(1).slice(0,-1));
	});
	$('#settings-import').click(function(){
		$('#deadLines, #caption-search-list').find('tr').not(':first-child').remove();
		var options = JSON.parse($('#settings-import-export').val());
		showOptions(options);
	});

	// SAVEボタン押下で saveOptions を呼び出すように設定
	$('#saveOptions').click(function(){ saveOptions(); });

	// 保存済み設定を取得して表示
	var options = JSON.parse(localStorage.options);
	showOptions(options);
});

// オプションを表示する
function showOptions(options){
	var i;
	
	var options = options;

	// 以下、画面の初期表示を設定
	
	if (options.pixivCompleteTags) {
		$("#pixivCompleteTags").val(options.pixivCompleteTags.join('\n'));
	}
	if (options.pixivPartialTags) {
		$("#pixivPartialTags").val(options.pixivPartialTags.join('\n'));
	}
	if (options.pixivShowCompleteTags) {
		$("#pixivShowCompleteTags").prop('checked', true);
	} else {
		$("#pixivShowCompleteTags").prop('checked', false);
	}
	if (options.pixivShowPartialTags) {
		$("#pixivShowPartialTags").prop('checked', true);
	} else {
		$("#pixivShowPartialTags").prop('checked', false);
	}
	if (options.pixivShowCaptionTags) {
		$("#pixivShowCaptionTags").prop('checked', true);
	} else {
		$("#pixivShowCaptionTags").prop('checked', false);
	}
	if (options.pixivShowTagList) {
		$("#pixivShowTagList").prop('checked', true);
	} else {
		$("#pixivShowTagList").prop('checked', false);
		$('#pixivApplyToAll').attr("disabled", "disabled");
	}
	
	if (options.pixivShowLogo){
		$("#pixivShowLogo").prop('checked', true);
	} else {
		$("#pixivShowLogo").prop('checked', false);
	}

	if (options.pixivShowMyProfile) {
		$("#pixivShowMyProfile").prop('checked', true);
	} else {
		$("#pixivShowMyProfile").prop('checked', false);
	}
	if (options.pixivShowMyMenu) {
		$("#pixivShowMyMenu").prop('checked', true);
	} else {
		$("#pixivShowMyMenu").prop('checked', false);
	}
	if (options.pixivShowMyGroup) {
		$("#pixivShowMyGroup").prop('checked', true);
	} else {
		$("#pixivShowMyGroup").prop('checked', false);
	}
	if (options.pixivShowOfficialGroup) {
		$("#pixivShowOfficialGroup").prop('checked', true);
	} else {
		$("#pixivShowOfficialGroup").prop('checked', false);
	}
	if (options.pixivShowRecommendUser) {
		$("#pixivShowRecommendUser").prop('checked', true);
	} else {
		$("#pixivShowRecommendUser").prop('checked', false);
	}
	if (options.pixivShowFollowing) {
		$("#pixivShowFollowing").prop('checked', true);
	} else {
		$("#pixivShowFollowing").prop('checked', false);
	}
	if (options.pixivShowMyPixiv) {
		$("#pixivShowMyPixiv").prop('checked', true);
	} else {
		$("#pixivShowMyPixiv").prop('checked', false);
	}
	if (options.pixivShowEvents) {
		$("#pixivShowEvents").prop('checked', true);
	} else {
		$("#pixivShowEvents").prop('checked', false);
	}

	if (options.pixivShowNewIllust) {
		$("#pixivShowNewIllust").prop('checked', true);
	} else {
		$("#pixivShowNewIllust").prop('checked', false);
	}
	if (options.pixivShowPopularTags) {
		$("#pixivShowPopularTags").prop('checked', true);
	} else {
		$("#pixivShowPopularTags").prop('checked', false);
	}
	if (options.pixivShowUserEvent) {
		$("#pixivShowUserEvent").prop('checked', true);
	} else {
		$("#pixivShowUserEvent").prop('checked', false);
	}
	if (options.pixivShowBookmarkNews) {
		$("#pixivShowBookmarkNews").prop('checked', true);
	} else {
		$("#pixivShowBookmarkNews").prop('checked', false);
	}
	if (options.pixivShowMyPixivNews) {
		$("#pixivShowMyPixivNews").prop('checked', true);
	} else {
		$("#pixivShowMyPixivNews").prop('checked', false);
	}

	if (options.pixivShowNewsTop) {
		$("#pixivShowNewsTop").prop('checked', true);
	} else {
		$("#pixivShowNewsTop").prop('checked', false);
	}
	if (options.pixivShowDailyRank) {
		$("#pixivShowDailyRank").prop('checked', true);
	} else {
		$("#pixivShowDailyRank").prop('checked', false);
	}
	if (options.pixivShowComicRank) {
		$("#pixivShowComicRank").prop('checked', true);
	} else {
		$("#pixivShowComicRank").prop('checked', false);
	}
	if (options.pixivShowOtherRank) {
		$("#pixivShowOtherRank").prop('checked', true);
	} else {
		$("#pixivShowOtherRank").prop('checked', false);
	}
	if (options.pixivShowMaleRank) {
		$("#pixivShowMaleRank").prop('checked', true);
	} else {
		$("#pixivShowMaleRank").prop('checked', false);
	}
	if (options.pixivShowRookieRank) {
		$("#pixivShowRookieRank").prop('checked', true);
	} else {
		$("#pixivShowRookieRank").prop('checked', false);
	}
	if (options.pixivShowDicRank) {
		$("#pixivShowDicRank").prop('checked', true);
	} else {
		$("#pixivShowDicRank").prop('checked', false);
	}
	if (options.pixivShowOriginalRank) {
		$("#pixivShowOriginalRank").prop('checked', true);
	} else {
		$("#pixivShowOriginalRank").prop('checked', false);
	}
	if (options.pixivShowNovelRank) {
		$("#pixivShowNovelRank").prop('checked', true);
	} else {
		$("#pixivShowNovelRank").prop('checked', false);
	}

	if (options.pixivApplyToAll){
		$("#pixivApplyToAll").prop('checked', true);
	} else {
		$("#pixivApplyToAll").prop('checked', false);
	}
	if (options.pixivOpenInNewTab) {
		$("#pixivOpenInNewTab").prop('checked', true);
	} else {
		$("#pixivOpenInNewTab").prop('checked', false);
	}
	if (options.pixivBookmarkLink) {
		$("#pixivBookmarkLink").prop('checked', true);
	} else {
		$("#pixivBookmarkLink").prop('checked', false);
	}
	/*
	if (options.pixivReloadPage) {
		$("#pixivReloadPage").prop('checked', true);
	} else {
		$("#pixivReloadPage").prop('checked', false);
	}
	*/
	// デッドラインテーブルを生成・設定呼び出し
	for (i = 0; i < options.pixivDeadLineName.length; ++i ){
		addInputDeadLine(
			  options.pixivDeadLineName[i]
			, options.pixivDeadLineDate[i]
			, options.pixivDeadLineTime[i]
			, options.pixivDeadLineUrl [i]
		);
	}
	// キャプション検索テーブルを生成・設定呼び出し
	for(i = 0; i < options.pixivCaptionSearchName.length; ++i ) {
		addInputCaptionSearch(
			  options.pixivCaptionSearchName[i]
			, options.pixivCaptionSearchWord[i]
		);
	}

	// テーブルの行を削除するボタン
	$(document).on('click', '.button-clear', function(){
		$(this).closest('tr').remove();
	});

	if (options.pixivSearchNGWords) {
		$("#pixivSearchNGWords").val(options.pixivSearchNGWords.join('\n'));
	}
}

function addInputDeadLine(name,date,time,url) {
	
	var line = $('table#deadLines').append(
		'<tr>\n'
			+ '<td><input type="text" class="deadline-name" value="' + name + '"/></td>\n'
			+ '<td><input type="text" class="deadline-datepicker" value="'    + date + '"/></td>\n'
			+ '<td><input type="text" class="deadline-timepicker" value="'    + time + '"/></td>\n'
			+ '<td><input type="text" class="deadline-url" value="'  + url  + '"/></td>\n'
			+ '<td><button type="button" class="button-clear deadline-clear">削除</button></td>\n'
		+ '</tr>\n'
	);
	
	var datepicker = line.find('.deadline-datepicker');
	datepicker.removeClass('hasDatepicker');
	datepicker.removeData("datepicker");
	datepicker.removeAttr("id");
	datepicker.unbind();
	datepicker.datepicker();
	datepicker.datepicker("option", 'minDate', new Date());
	
	var timepicker = line.find('.deadline-timepicker');
	timepicker.timepicker();
	timepicker.timepicker({
		'timeFormat': 'H:i', //フォーマット(PHPと同じ)
		'step': 60 //何分おきにするか
	});
	
	line.find('.button-clear').click(function(){
		$(this).closest('tr').remove();
	});
	
}

function addInputCaptionSearch(name,word){
	var line = $('table#caption-search-list').append(
		'<tr>\n'
			+ '<td><input type="text" class="caption-search-name" value="' + name + '"/></td>\n'
			+ '<td><input type="text" class="caption-search-word" value="' + word + '"/></td>\n'
			+ '<td><button type="button" class="button-clear caption-search-clear">削除</button></td>\n'
		+ '</tr>\n'
	);
	
	line.find('.button-clear').click(function(){
		$(this).closest('tr').remove();
	});
}

// オプションを保存する
function saveOptions(){
	var i;
	var line;
	
	// 保存するオプションハッシュをoptionsに新しく作り直す。最終的にこれを保存する.。
	var options = {};

	// 以下、保存する値を準備
	
	options.pixivCompleteTags = [];
	var complateTagsText = $("#pixivCompleteTags").val();
	if (complateTagsText) {
		complateTagsText = complateTagsText.replace(/[ 　]/g, '');
		complateTagsText = complateTagsText.replace(/\n{2,}/g, '\n');
		complateTagsText = complateTagsText.replace(/^\n|\n$/g, '');
		options.pixivCompleteTags = complateTagsText.split('\n');
	}
	
	options.pixivPartialTags = [];
	var partialTagsText = $("#pixivPartialTags").val();
	if (partialTagsText) {
		partialTagsText = partialTagsText.replace(/[ 　]/g, ' ');
		partialTagsText = partialTagsText.replace(/\n{2,}/g, '\n');
		partialTagsText = partialTagsText.replace(/^\n|\n$/g, '');
		options.pixivPartialTags = partialTagsText.split('\n');
	}
	
	options.pixivShowCompleteTags	= $("#pixivShowCompleteTags").is(':checked');
	options.pixivShowPartialTags	= $("#pixivShowPartialTags").is(':checked');
	options.pixivShowCaptionTags	= $("#pixivShowCaptionTags").is(':checked');
	options.pixivShowTagList	    = $("#pixivShowTagList").is(':checked');
	options.pixivApplyToAll			= $("#pixivApplyToAll").is(':checked');

	options.pixivShowLogo			= $("#pixivShowLogo").is(':checked');

	options.pixivShowMyProfile		= $("#pixivShowMyProfile").is(':checked');
	options.pixivShowMyMenu			= $("#pixivShowMyMenu").is(':checked');
	options.pixivShowMyGroup		= $("#pixivShowMyGroup").is(':checked');
	options.pixivShowOfficialGroup	= $("#pixivShowOfficialGroup").is(':checked');
	options.pixivShowRecommendUser	= $("#pixivShowRecommendUser").is(':checked');
	options.pixivShowFollowing		= $("#pixivShowFollowing").is(':checked');
	options.pixivShowMyPixiv		= $("#pixivShowMyPixiv").is(':checked');
	options.pixivShowEvents			= $("#pixivShowEvents").is(':checked');

	options.pixivShowNewIllust		= $("#pixivShowNewIllust").is(':checked');
	options.pixivShowPopularTags	= $("#pixivShowPopularTags").is(':checked');
	options.pixivShowUserEvent		= $("#pixivShowUserEvent").is(':checked');
	options.pixivShowBookmarkNews	= $("#pixivShowBookmarkNews").is(':checked');
	options.pixivShowMyPixivNews	= $("#pixivShowMyPixivNews").is(':checked');

	options.pixivShowNewsTop		= $("#pixivShowNewsTop").is(':checked');
	options.pixivShowDailyRank		= $("#pixivShowDailyRank").is(':checked');
	options.pixivShowComicRank		= $("#pixivShowComicRank").is(':checked');
	options.pixivShowOtherRank		= $("#pixivShowOtherRank").is(':checked');
	options.pixivShowMaleRank		= $("#pixivShowMaleRank").is(':checked');
	options.pixivShowRookieRank		= $("#pixivShowRookieRank").is(':checked');
	options.pixivShowDicRank		= $("#pixivShowDicRank").is(':checked');
	options.pixivShowOriginalRank	= $("#pixivShowOriginalRank").is(':checked');
	options.pixivShowNovelRank		= $("#pixivShowNovelRank").is(':checked');

	options.pixivListHide			= $("#pixivListHide").is(':checked');
	options.pixivOpenInNewTab		= $("#pixivOpenInNewTab").is(':checked');
	options.pixivBookmarkLink		= $("#pixivBookmarkLink").is(':checked');
	//options.pixivReloadPage		= $("#pixivReloadPage").is(':checked');

	options.pixivDeadLineName = [];
	options.pixivDeadLineDate = [];
	options.pixivDeadLineTime = [];
	options.pixivDeadLineUrl  = [];
	var dl_num = $('table#deadLines tr').length - 1;
	for (i = 0; i < dl_num; ++i ){
		line = $('table#deadLines tr').eq((i+1));
		options.pixivDeadLineName[i] = line.find('.deadline-name').val();
		options.pixivDeadLineDate[i] = line.find('.deadline-datepicker').val();
		options.pixivDeadLineTime[i] = line.find('.deadline-timepicker').val();
		options.pixivDeadLineUrl [i] = line.find('.deadline-url').val();
		
		// 入力されていない項目があったらエラーにする
		if(dl_num > 1){ //1行目はスルー
			if (options.pixivDeadLineName[i] === "") {
				window.alert((i+1)+'番目の〆切に名前が入力されていません。');
				return;
			}
			if (options.pixivDeadLineDate[i] === "") {
				window.alert((i+1)+'番目の〆切に日付が入力されていません。');
				return;
			}
			if (options.pixivDeadLineTime[i] === "") {
				window.alert((i+1)+'番目の〆切に時刻が入力されていません。');
				return;
			}
		}
		
	}

	options.pixivCaptionSearchName = [];
	options.pixivCaptionSearchWord = [];
	var cap_num = $('table#caption-search-list tr').length - 1; 
	for (i = 0; i < cap_num; ++i ) {
		line = $('table#caption-search-list tr').eq((i+1));
		options.pixivCaptionSearchName[i] = line.find('.caption-search-name').val();
		options.pixivCaptionSearchWord[i] = line.find('.caption-search-word').val();
		
		// 入力されていない項目があったらエラーにする
		if(cap_num > 1){ //1行目はスルー
			if (options.pixivCaptionSearchName[i] === "") {
				window.alert((i+1)+'番目のキャプション検索に名前が入力されていません。');
				return;
			}
			if (options.pixivCaptionSearchWord[i] === "") {
				window.alert((i+1)+'番目のキャプション検索に検索条件が入力されていません。');
				return;
			}
		}
	}

	options.pixivSearchNGWords = [];
	var ngwordsText = $("#pixivSearchNGWords").val();
	if (ngwordsText) {
		ngwordsText = ngwordsText.replace(/[ 　]/g, ' ');
		ngwordsText = ngwordsText.replace(/\n{2,}/g, '\n');
		ngwordsText = ngwordsText.replace(/^\n|\n$/g, '');
		options.pixivSearchNGWords = ngwordsText.split('\n');
	}

	// localstorageに設定を保存
	localStorage.options = JSON.stringify(options);

	// 設定タブを閉じる
	close();
}
