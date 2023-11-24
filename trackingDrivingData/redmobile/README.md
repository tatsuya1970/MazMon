# 概要
Androidで動作するNode-RED、[RedMobile](https://play.google.com/store/apps/details?id=com.okhiroyuki.redmobile&hl=ja)で動作するGPSトラッキングアプリです。

# 使い方
RedMobileでJSONファイルを読み込むとフローが展開されますので、デプロイすると使えるようになります。
開始、終了、およびリセット（開始時刻を初期化）はアプリが搭載されたスマートフォンのブラウザから以下のAPIリクエストをコールして動かします。
http://127.0.0.1:1880/api/start?id=${id}
http://127.0.0.1:1880/api/stop
http://127.0.0.1:1880/api/reset

参考までにテスト用のHTMLをtest.htmlとして入れておきます。
こちらをスマートフォンがアクセス可能なWebサーバーに入れてお使いください。
