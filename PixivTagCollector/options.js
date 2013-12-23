'use strict';

//デッドラインの数
var DEADLINES_NUM = 3;

// ロード時動作
$(document).ready(function(){
	// テキストエリアのフォーカスON/OFFでCSSクラスをON/OFFするように設定 //CSSで指定済みのためコメントアウト
//	$('textarea, input').focus(function(){ $(this).addClass   ('selected'); });
//	$('textarea, input').blur (function(){ $(this).removeClass('selected'); });
	
	// タグを表示するチェック中だけ、すべてのページに表示の編集ができるようにした。
	$('#pixivShowTagList').click(function(){
		if ($("#pixivShowTagList").is(':checked')){
			$('#pixivApplyToAll').removeAttr("disabled");
		} else {
			$('#pixivApplyToAll').attr("disabled", "disabled");
		}
	});
	
	//〆切入力フォームを生成
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
	//日付時刻入力補助をセット
	$('.datepicker').datepicker();
	$('.datepicker').datepicker("option", 'minDate', new Date()); //今日より前は設定できないようにする
	$('.timepicker').timepicker();
	$('.timepicker').timepicker({
		'timeFormat': 'H:i', //フォーマット(PHPと同じ)
		'step': 60 //何分おきにするか
		});
	//デッドラインをクリアするボタン
	$('.deadline-clear').click(function(){
		$(this).closest('tr').find('input[type="text"]').val('');
	});
	
	// SAVEボタン押下で saveOptions を呼び出すように設定
	$('#saveOptions').click(function(){ saveOptions(); });

	showOptions();
});

