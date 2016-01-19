pixivTagCollectorChrome
=======================

Pixiv Tag Collector for Chrome Version 1.0alpha

Home:
  https://github.com/sato1043/PixivTagCollectorChrome

Authors:
  sato1043 and monsier-oui


はじめまして。
Pixiv Tag Collector for Chromeのリリースをご案内します。

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
(オリジナル版: http://wazly.blog87.fc2.com/blog-entry-199.html
            http://wazly.blog87.fc2.com/blog-entry-336.html )
これが使えなくて Chrome が不便だった方にどうぞ。

ただし、このChrome拡張はオリジナルの作者様とは関わりがありませんので、
このChrome拡張へのお問い合わせは私(sato1043@gmail.com)にお願い致します。

なお、このソフトウェアはMITライセンスに基づきオープンソースソフトウェアとして配布いたします。
商用・非商用に関わらず自己責任でご自由にお使いください。


## インストール
Chromeを起動して、メニューから[ツール]-[機能拡張]を開きます。
画面を一番下へスクロールして「他の拡張機能を見る」をクリックします。
Chromeウェブストアが開きますので「Pixiv Tag Collector for Chrome」で検索します。


## アンインストール
Chromeを起動して、メニューから[ツール]-[機能拡張]を開きます。
pixivTagCollector行の右端にあるゴミ箱アイコンをクリックしてください。
機能拡張は削除され、設定も残りません。


## アップデート
機能拡張の新しいリリースがあると自動アップデートされます。
更新の確認はデフォルトでは数時間おきです。


## 設定
インストール後にツールバーにボタンが増えます。それをクリックしてください。
メニューが現れますので、PixivTagCollector設定を開き、ご自分用のタグを追加して下さい。
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

  * tags icon, a part of Elegant Icon Font, was created by Elegant Themes, Inc.(TM)
	these icons are dual licensed under the GPL 2.0 and MIT.
    http://www.elegantthemes.com/
	i use this icon under the MIT license.


## TODO
  * pixivを開いているタブ(ウィンドウ?)のリロード

  このソフトウェアに対するあらゆる前向きなご提案を喜んでお伺いいたします。
  （個人の余力の範囲ですので難しいこともありますが、その節はどうぞご理解ください）


## 履歴
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




## 本ソフトの配布条項

The MIT License (MIT)

Copyright (c) \<2012-2016\> \<Pixiv Tag Collector for Chrome Authors.\>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


## Elegant Icon Font(本ソフト使用のアイコン) の配布条項

The MIT License (MIT)

Copyright (c) \<2013\> \<Elegant Themes, Inc.\>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

__END__
