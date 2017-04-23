# 履歴

* 2017/04/22 - 1.0.0
	- change) webpack/babel/eslintのビルドに変えました。今後のために。しかし自動テストもまだテキトーです。
	- refactor) ソースコードをフォーマット
	- fix) content_script が http を対象にして動いていた。
	- fix) NGワード機能でimgをdisplay:noneできていなかった。
	- change) 設定画面の日時のピッカーを pickadate.js に変えました(jquery-uiをwebpackで動かせなかったため)
	- 手動テストしました。

* 2015/01/19 - 0.17
	- 常に追加する条件を設定できるように

* 2015/01/06 - 0.13 〜 0.16
	- pixivの仕様変更に対応し、タグリストの表示位置を調整
	- バグ取り
	- fix) autoPatchWorkの２ページ目以降でもNGワードがかかるように
	- fix) マイページでタグリストが表示できるように訂正
	- fix) copyrightの年号を更新など

* 2014/08/14 - 0.12
	- 百科事典の人気記事の表示ON/OFFが動かなくなっていたので修正

* 2014/08/14 - 0.11
	- うごイラデイリーランキングのON/OFFを追加

* 2014/04/30 - 0.10.3 (aka. 1.0alpha)
* 2014/04/11 - 0.10.2 (aka. 1.0alpha)
* 2014/04/11 - 0.10.1 (aka. 1.0alpha)
* 2014/03/29 - 0.10   (aka. 1.0alpha)
	- Chrome WebStoreに登録するために小修正(仮)

* 2014/03/29 - 0.9.5 (aka. 1.0alpha)
	- 設定のインポート・エクスポートを追加(oui)
	- JetBrains WebStormをエディタに採用

* 2014/02/12 - 0.9.4 (aka. 1.0alpha)
	- CSS修正

* 2014/01/26 - 0.9.3 (aka. 1.0alpha)
	- manifest.jsonがコミットできない件訂正

* 2014/01/26 - 0.9.2 (aka. 1.0alpha)
* 2014/01/20 - 0.9.1 (aka. 1.0alpha)
* 2014/01/18 - 0.9.0 (aka. 1.0alpha)
	- キャプション検索機能を実装および修正

* 2014/01/13 - 0.8.3 (aka. 1.0alpha)
* 2014/01/13 - 0.8.2 (aka. 1.0alpha)
	- 自動アップデートのURLを修正
	http://developer.chrome.com/extensions/autoupdate.html

* 2014/01/13 - 0.8.1 (aka. 1.0alpha)
	- 拡張機能ページに"ウェブサイトにアクセスする"を表示

* 2014/01/13 - 0.8 (aka. 1.0alpha)
	- ブックマーク詳細ページのブックマークしているユーザのリンクを
	  作品一覧ページに変更する オプションを追加
	- 試験的に自動アップデートを実装(pemが同じだからいけるかな)
	- 若干のコード修正

* 2014/01/03 - 0.7.2 (aka. 1.0alpha)
* 2014/01/02 - 0.7.1 (aka. 1.0alpha)
    - タグがクリックできない場合があったので修正

* 2013/12/30 - 0.7 (aka. 1.0alpha)
    - 検索結果のNGワード機能追加

* 2013/12/30 - 0.6 (aka. 1.0alpha)
    - Chromeのmanifest.json 2に対応(oui)
    - UIをおおはばに改善(oui)
    - 〆切りタイマー機能を追加(oui)
    - 現状のpixivに対応
    - AutoPagerize / AutoPatchwork の動作に対応
    - マイページのパーツ表示切り替え機能を追加

* 2012/08/09
    - 流用・公開の許可をいただきました。

* 2012/05/20 - 0.3
    - create a git repository
    - modify our file layout

* 2012/05/19 - 0.2
    - works `mouseover'
    - works `open in a new tab'
    - click browser action button then get pixiv tab

* 2012/05/03 - 0.1
    - created

