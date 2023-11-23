HTTP通信（POST)で呼ばれ、NFTをテストネットに生成する。

なお、NFTのコントラクトはRemixでテストネットgoerliに生成済み<br>
NFTのコントラクトは詳細はこちら https://goerli.etherscan.io/token/0xa57193A15552FB27eD1e66C68A380EeA603b313c


【呼び出し方法（POST)】

- エンドポイントURL<br>
  https://immense-scrubland-90113-e49c94292646.herokuapp.com/

- JSONファイル
```
{
 “description”: “説明“,
 “external_url”: “走行データのcsvのURL“,
 “image”: “部品画像のURL“,　//これがNFTになります
 “name”: “名前”
}
```
<br>
NFTが作成されるとこちらで確認できます。<br>
https://testnets.opensea.io/collection/autoparts
<br><br>

以下のcURL文で試すことができます。<br>
external_urlは、実際のGPSのトラッキングデータです。

```
curl -X POST https://immense-scrubland-90113-e49c94292646.herokuapp.com/ \
-H "Content-Type: application/json" \
-d '{
  "description": "something",
  "external_url": "https://mazmon.s3.ap-northeast-1.amazonaws.com/11111_20231106094032.csv",
  "image": "画像のURL",
  "name": "something"
}'

```

