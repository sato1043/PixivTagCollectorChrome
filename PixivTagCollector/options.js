'use strict';

// ロード時動作
$(document).ready(function(){
	// タグを表示するチェック中だけ、すべてのページにチェックを入れられるようにした。
	$('#pixivShowTagList').click(function(){
		if($('#pixivShowTagList').is(':checked')){
			$('#pixivApplyToAll').prop('disabled', false);
		}else{
			$('#pixivApplyToAll').prop('checked', false).prop('disabled', true);
		}
	});

	// デッドラインを追加するボタン
	$('#deadline-add').click(function(){
		addInputDeadLine('', '', '', '');
	});
	// キャプション検索を追加するボタン
	$('#cation-search-add').click(function(){
		addInputCaptionSearch('','');
	});

	// ナビゲーションリンクをクリックしてスクロールする
	$('#navigation a[href^="#"]').click(function(event){
		var id = $(this).attr('href');
		var offset = 60;
		var target = $(id).offset().top - offset;
		$('html, body').animate({scrollTop:target}, 300);
		event.preventDefault();
		return false;
	});

	// 設定のインポート、エクスポート
	$('#settings-export').click(function(){
		if(window.confirm('入力中の設定を保存しますか？\n(保存した設定のみエクスポートされます)')){
			saveOptions(false);
		}
		$('#settings-import-export').val(JSON.stringify(localStorage.options).replace(/\\/g, '').slice(1).slice(0,-1));
	});
	$('#settings-import').click(function(){
		if(!window.confirm('設定を上書きインポートします。よろしいですか？\n(入力した設定のみインポートされます)')){
			return;
		}
		if($('#settings-import-export').val() === ''){
			return;
		}
		try{
			showOptions(JSON.parse($('#settings-import-export').val()));
			if(window.confirm('インポート後の設定を今すぐ保存しますか？\n(インポート内容は保存した場合のみ有効になります)')){
				saveOptions(false);
			}
		}catch(e){
			alert(e);
		}
	});

	// SAVEボタン押下で saveOptions を呼び出すように設定
	$('#saveOptions').click(function(){ saveOptions(); });

	// 保存済み設定を取得して表示
	if(localStorage.options){
		var options = JSON.parse(localStorage.options);
		showOptions(options);
	}
});

// オプションを表示する
function showOptions(options){
	var i;
	
	// 以下、画面の初期表示を設定
	
	if(options.pixivCompleteTags){
		$('#pixivCompleteTags').val(options.pixivCompleteTags.join('\n'));
	}
	if(options.pixivPartialTags){
		$('#pixivPartialTags').val(options.pixivPartialTags.join('\n'));
	}
	if(options.pixivFilterAlways){
		$('#pixivFilterAlways').val(options.pixivFilterAlways);
	}
	$('#pixivShowCompleteTags').prop('checked', options.pixivShowCompleteTags);
	$('#pixivShowPartialTags').prop('checked', options.pixivShowPartialTags);
	$('#pixivShowCaptionTags').prop('checked', options.pixivShowCaptionTags);
	$('#pixivShowTagList').prop('checked', options.pixivShowTagList);
	$('#pixivApplyToAll').attr('disabled', !options.pixivShowTagList);
	$('#pixivApplyToAll').prop('checked', options.pixivApplyToAll);
	
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
	for(i = 0; i < options.pixivDeadLineName.length; ++i){
		addInputDeadLine(
			  options.pixivDeadLineName[i]
			, options.pixivDeadLineDate[i]
			, options.pixivDeadLineTime[i]
			, options.pixivDeadLineUrl [i]
		);
	}
	// キャプション検索テーブルを生成・設定呼び出し
	$('#caption-search-list').find('tr').not(':first-child').remove();
	for(i = 0; i < options.pixivCaptionSearchName.length; ++i){
		addInputCaptionSearch(
			  options.pixivCaptionSearchName[i]
			, options.pixivCaptionSearchWord[i]
		);
	}

	// テーブルの行を削除するボタン
	$(document).on('click', '.button-clear', function(){
		$(this).closest('tr').remove();
	});

	if(options.pixivSearchNGWords){
		$('#pixivSearchNGWords').val(options.pixivSearchNGWords.join('\n'));
	}
}

