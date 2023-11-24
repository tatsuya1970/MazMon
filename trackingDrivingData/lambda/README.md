# 概要
スマートフォンからSORACOMに送信された緯度経度情報をAmazon S3のバケットにCSVとして保存するコードです。
ファイル名は送信データに含まれるcar_idとstart_dateから「{car_id}_{YYYYMMDDhhmmss}.csv」というフォーマットとなります。

# 参考情報
SORACOM FunkとAWS Lambdaの連携については、以下を参考にしてください。
https://users.soracom.io/ja-jp/docs/funk/enable-funk/

# 使い方
作成バージョンはPython 3.11です。
S3はパブリックアクセスを許可したバケットをあらかじめ準備する必要があり、コード内のバケット名「bucket_name」は適宜編集して使う必要があります。
