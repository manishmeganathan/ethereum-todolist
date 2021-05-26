Dapp = {
    contracts: {},
    loading: false,

    start: () => {
        $(window).load(() => {
            Dapp.load()
        })
    },

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
        ethereum.request({ method: 'eth_accounts' }).then(Dapp.set_account).catch((err) => {
            // Some unexpected error.
            console.error(err);
        });

        // Load the Smart Contract
        await Dapp.load_smartcontract()

        //
        ethereum.on('accountsChanged', Dapp.handle_accountchange);

        return
    },

    set_account: function (accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== Dapp.account) {
            Dapp.account = accounts[0];
            console.log("account has been set - ", Dapp.account);
        }
    },

    handle_accountchange: function (accounts) {        
        set_account(accounts)
        Dapp.set_loading(false)
        return Dapp.render()
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

        console.log("loaded", Dapp.todolist)
    },

    set_loading: (boolean) => {
        Dapp.loading = boolean;

        const loader = document.getElementById("loader");
        const content = document.getElementById("content");

        if (boolean) {
            loader.style.display = "block";
            content.style.display = "none";
        } else {
            loader.style.display = "none";
            content.style.display = "block";
        }
    },

    toggle_completed: async (e) => {
        //console.log("task toggled", e.target.name)
        Dapp.set_loading(true)
        const taskid = e.target.name
        await Dapp.todolist.toggleCompleted(taskid, {from: Dapp.account})
        window.location.reload()
      },

    render: async () => {
        if (Dapp.loading) {
            return
        }

        // Update app loading state
        Dapp.set_loading(true)

        // Render the account details
        document.getElementById("account").innerHTML = Dapp.account;
        await Dapp.render_tasks()

        // Update loading state
        Dapp.set_loading(false)

        console.log("render called");
    },

    render_tasks: async () => {
        const taskcount = await Dapp.todolist.taskcount()
        const $tasktemplate = document.getElementsByClassName("task-template")[0];

        console.log($tasktemplate)

        for (var i = 1; i <= taskcount; i++) {
            const task = await Dapp.todolist.tasks(i)
            const taskid = task[0].toNumber()
            const taskcontent = task[1]
            const taskcompleted = task[2]

            const $newtasktemplate = $tasktemplate.cloneNode(true);
            $newtasktemplate.querySelector(".content").innerHTML= taskcontent;
            $newtasktemplate.querySelector("input").name = taskid;
            $newtasktemplate.querySelector("input").checked = taskcompleted;
            $newtasktemplate.addEventListener('click', Dapp.toggle_completed)
                            
            if (taskcompleted) {
                document.getElementById("completed-task-list").append($newtasktemplate)
            } else {
                document.getElementById("task-list").append($newtasktemplate)
            }

            $newtasktemplate.style.display = "block";
        }
    },

    create_task: async () => {
        Dapp.set_loading(true)
        const content = document.querySelector('#newtask').value;

        await Dapp.todolist.createTask(content, {from: Dapp.account})
        window.location.reload()
    },
}