let faucetNetwork = 'kovan';

// set the provider you want from Web3.providers
if (faucetNetwork == 'rinkeby') {
  web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/4816e94be9c4429dbc23d8b59077bfd0')); // TODO: set to your Infura token.
} else {
  faucetNetwork = 'kovan';
  web3 = new Web3(new Web3.providers.WebsocketProvider('wss://kovan.infura.io/ws/v3/4816e94be9c4429dbc23d8b59077bfd0')); // TODO: set to your Infura token.
}

var tokenABI = JSON.parse(
  "[{\"constant\":true,\"inputs\":[],\"name\":\"mintingFinished\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_addedValue\",\"type\":\"uint256\"},{\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"increaseApproval\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"name\":\"\",\"type\":\"uint8\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"cap\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"mint\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"burn\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"},{\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"approve\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_subtractedValue\",\"type\":\"uint256\"}],\"name\":\"decreaseApproval\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"balance\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_subtractedValue\",\"type\":\"uint256\"},{\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"decreaseApproval\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"finishMinting\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"},{\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"transferFrom\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"},{\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_addedValue\",\"type\":\"uint256\"}],\"name\":\"increaseApproval\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"_name\",\"type\":\"string\"},{\"name\":\"_symbol\",\"type\":\"string\"},{\"name\":\"_cap\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"burner\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Burn\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Mint\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[],\"name\":\"MintFinished\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"}]"
  // TODO: set your token ABI here or leave this as is.
);

window.addEventListener('load', async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
    } catch (error) {
      console.log('An error occured: ' + error);
    }
  } else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }

  web3.eth.net.getNetworkType((err, network) => {
    if (network != 'kovan' && network != 'rinkeby') {
      toastr.error("Please switch to Kovan or Rinkeby", "You're on the worng network");
    } else {
      switchNetwork(network);
    }
  });

  var defaultAddress = (await web3.eth.getAccounts())[0];
  if (defaultAddress != "") {
    $("#address").val(defaultAddress);
    await getTokenBalance(defaultAddress);
    getEtherBalance($("#address").val());
  }

  var $form = $('#requestTokenForm');
  $form.submit(function () {
    var address = $("#address").val();

    if (web3.utils.isAddress(address)) {
      $.post($(this).attr('action'), $(this).serialize(), function (response) {
        toastr.info('GENs were transfered to your account', 'Transaction Sent');
        $("#txUrl").text("View Transaction");
        if (faucetNetwork == 'rinkeby') {
          $("#txUrl").attr("href", "https://rinkeby.etherscan.io/tx/" + response);
        } else {
          $("#txUrl").attr("href", "https://kovan.etherscan.io/tx/" + response);
        }
      });
    } else {
      toastr.error("Please enter a valid address", "Invalid Ethereum Address");
    }


    $("#requestBtn").prop('disabled', true);
    grecaptcha.reset();

    return false;
  });

  $("#switchNetworkBtn").click(function () {
    if (faucetNetwork == 'kovan') {
      switchNetwork('rinkeby');
    } else {
      switchNetwork('kovan');
    }
  });

});

async function switchNetwork(newNetwork) {
  if (newNetwork != 'kovan' && newNetwork != 'rinkeby') {
    return;
  }
  faucetNetwork = newNetwork;
  if (newNetwork == 'rinkeby') {
    web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/4816e94be9c4429dbc23d8b59077bfd0')); // TODO: set to your Infura token.
    $("#requestTokenForm").attr("action", "/request_token_rinkeby/");
    $("#pageTitle").text("DAOstack Rinkeby Faucet");
    $("#switchNetworkBtn").text("Switch to Kovan Faucet");
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/4816e94be9c4429dbc23d8b59077bfd0')); // TODO: set to your Infura token.
    $("#requestTokenForm").attr("action", "/request_token_kovan/");
    $("#pageTitle").text("DAOstack Kovan Faucet");
    $("#switchNetworkBtn").text("Switch to Rinkeby Faucet");
  }
  await getTokenBalance($("#address").val());
  getEtherBalance($("#address").val());
}

$("#address").change(async function () {
  await getTokenBalance($("#address").val());
  getEtherBalance($("#address").val());
});

async function getTokenBalance(address) {

  if (!web3.utils.isAddress(address)) {
    return;
  }

  var token = new web3.eth.Contract(tokenABI, '0x543Ff227F64Aa17eA132Bf9886cAb5DB55DCAddf', undefined); // TODO: set your own token contract address
  token.events.Transfer({
    filter: {
      to: address
    },
    fromBlock: 'latest'
  }, async (error, result) => {
    console.log(result)
    console.log(error)
    // await getTokenBalance(address);
    toastr.success('GENs were transfered to your account', 'Transaction Success'); // TODO: replace GEN with your own token contract
  });

  let balance = await token.methods.balanceOf(address).call();
  let decimals = await token.methods.decimals().call();
  balance = balance / (10 ** decimals);
  $("#tokenBalance").text(balance);
}

function getEtherBalance(address) {
  if (!web3.utils.isAddress(address)) {
    return;
  }
  var balance = web3.eth.getBalance(address, (error, balance) => {
    $("#etherBalance").text(web3.utils.fromWei(balance));
  });
}

function enableRequest() {
  $("#requestBtn").prop('disabled', false);
}