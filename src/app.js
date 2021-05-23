Dapp = {
    contracts: {},

    load: async () => {
        console.log("app connecting...")
        await Dapp.connect_ethereum()
        console.log("app connected to the ethereum blockchain!")
        await Dapp.render();
    }, 

    connect_ethereum: async function () {
        // Detect if the Ethereum provider is by MetaMask. this returns the provider, or null if it wasn't detected
        const ethprovider = await detectEthereumProvider();

        if (!ethprovider) {
            console.error('MetaMask is not installed!');
            return
        }   

        // If the provider returned by detectEthereumProvider is not the same as window.ethereum, something is overwriting it, perhaps another wallet.
        if (ethprovider !== window.ethereum) {
            console.error('Possible multiple ethereum wallets installed');
            return
        }
        
        //
        ethereum.request({ method: 'eth_accounts' }).then(Dapp.handle_accountchange).catch((err) => {
            // Some unexpected error.
            console.error(err);
        });
        //
        ethereum.on('accountsChanged', Dapp.handle_accountchange);

        // Load the Smart Contract
        return Dapp.load_smartcontract();
    },

    handle_accountchange: function (accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== Dapp.account) {
            Dapp.account = accounts[0];
            console.log("account has changed - ", Dapp.account);
        }
    },

    load_smartcontract: async () => {
        // Import the smart contract into javascript
        const todolist = await $.getJSON('Todolist.json');
        // Assign the truffle contract to the Dapp
        Dapp.contracts.todolist = TruffleContract(todolist);
        // Set the provider of the contract
        Dapp.contracts.todolist.setProvider(ethereum);

        // Hydrate the smart contract with values from the blockchain
        Dapp.todolist = await Dapp.contracts.todolist.deployed();
    },

    render: async () => {
        $('#account').html(Dapp.account);
        console.log(Dapp.account);
        console.log("render called");
    }
}

$(() => {
    $(window).load(() => {
      Dapp.load()
    })
})