// オプションを表示する
function showOptions(){
	//保存済み設定を取得
	var options = JSON.parse(localStorage.options);
	
	// 画面の初期表示を設定
	if (options.pixivCompleteTags) {
		$("#pixivCompleteTags").val(options.pixivCompleteTags.join('\n'));
	}
	if (options.pixivPartialTags) {
		$("#pixivPartialTags").val(options.pixivPartialTags.join('\n'));
	}
	if (options.pixivShowCompleteTags) {
		$("#pixivShowCompleteTags").attr('checked','checked');
	} else {
		$("#pixivShowCompleteTags").removeAttr('checked');
	}
	if (options.pixivShowPartialTags) {
		$("#pixivShowPartialTags").attr('checked','checked');
	} else {
		$("#pixivShowPartialTags").removeAttr('checked');
	}
	if (options.pixivShowTagList) {
		$("#pixivShowTagList").attr('checked','checked');
	} else {
		$("#pixivShowTagList").removeAttr('checked');
		$('#pixivApplyToAll').attr("disabled", "disabled");
	}
	
	if (options.pixivShowLogo){
		$("#pixivShowLogo").attr('checked','checked');
	} else {
		$("#pixivShowLogo").removeAttr('checked');
	}
	
	if (options.pixivShowMyProfile) {
		$("#pixivShowMyProfile").attr('checked','checked');
	} else {
		$("#pixivShowMyProfile").removeAttr('checked');
	}
	if (options.pixivShowMyMenu) {
		$("#pixivShowMyMenu").attr('checked','checked');
	} else {
		$("#pixivShowMyMenu").removeAttr('checked');
	}
	if (options.pixivShowMyGroup) {
		$("#pixivShowMyGroup").attr('checked','checked');
	} else {
		$("#pixivShowMyGroup").removeAttr('checked');
	}
	if (options.pixivShowOfficialGroup) {
		$("#pixivShowOfficialGroup").attr('checked','checked');
	} else {
		$("#pixivShowOfficialGroup").removeAttr('checked');
	}
	if (options.pixivShowRecommendUser) {
		$("#pixivShowRecommendUser").attr('checked','checked');
	} else {
		$("#pixivShowRecommendUser").removeAttr('checked');
	}
	if (options.pixivShowFollowing) {
		$("#pixivShowFollowing").attr('checked','checked');
	} else {
		$("#pixivShowFollowing").removeAttr('checked');
	}
	if (options.pixivShowMyPixiv) {
		$("#pixivShowMyPixiv").attr('checked','checked');
	} else {
		$("#pixivShowMyPixiv").removeAttr('checked');
	}
	if (options.pixivShowEvents) {
		$("#pixivShowEvents").attr('checked','checked');
	} else {
		$("#pixivShowEvents").removeAttr('checked');
	}
	
	if (options.pixivShowNewIllust) {
		$("#pixivShowNewIllust").attr('checked','checked');
	} else {
		$("#pixivShowNewIllust").removeAttr('checked');
	}
	if (options.pixivShowPopularTags) {
		$("#pixivShowPopularTags").attr('checked','checked');
	} else {
		$("#pixivShowPopularTags").removeAttr('checked');
	}
	if (options.pixivShowUserEvent) {
		$("#pixivShowUserEvent").attr('checked','checked');
	} else {
		$("#pixivShowUserEvent").removeAttr('checked');
	}
	if (options.pixivShowBookmarkNews) {
		$("#pixivShowBookmarkNews").attr('checked','checked');
	} else {
		$("#pixivShowBookmarkNews").removeAttr('checked');
	}
	if (options.pixivShowMyPixivNews) {
		$("#pixivShowMyPixivNews").attr('checked','checked');
	} else {
		$("#pixivShowMyPixivNews").removeAttr('checked');
	}
	
	if (options.pixivShowNewsTop) {
		$("#pixivShowNewsTop").attr('checked','checked');
	} else {
		$("#pixivShowNewsTop").removeAttr('checked');
	}
	if (options.pixivShowDailyRank) {
		$("#pixivShowDailyRank").attr('checked','checked');
	} else {
		$("#pixivShowDailyRank").removeAttr('checked');
	}
	if (options.pixivShowComicRank) {
		$("#pixivShowComicRank").attr('checked','checked');
	} else {
		$("#pixivShowComicRank").removeAttr('checked');
	}
	if (options.pixivShowOtherRank) {
		$("#pixivShowOtherRank").attr('checked','checked');
	} else {
		$("#pixivShowOtherRank").removeAttr('checked');
	}
	if (options.pixivShowMaleRank) {
		$("#pixivShowMaleRank").attr('checked','checked');
	} else {
		$("#pixivShowMaleRank").removeAttr('checked');
	}
	if (options.pixivShowRookieRank) {
		$("#pixivShowRookieRank").attr('checked','checked');
	} else {
		$("#pixivShowRookieRank").removeAttr('checked');
	}
	if (options.pixivShowDicRank) {
		$("#pixivShowDicRank").attr('checked','checked');
	} else {
		$("#pixivShowDicRank").removeAttr('checked');
	}
	if (options.pixivShowOriginalRank) {
		$("#pixivShowOriginalRank").attr('checked','checked');
	} else {
		$("#pixivShowOriginalRank").removeAttr('checked');
	}
	if (options.pixivShowNovelRank) {
		$("#pixivShowNovelRank").attr('checked','checked');
	} else {
		$("#pixivShowNovelRank").removeAttr('checked');
	}
	
	if (options.pixivApplyToAll){
		$("#pixivApplyToAll").attr('checked','checked');
	} else {
		$("#pixivApplyToAll").removeAttr('checked');
	}
	if (options.pixivOpenInNewTab) {
		$("#pixivOpenInNewTab").attr('checked','checked');
	} else {
		$("#pixivOpenInNewTab").removeAttr('checked');
	}
	/*
	if (options.pixivReloadPage) {
		$("#pixivReloadPage").attr('checked','checked');
	} else {
		$("#pixivReloadPage").removeAttr('checked');
	}
	*/
	for (var i = 0; i < DEADLINES_NUM; ++i ){
		$('#pixivDeadLineName'+i).val(options['pixivDeadLineName'+[i]]);
		$('#pixivDeadLineDate'+i).val(options['pixivDeadLineDate'+[i]]);
		$('#pixivDeadLineTime'+i).val(options['pixivDeadLineTime'+[i]]);
		$('#pixivDeadLineUrl'+i).val(options['pixivDeadLineUrl'+[i]]);
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
	options.pixivShowMyMenu		= $("#pixivShowMyMenu").is(':checked');
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
	//options.pixivReloadPage		= $("#pixivReloadPage").is(':checked');
	
	for (var i = 0; i < DEADLINES_NUM; ++i ){
		// まず値をすべて得ておいて、それからその日時について消去or登録をする
		options['pixivDeadLineName'+[i]] = $('#pixivDeadLineName' + i).val();
		options['pixivDeadLineDate'+[i]] = $('#pixivDeadLineDate' + i).val();
		options['pixivDeadLineTime'+[i]] = $('#pixivDeadLineTime' + i).val();
		options['pixivDeadLineUrl' +[i]] = $('#pixivDeadLineUrl'  + i).val();

		// ・名前が入っていないDEAD LINEについて、内容を消去する
		if (options['pixivDeadLineName'+[i]] === ""){
			// 日時のどこかが入っていたら、本当に消していいのか尋ねる
			if(options['pixivDeadLineDate'+[i]] !== "" || options['pixivDeadLineTime'+[i]] !== "") {
				if (window.confirm((i+1)+'番目の〆切は名前が入力されていません。\n'
						+'名前のない〆切は保存されませんが、続けてよろしいですか?')){
				} else { // Cancel
					return;
				}
			}
			// DEAD LINEが消去される
			options['pixivDeadLineDate'+[i]] = "";
			options['pixivDeadLineTime'+[i]] = "";
			options['pixivDeadLineUrl' +[i]] = "";
		}
		// 名前が入っているDEAD LINEについて、内容を登録する
		else {
			// 日時のどこかがかけていたらエラー扱い
			if(options['pixivDeadLineDate'+[i]] === "" || options['pixivDeadLineTime'+[i]] === ""){
				if(window.alert((i+1)+'番目のDEAD LINE 「'
						+options['pixivDeadLineName'+[i]]
						+'」 は日時が正しく設定されていません。')){
				} else { // Cancel
					return;
				}
				// DEAD LINEが保存される
				options['pixivDeadLineDate'+[i]] = $('#pixivDeadLineDate' + i).val();
				options['pixivDeadLineTime'+[i]] = $('#pixivDeadLineTime' + i).val();
				options['pixivDeadLineUrl' +[i]] = $('#pixivDeadLineUrl'  + i).val();
			}
		}
	}
	
	// localstorageに設定を保存
	localStorage.options = JSON.stringify(options);
	
	//設定タブを閉じる
	close();
}
