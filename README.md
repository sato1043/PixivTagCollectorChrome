pixivTagCollectorChrome
=======================

pixiv Tag Collector for Chrome extentions Version 1.0alpha

Home:
  https://github.com/sato1043/PixivTagCollectorChrome

Authers:
  sato1043 and monsier-oui

  
はじめまして。
pixiv Tag Collector Chrome拡張版のリリースをご案内します。

これはpivivのタグ巡回を快適にするChrome拡張です。
pixivの普段使いの検索リンクをクリックしやすい位置に常に表示します。
このChrome拡張はあなたが見るpixivの見た目を多少書き換えます。


## できること
* pixivでよく検索するタグや検索キーワード(and/or/マイナス検索)をクリックしやすい位置に常に表示
* 〆切日時を３つまで設定し、残り時間とあわせて常に表示(いわゆるデッドラインタイマーです)
* マイページの自分があんまり使わないパーツを表示/非表示切り替え
* 検索結果をクリックしたときに別ウィンドウに開くように指定
* 検索結果にNGワードを設定し、サムネイルを非表示
* ブックマーク詳細ページのブックマークしているユーザのリンクを作品一覧ページに変更

この拡張のオリジナルはGreasemonkeyスクリプトの pixiv tag collector for Greasemonkey です。  
(オリジナル版: http://wazly.blog87.fc2.com/blog-entry-199.html )  
これが使えなくて Chrome が不便だった方にどうぞ。

ただし、このChrome拡張はオリジナルの作者様とは関わりがありませんので、
このChrome拡張へのお問い合わせは私(sato1043@gmail.com)にお願い致します。


## ダウンロード
* pixivTagCollector.crx ... Chrome拡張。これだけです。
https://github.com/sato1043/PixivTagCollectorChrome/raw/master/PixivTagCollector.crx


## インストール
Chromeを起動して、メニューから[ツール]-[機能拡張]を開きます。
その中へ pixivTagCollector.crx をドロップしてください。
機能拡張の問題が指摘されますが、それに同意頂ければインストールは完了です。


## アンインストール
Chromeを起動して、メニューから[ツール]-[機能拡張]を開きます。
pixivTagCollector行の右端にあるゴミ箱アイコンをクリックしてください。
機能拡張は削除され、設定も残りません。


## アップデート
機能拡張の新しいリリースがあると自動アップデートされます。
更新の確認はデフォルトでは数時間おきです。

手動の場合、まず、以前のバージョンのオプションをどこかにコピペしてバックアップしておいてください。
それと、現状のバージョン番号を控えておいて下さい。

Chromeを起動して、メニューから[ツール]-[機能拡張]を開き、
その中へ pixivTagCollector.crx をドロップしてください。
バージョン番号が上がっていれば成功です。設定を確認したらバックアップや控えは破棄できます。


## 設定
インストール後にツールバーにボタンが増えます。それをクリックしてください。
メニューが現れますので、設定を開き、ご自分用のタグを追加して下さい。
（もしくは以前の設定をコピペしてください。）

左のテキストエリアが「一文字たがわず同じタグの絵の検索」を書き込むところ、
右のテキストエリアが「一部同じ言葉を含むタグの絵の検索」を書き込むところです。
いずれも、１行１単語で書くようにおねがいします。

設定を変えたら必ずSaveを押してください。
また、変更した設定をpixivに反映するには一度ページをリロードしてください。


## 動作確認
タグを設定してpixivを開きます。
ページの先頭にタグの一覧が現れるはずです。
タグをクリックしてみてください。pixivの検索結果が開きます。


## 謝辞
  * オリジナルの作者 カンジャさんに感謝致します。
  * ouiさんは、やるきのない私にやる気をくれました。ありがとうございます。
  * それからいつも応援してくれる私のメインユーザに。いつもありがとう。
  * それと最後にpixivに。


## TODO
  * pixivを開いているタブ(ウィンドウ?)のリロード


## 履歴
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

__END__
