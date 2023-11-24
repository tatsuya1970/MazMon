HTTP通信（POST)で呼ばれ、NFTをテストネットに生成する。

なお、NFTのコントラクトはRemixでテストネットgoerliに生成済み<br>
NFTのコントラクトは詳細はこちら https://goerli.etherscan.io/token/0xa57193A15552FB27eD1e66C68A380EeA603b313c

<br><br>
【呼び出し方法（POST)】

以下のJSONファイルをPOSTするだけです。
- JSONファイル
```
{
 “description”: “説明“,
 “external_url”: “走行データのcsvのURL“,
 “image”: “部品画像のURL“,　//これがNFTになります
 “name”: “名前”
}
```


