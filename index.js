var tokenABIJSON = require ('./tokenABI.json');

const ethUtil = require('ethereumjs-util')

const {
  body,
  validationResult
} = require('express-validator/check');
const {
  sanitizeBody
} = require('express-validator/filter');

var https = require('https');

var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/tokenABI.json'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})


app.post('/request_token/', function(request, response) {
  verifyRecaptcha(request.body["g-recaptcha-response"], function(success) {
    if (success) {

      var Web3 = require('web3');
      var web3 = new Web3();

      web3.setProvider(new web3.providers.HttpProvider(process.env.WEB3_PROVIDER));

      var tokenABI = tokenABIJSON;


      var token = new web3.eth.Contract(tokenABI, process.env.TOKEN_CONTRACT);

      var tokenDecimals = process.env.TOKEN_DECIMALS

      var data = token.methods.transfer(request.body.address, process.env.GEN_DROP_SIZE * (10 ** tokenDecimals)).encodeABI();


      const EthereumTx = require('ethereumjs-tx');
      const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');

      const faucetAddress = ethUtil.privateToAddress(privateKey).toString('hex');

      web3.eth.getTransactionCount(faucetAddress, (error, nonce) => {

        const txParams = {
          nonce: "0x" + nonce.toString(16).toUpperCase(),
          gasPrice: '0x2540BE400', // Gas Price = 10000000000 wei = 10 Gwei,
          gasLimit: '0x11170', // Gas Limit = 70,000 units
          to: process.env.TOKEN_CONTRACT,
          value: '0x00',
          data: data,
          chainId: 42
        }

        const tx = new EthereumTx(txParams);
        tx.sign(privateKey);
        const serializedTx = tx.serialize().toString('hex');

        web3.eth.sendSignedTransaction('0x' + serializedTx, (error, result) => {
          response.send(result);
        });
      });
    } else {
      response.sendStatus(400).json({
        error: 'Captcha verification failed'
      });
    }
  });
});

// Helper function to make API call to recatpcha and check response
function verifyRecaptcha(key, callback) {
  https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.CAPTCHA_SECRET + "&response=" + key, function(res) {
    var data = "";
    res.on('data', function(chunk) {
      data += chunk.toString();
    });
    res.on('end', function() {
      try {
        var parsedData = JSON.parse(data);
        callback(parsedData.success);
      } catch (e) {
        console.log(e)
        callback(false);
      }
    });
  });
}
