# MazMon
2023.11 web3 Global Hackathon に提出したプロジェクト
https://app.akindo.io/hackathons/aA8Ek0mDGS8kdZoMe

スマートフォンアプリの操作により、ドライブの軌跡のGPS情報と部品画像をNFT化する。<br>
詳細はこちら<br>
https://app.akindo.io/communities/27mmW8jKji236A0l/products/o677vWdgqUAAdLXK

<br>

## フォルダ構成
├ app/  <br>
├ mintNFT/  <br>
├ trackingDrivingData/ <br>
├ saveDrivingData/ <br>

## 各プロジェクトの説明

### app
- スマートフォンアプリ部分
<br>

### mintNFT
- NFTを作成する部分
- アプリからのHTTP通信（POST)で呼ばれる。

【呼び出し方法（POST)】
- エンドポイントURL<br>
https://immense-scrubland-90113-e49c94292646.herokuapp.com/
<br>

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
https://testnets.opensea.io/collection/tatsuya
<br><br>

以下のcURL文で試すことができます。
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


### trackingDrivingData
- ドライブデータをトラッキングする部分
- アプリからのHTTP通信で作動する。
<br><br>

### saveDrivingData/
- ドライブデータを保存する部分
- アプリからのHTTP通信で作動する。
  
<br>
