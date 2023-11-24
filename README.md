# MazMon
2023.11 web3 Global Hackathon に提出したプロジェクト<br>
https://app.akindo.io/hackathons/aA8Ek0mDGS8kdZoMe

スマートフォンアプリの操作により、ドライブの軌跡のGPS情報と部品画像をNFT化する。<br>
詳細はこちら<br>
https://app.akindo.io/communities/27mmW8jKji236A0l/products/o677vWdgqUAAdLXK

<br>

## フォルダ構成
├ app/  <br>
├ mintNFT/  <br>
├ saveDrivingData/ <br>
├ trackingDrivingData/ <br>


　<br>
## 各プロジェクトの説明
詳細は各プロジェクトのREADME.mdに記載

### app
- スマートフォンアプリ部分
<br>

### mintNFT
- NFTを作成する部分
- アプリからのHTTP通信（POST)で呼ばれる。
- NFTのコントラクトはRemixでテストネットgoerliに生成済み<br>
  （NFTのコントラクトは詳細はこちら）
  https://goerli.etherscan.io/token/0xa57193A15552FB27eD1e66C68A380EeA603b313c

<br>


### trackingDrivingData
- ドライブデータをトラッキングする部分
- アプリからのHTTP通信で作動する。
<br><br>

### saveDrivingData/
- ドライブデータを保存する部分
- アプリからのHTTP通信で作動する。
  
<br>
