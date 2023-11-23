require('dotenv').config();

const { ethers } = require("ethers");
const pinataSDK = require('@pinata/sdk');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


app.post('/', function(req, res) {

    console.log(req.body);

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const provider = new ethers.AlchemyProvider('goerli', ALCHEMY_API_KEY)
const privateKey = process.env.METAMASK_PRIVATE_KEY

const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

const axios = require('axios');
const fs = require('fs');

const imageURL = req.body.image;
const localPath = './pic.png';

downloadImage(imageURL, localPath).then((values) => {
    console.log('Download completed');

    const readableStreamForFile = fs.createReadStream('./pic.png');
    const options = {
      pinataMetadata: {name: 'AutoParts'}
    };

    pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        //handle results here
        console.log(result);
    
        const metadata = 
        {
            "description" : req.body.description,
            "external_url": req.body.external_url, 
            "image" : "https://gateway.pinata.cloud/ipfs/"+result.IpfsHash ,
            "name" : req.body.name
        };
    
        createFile('nft-metadata.json', metadata);
    
        const readableStreamForFile2 = fs.createReadStream('./nft-metadata.json');
    
        const options2 = {
            pinataMetadata: {name: 'AutoParts'}
        };
    
        pinata.pinFileToIPFS(readableStreamForFile2, options2).then((result) => {
    
           
        const signer = new ethers.Wallet(privateKey, provider)
      
        const abi = require("./abi3.json")  //AutoPartsのABI
    
        const contractAddress = '0xa57193A15552FB27eD1e66C68A380EeA603b313c' //AutoPartsのNFTのコントラクトアドレス
    
        // Create a contract instance
        const myNftContract = new ethers.Contract(contractAddress, abi, signer)
    
        const tokenUri = "https://gateway.pinata.cloud/ipfs/"+result.IpfsHash;
    
        
        // Call mintNFT function
        const mintNFT = async () => {  
        let nftTxn = await myNftContract.safeMint(signer.address, tokenUri)
        await nftTxn.wait()
        console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
        res.send(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash} and OpenSea:https://testnets.opensea.io/collection/autoparts` )
        }

        mintNFT();

    
        }).catch((err) => {
            //handle error here
            console.log(err);
        });
        
        
    
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
    

    
})
.catch(error => console.error('Error in download:', error));




const createFile = (pathName, source) => {
    const toJSON = JSON.stringify(source);
    fs.writeFile(pathName, toJSON, (err) => {
      if (err) rej(err);
      if (!err) {
        console.log('JSONファイルを生成しました');
      }
    });
  };



  async function downloadImage(url, filePath) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('Error downloading the image:', error);
    }
    
}

});

