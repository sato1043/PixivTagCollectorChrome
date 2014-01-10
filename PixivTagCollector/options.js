'use strict';

//デッドラインの数
var DEADLINES_NUM = 3;

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

	// 〆切入力フォームを生成
	for(var i = 0; i < DEADLINES_NUM; i++){
		$('table#deadLines').append(
				  '<tr>\n'
				+ '<td>' + (i+1) + '</td>\n'
				+ '<td><input type="text" id="pixivDeadLineName' + i + '" class="deadline-name"/></td>\n'
				+ '<td><input type="text" id="pixivDeadLineDate' + i + '" class="datepicker"/></td>\n'
				+ '<td><input type="text" id="pixivDeadLineTime' + i + '" class="timepicker"/></td>\n'
				+ '<td><input type="text" id="pixivDeadLineUrl' + i + '" class="deadline-url"/></td>\n'
				+ '<td><button type="button" class="deadline-clear">削除</button></td>\n'
				+ '</tr>\n');
	}
	// 日付時刻入力補助をセット
	$('.datepicker').datepicker();
	$('.datepicker').datepicker("option", 'minDate', new Date()); //今日より前は設定できないようにする
	$('.timepicker').timepicker();
	$('.timepicker').timepicker({
		'timeFormat': 'H:i', //フォーマット(PHPと同じ)
		'step': 60 //何分おきにするか
		});
	// デッドラインをクリアするボタン
	$('.deadline-clear').click(function(){
		$(this).closest('tr').find('input[type="text"]').val('');
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

	// SAVEボタン押下で saveOptions を呼び出すように設定
	$('#saveOptions').click(function(){ saveOptions(); });

	showOptions();
});

// オプションを表示する
function showOptions(){
	// 保存済み設定を取得
	var options = JSON.parse(localStorage.options);

	// 画面の初期表示を設定
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
	for (var i = 0; i < DEADLINES_NUM; ++i ){
		$('#pixivDeadLineName'+i).val(options.pixivDeadLineName[i]);
		$('#pixivDeadLineDate'+i).val(options.pixivDeadLineDate[i]);
		$('#pixivDeadLineTime'+i).val(options.pixivDeadLineTime[i]);
		$('#pixivDeadLineUrl'+i).val(options.pixivDeadLineUrl[i]);
	}

	if (options.pixivSearchNGWords) {
		$("#pixivSearchNGWords").val(options.pixivSearchNGWords.join('\n'));
	}
}

// オプションを保存する
function saveOptions(){
	var options = {};
	var text = '';

	// 保存する値を準備
	text = $("#pixivCompleteTags").val();
	options.pixivCompleteTags = [];
	if (text) {
		text = text.replace(/[ 　]/g, '');
		text = text.replace(/\n{2,}/g, '\n');
		text = text.replace(/^\n|\n$/g, '');
		options.pixivCompleteTags = text.split('\n');
	}
	text = $("#pixivPartialTags").val();
	options.pixivPartialTags = [];
	if (text) {
		text = text.replace(/[ 　]/g, ' ');
		text = text.replace(/\n{2,}/g, '\n');
		text = text.replace(/^\n|\n$/g, '');
		options.pixivPartialTags = text.split('\n');
	}
	options.pixivShowCompleteTags	= $("#pixivShowCompleteTags").is(':checked');
	options.pixivShowPartialTags	= $("#pixivShowPartialTags").is(':checked');
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
	options.pixivDeadLineUrl = [];

	for (var i = 0; i < DEADLINES_NUM; ++i ){
		// まず値をすべて得ておいて、それからその日時について消去or登録をする
		options.pixivDeadLineName[i] = $('#pixivDeadLineName' + i).val();
		options.pixivDeadLineDate[i] = $('#pixivDeadLineDate' + i).val();
		options.pixivDeadLineTime[i] = $('#pixivDeadLineTime' + i).val();
		options.pixivDeadLineUrl[i] = $('#pixivDeadLineUrl'  + i).val();

		// 名前が入っていないDEAD LINEについて、内容を消去する
		if (options.pixivDeadLineName[i] === ""){
			// 日時のどこかが入っていたら、本当に消していいのか尋ねる
			if(options.pixivDeadLineDate[i] !== "" || options.pixivDeadLineTime[i] !== "") {
				if (window.confirm((i+1)+'番目の〆切は名前が入力されていません。\n'
						+'名前のない〆切は保存されませんが、続けてよろしいですか?')){
				} else { // Cancel
					return;
				}
			}
			// DEAD LINEが消去される
			options.pixivDeadLineDate[i] = "";
			options.pixivDeadLineTime[i] = "";
			options.pixivDeadLineUrl[i] = "";
		}
		// 名前が入っているDEAD LINEについて、内容を登録する
		else {
			// 日時のどこかがかけていたらエラー扱い
			if(options.pixivDeadLineDate[i] === "" || options.pixivDeadLineTime[i] === ""){
				if(window.alert((i+1)+'番目のDEAD LINE 「'
						+options.pixivDeadLineName[i]
						+'」 は日時が正しく設定されていません。')){
				} else { // Cancel
					return;
				}
				// DEAD LINEが保存される
				options.pixivDeadLineDate[i] = $('#pixivDeadLineDate' + i).val();
				options.pixivDeadLineTime[i] = $('#pixivDeadLineTime' + i).val();
				options.pixivDeadLineUrl[i] = $('#pixivDeadLineUrl'  + i).val();
			}
		}
	}

	text = $("#pixivSearchNGWords").val();
	options.pixivSearchNGWords = [];
	if (text) {
		text = text.replace(/[ 　]/g, ' ');
		text = text.replace(/\n{2,}/g, '\n');
		text = text.replace(/^\n|\n$/g, '');
		options.pixivSearchNGWords = text.split('\n');
	}

	// localstorageに設定を保存
	localStorage.options = JSON.stringify(options);

	// 設定タブを閉じる
	close();
}
