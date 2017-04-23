pixivTagCollectorChrome 開発方法
================================

2016/10/28 - sato1043@gmail.com


# TODO

	* pixivを開いているタブ(ウィンドウ?)のリロード


# 前提

	- すいません。今のところUNIXベースOS前提です。

	- node.js v4 (v6に以降予定)
	- webpack 1.x
	- babel 6.x
	- eslint 2.x


# プロダクションビルド

	- git clone git@github.com:sato1043/PixivTagCollectorChrome.git
	- npm install
	- npm start


# 開発

	- 開発前に git co -b MY_WORK_BRANCH

	- MY_WORK_BRANCH へ、小さめの変更単位でコミット

	- テストコードで対象を実行しながら機能追加していこう！
		- といいつつ自分もできていないので徐々に適応していきましょう。
		- まず、"こうなると思うな"という結果を、コードで書いてみる
			- 試せるなら、完璧なテストでなくていい
			- この変数は結果として"Hello"になるはず、ここには"Hello"を表示するはず、など。
			- まだ対象の実装はしない
			- 実装していないのでテストが失敗するはず。というかテストが失敗するように書く
    - テストが成功するだけのことを書く
    	- テストが成功するだけ以上のことは書かなくてOK

	- なので開発中はテストサーバーを立てると効率的（なくても npm test でテストできる）
		- npm run start-test-server
		- npm run test-by-server
		- npm run stop-test-server

	- すべての変更を削除して最終コミットへ巻きもどしたいなら git reset --hard


# マーリクのしかた

	- 開発が終わった時に master にrebaseとmarge
		- git commit
		- git co master
		- git pull master
		- git co MY_WORK_BRANCH
		- git stash (コミットしていない変更があるときだけ必要)
		- git rebase -i master (自分のコミットを整理（まとめたり、並べ替えたり）)
		- git co master
		- git pull master (何かしらpullってきたらもう一度rebase)
		- git marge --ff MY_WORK_BRANCH
		- git co MY_WORK_BRANCH
		- git stash pop (rebase前にstashしたときだけ必要)
		- マーリクする


__END__