function addInputDeadLine(name,date,time,url){
	
	var line = $('table#deadLines').append(
		  '<tr>\n'
		+ '<td><input type="text" class="deadline-name" value="' + name + '"/></td>\n'
		+ '<td><input type="text" class="deadline-datepicker" value="' + date + '"/></td>\n'
		+ '<td><input type="text" class="deadline-timepicker" value="' + time + '"/></td>\n'
		+ '<td><input type="text" class="deadline-url" value="' + url + '"/></td>\n'
		+ '<td><button type="button" class="button-clear deadline-clear">削除</button></td>\n'
		+ '</tr>\n'
	);
	
	var datepicker = line.find('.deadline-datepicker');
	datepicker.removeClass('hasDatepicker');
	datepicker.removeData('datepicker');
	datepicker.removeAttr('id');
	datepicker.unbind();
	datepicker.datepicker();
	datepicker.datepicker('option', 'minDate', new Date());
	
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
function saveOptions(closingForm){
	if(closingForm === undefined){
		closingForm = true;
	}

	var i;
	var line;
	
	// 保存するオプションハッシュをoptionsに新しく作り直す。最終的にこれを保存する。
	var options = {};

	// 以下、保存する値を準備
	
	options.pixivCompleteTags = [];
	var complateTagsText = $('#pixivCompleteTags').val();
	if(complateTagsText){
		complateTagsText = complateTagsText.replace(/[ 　]/g, '');
		complateTagsText = complateTagsText.replace(/\n{2,}/g, '\n');
		complateTagsText = complateTagsText.replace(/^\n|\n$/g, '');
		options.pixivCompleteTags = complateTagsText.split('\n');
	}
	
	options.pixivPartialTags = [];
	var partialTagsText = $('#pixivPartialTags').val();
	if(partialTagsText){
		partialTagsText = partialTagsText.replace(/[ 　]/g, ' ');
		partialTagsText = partialTagsText.replace(/\n{2,}/g, '\n');
		partialTagsText = partialTagsText.replace(/^\n|\n$/g, '');
		options.pixivPartialTags = partialTagsText.split('\n');
	}
	
	options.pixivFilterAlways = $('#pixivFilterAlways').val();
	
	options.pixivShowCompleteTags  = $('#pixivShowCompleteTags').is(':checked');
	options.pixivShowPartialTags   = $('#pixivShowPartialTags').is(':checked');
	options.pixivShowCaptionTags   = $('#pixivShowCaptionTags').is(':checked');
	options.pixivShowTagList       = $('#pixivShowTagList').is(':checked');
	options.pixivApplyToAll        = $('#pixivApplyToAll').is(':checked');

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

	options.pixivDeadLineName = [];
	options.pixivDeadLineDate = [];
	options.pixivDeadLineTime = [];
	options.pixivDeadLineUrl  = [];
	var dl_num = $('table#deadLines tr').length - 1;
	for(i = 0; i < dl_num; ++i){
		line = $('table#deadLines tr').eq((i+1));
		options.pixivDeadLineName[i] = line.find('.deadline-name').val();
		options.pixivDeadLineDate[i] = line.find('.deadline-datepicker').val();
		options.pixivDeadLineTime[i] = line.find('.deadline-timepicker').val();
		options.pixivDeadLineUrl [i] = line.find('.deadline-url').val();
		
		// 入力されていない項目があったらエラーにする
		if(options.pixivDeadLineName[i] === ''){
			window.alert((i+1)+'番目の〆切に名前が入力されていません。');
			return;
		}
		if(options.pixivDeadLineDate[i] === ''){
			window.alert((i+1)+'番目の〆切に日付が入力されていません。');
			return;
		}
		if(options.pixivDeadLineTime[i] === ''){
			window.alert((i+1)+'番目の〆切に時刻が入力されていません。');
			return;
		}
	}

	options.pixivCaptionSearchName = [];
	options.pixivCaptionSearchWord = [];
	var cap_num = $('table#caption-search-list tr').length - 1; 
	for(i = 0; i < cap_num; ++i){
		line = $('table#caption-search-list tr').eq((i+1));
		options.pixivCaptionSearchName[i] = line.find('.caption-search-name').val();
		options.pixivCaptionSearchWord[i] = line.find('.caption-search-word').val();
		
		// 入力されていない項目があったらエラーにする
		if(options.pixivCaptionSearchName[i] === ''){
			window.alert((i+1)+'番目のキャプション検索に名前が入力されていません。');
			return;
		}
		if(options.pixivCaptionSearchWord[i] === ''){
			window.alert((i+1)+'番目のキャプション検索に検索条件が入力されていません。');
			return;
		}
	}

	options.pixivSearchNGWords = [];
	var ngwordsText = $('#pixivSearchNGWords').val();
	if(ngwordsText){
		ngwordsText = ngwordsText.replace(/[ 　]/g, ' ');
		ngwordsText = ngwordsText.replace(/\n{2,}/g, '\n');
		ngwordsText = ngwordsText.replace(/^\n|\n$/g, '');
		options.pixivSearchNGWords = ngwordsText.split('\n');
	}

	// localstorageに設定を保存
	localStorage.options = JSON.stringify(options);

	// 設定タブを閉じる
	if(closingForm === true){
		close();
	}
}
