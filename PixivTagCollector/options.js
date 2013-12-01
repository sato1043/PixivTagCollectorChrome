'use strict';

// ロード時動作
$(document).ready(function(){
	showOptions();
});

// DEAD LINEの日時を表示するINPUTのIDを導くための定数
var idNm = new Array('1Name','2Name','3Name');
var idY  = new Array('1Y','2Y','3Y');
var idM  = new Array('1M','2M','3M');
var idD  = new Array('1D','2D','3D');
var idHH = new Array('1HH','2HH','3HH');
var idMM = new Array('1MM','2MM','3MM');

// 日時入力関係のユーティリティ
function setupDayList(idY,idM,idD){
	var oldValue = $('#pixivDeadLines'+idD).val();
	$('#pixivDeadLines'+idD).empty();
	$('#pixivDeadLines'+idD).append($('<option value=""></option>'));

	var year = $('#pixivDeadLines'+idY+' option:selected').val();
	var month = $('#pixivDeadLines'+idM+' option:selected').val();
	var date = new Date(year, month, 0);
	var lastday = date.getDate();
	for (var i = 1; i <= lastday; ++i) {
		$('#pixivDeadLines'+idD).append(
			$('<option value='+i+'>'+i+'</option>'));
	}
	$('#pixivDeadLines'+idD).val(oldValue);
}
function setupYearList(idY,idM,idD){
	$('#pixivDeadLines'+idY).empty();
	$('#pixivDeadLines'+idY).append($('<option value=""></option>'));
	for (var i = 13; i <= 20; ++i) {
		$('#pixivDeadLines'+idY).append(
			$('<option value='+i+'>'+i+'</option>'));
	}
	$('#pixivDeadLines'+idY).change(function(){setupDayList(idY,idM,idD);});
}
function setupMonthList(idY,idM,idD){
	$('#pixivDeadLines'+idM).empty();
	$('#pixivDeadLines'+idM).append($('<option value=""></option>'));
	for (var i = 1; i <= 12; ++i) {
		$('#pixivDeadLines'+idM).append(
			$('<option value='+i+'>'+i+'</option>'));
	}
	$('#pixivDeadLines'+idM).change(function(){setupDayList(idY,idM,idD);});
}
function setupTimeList(idH,idM){
	$('#pixivDeadLines'+idH).empty();
	$('#pixivDeadLines'+idH).append($('<option value=""></option>'));
	$('#pixivDeadLines'+idM).empty();
	$('#pixivDeadLines'+idM).append($('<option value=""></option>'));
	for (var i = 0; i <= 23; ++i) {
		$('#pixivDeadLines'+idH).append(
			$('<option value='+i+'>'+i+'</option>'));
	}
	for (var i = 0; i <= 59; ++i) {
		$('#pixivDeadLines'+idM).append(
			$('<option value='+i+'>'+i+'</option>'));
	}
}

// オプションを表示する
function showOptions(){
	
	//デッドラインの日時の初期値を設定
	for (var i = 0; i < 3; ++i ){
		setupYearList (idY[i],idM[i],idD[i]);
		setupMonthList(idY[i],idM[i],idD[i]);
		setupDayList  (idY[i],idM[i],idD[i]);
		setupTimeList (idHH[i],idMM[i]);
	}

	// テキストエリアのフォーカスON/OFFでCSSクラスをON/OFFするように設定
	$('textarea, input').focus(function(){ $(this).addClass   ('selected'); });
	$('textarea, input').blur (function(){ $(this).removeClass('selected'); });
	
	// タグを表示するチェック中だけ、すべてのページに表示の編集ができるようにした。
	$('#pixivShowTagList').click(function(){
		if ($("#pixivShowTagList").is(':checked')){
			$('#pixivApplyToAll').removeAttr("disabled");
		} else {
			$('#pixivApplyToAll').attr("disabled", "disabled");
		}
	});
	
	// SAVEボタン押下で saveOptions を呼び出すように設定
	$('#saveOptions').click(function(){ saveOptions(); });

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
	for (var i = 0; i < 3; ++i ){
		$('#pixivDeadLines'+idNm[i]).val(options['pixivDeadLines'+idNm[i]]);
		$('#pixivDeadLines'+idY [i]).val(options['pixivDeadLines'+idY [i]]);
		$('#pixivDeadLines'+idM [i]).val(options['pixivDeadLines'+idM [i]]);
		$('#pixivDeadLines'+idD [i]).val(options['pixivDeadLines'+idD [i]]);
		$('#pixivDeadLines'+idHH[i]).val(options['pixivDeadLines'+idHH[i]]);
		$('#pixivDeadLines'+idMM[i]).val(options['pixivDeadLines'+idMM[i]]);
	}
}

