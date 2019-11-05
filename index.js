var tokenABIJSON = require ('./tokenABI.json'); // TODO: In the tokenABI.json file, 
                                                // you can change the ABI to your own token's ABI 
                                                // or leave it as is (as long as your token is ERC20 compatible) 

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


app.post('/request_token_kovan/', function(request, response) {
  transferTokens(request, response, 42)
});

app.post('/request_token_rinkeby/', function(request, response) {
  transferTokens(request, response, 4)
});

function transferTokens(request, response, networkId) {
  verifyRecaptcha(request.body["g-recaptcha-response"], function(success) {
    if (success) {

      var Web3 = require('web3');
      var web3 = new Web3();

      if (networkId == 4){
        web3.setProvider(new web3.providers.HttpProvider(process.env.RINKEBY_WEB3_PROVIDER)); // TODO: in our implementation, 
                                                                                      // we used Heroku to store and 
                                                                                      // retrive the process.env arguments.
                                                                                      // You can either use Heroku as well or change 
                                                                                      // it to a constant string 
                                                                                      // eg. https://rinkeby.infura.io/<your-token>
      } else if (networkId == 42) {
        web3.setProvider(new web3.providers.HttpProvider(process.env.KOVAN_WEB3_PROVIDER)); // TODO: in our implementation, 
                                                                                      // we used Heroku to store and 
                                                                                      // retrive the process.env arguments.
                                                                                      // You can either use Heroku as well or change 
                                                                                      // it to a constant string 
                                                                                      // eg. https://kovan.infura.io/<your-token>
      } else {
        response.sendStatus(400).json({
          error: 'Invalid request'
        });
      }

      var tokenABI = tokenABIJSON;


      var token = new web3.eth.Contract(tokenABI, process.env.TOKEN_CONTRACT); // TODO: set your own token contract value
                                                                               // (either as a constant or a string literal)

      var data = token.methods.transfer(request.body.address, web3.utils.toWei(process.env.TOKEN_DROP_SIZE.toString())).encodeABI(); // TODO: set token drop size to the amount of tokens
                                                                                                                                // you would like the faucet to send for each request 


      const EthereumTx = require('ethereumjs-tx');
      const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex'); // TODO: set your own private key here.
                                                                      // This private key should be the private key of the
                                                                      // account you would like to use as your funding address. 
                                                                      // Please make sure to remember to deposit your token 
                                                                      // into this address.

      const faucetAddress = ethUtil.privateToAddress(privateKey).toString('hex');

      web3.eth.getTransactionCount(faucetAddress, (error, nonce) => {

        const txParams = {
          nonce: "0x" + nonce.toString(16).toUpperCase(),
          gasPrice: '0x2540BE400', // Gas Price = 10000000000 wei = 10 Gwei,
          gasLimit: '0x11170', // Gas Limit = 70,000 units
          to: process.env.TOKEN_CONTRACT, // TODO: set your own token contract value
          value: '0x00',
          data: data,
          chainId: networkId
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
}

// Helper function to make API call to recatpcha and check response
function verifyRecaptcha(key, callback) {
  https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.CAPTCHA_SECRET + "&response=" + key, function(res) { //  TODO: set your own reCaptcha SECRET key.
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
