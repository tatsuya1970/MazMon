# MazMon

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

### trackingDrivingData
- ドライブデータをトラッキングする部分
- アプリからのHTTP通信で作動する。
<br><br>

### saveDrivingData/
- ドライブデータを保存する部分
- アプリからのHTTP通信で作動する。
  
<br>