// オプションを保存する
function saveOptions(){
	
	var options = {};
	var text = '';

	// 保存する値を準備
	text = $("#pixivCompleteTags").val();
	options.pixivCompleteTags = new Array();
	if (text) {
		text = text.replace(/[ 　]/g, '');
		text = text.replace(/\n{2,}/g, '\n');
		text = text.replace(/^\n|\n$/g, '');
		options.pixivCompleteTags = text.split('\n');
	}
	text = $("#pixivPartialTags").val();
	options.pixivPartialTags = new Array();
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
	options.pixivShowMyMenu 		= $("#pixivShowMyMenu").is(':checked');
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
	
	for (var i = 0; i < 3; ++i ){
		// まず値をすべて得ておいて、それからその日時について消去or登録をする
		options['pixivDeadLines'+idNm[i]] = $('#pixivDeadLines'+idNm[i]).val();
		options['pixivDeadLines'+idY [i]] = $('#pixivDeadLines'+idY [i]).val();
		options['pixivDeadLines'+idM [i]] = $('#pixivDeadLines'+idM [i]).val();
		options['pixivDeadLines'+idD [i]] = $('#pixivDeadLines'+idD [i]).val();
		options['pixivDeadLines'+idHH[i]] = $('#pixivDeadLines'+idHH[i]).val();
		options['pixivDeadLines'+idMM[i]] = $('#pixivDeadLines'+idMM[i]).val();
		
		// ・名前が入っていないDEAD LINEについて、内容を消去する
		if (options['pixivDeadLines'+idNm[i]] === ""){
			// 日時のどこかが入っていたら、本当に消していいのか尋ねる
			if (options['pixivDeadLines'+idNm[i]] !== ""
			 || options['pixivDeadLines'+idY [i]] !== ""
			 || options['pixivDeadLines'+idM [i]] !== ""
			 || options['pixivDeadLines'+idD [i]] !== ""
			 || options['pixivDeadLines'+idHH[i]] !== ""
			 || options['pixivDeadLines'+idMM[i]] !== "" ){
				if (window.confirm((i+1)+'番目のDEAD LINEは日時のどこかだけ入力されています。\n'
					+'名前のないDEAD LINEは消去されますが、続けますか？')){
				} else {
					return; // Cancel
				}
			}
			// DEAD LINEが消去される
			options['pixivDeadLines'+idY [i]] = "";
			options['pixivDeadLines'+idM [i]] = "";
			options['pixivDeadLines'+idD [i]] = "";
			options['pixivDeadLines'+idHH[i]] = "";
			options['pixivDeadLines'+idMM[i]] = "";
		}
		// ・名前が入っているDEAD LINEについて、内容を登録する
		else {
			// 日時のどこかがかけていたらエラー扱い
			if (options['pixivDeadLines'+idY [i]] === ""
			 || options['pixivDeadLines'+idM [i]] === ""
			 || options['pixivDeadLines'+idD [i]] === ""
			 || options['pixivDeadLines'+idHH[i]] === ""
			 || options['pixivDeadLines'+idMM[i]] === "" ){
				window.alert((i+1)+'番目のDEAD LINE 「'
					+options['pixivDeadLines'+idNm[i]]
					+'」 は日時のどこかが欠けていて内容が無効です。修正願います。');
				$('#pixivDeadLines'+idNm[i]).focus();
				return; // Cancel
			}
			// DEAD LINEが保存される
			options['pixivDeadLines'+idY [i]] = $('#pixivDeadLines'+idY [i]).val();
			options['pixivDeadLines'+idM [i]] = $('#pixivDeadLines'+idM [i]).val();
			options['pixivDeadLines'+idD [i]] = $('#pixivDeadLines'+idD [i]).val();
			options['pixivDeadLines'+idHH[i]] = $('#pixivDeadLines'+idHH[i]).val();
			options['pixivDeadLines'+idMM[i]] = $('#pixivDeadLines'+idMM[i]).val();
		}
	}

	// localstorageに設定を保存
	localStorage.options = JSON.stringify(options);

	//設定タブを閉じる
	close();
}
