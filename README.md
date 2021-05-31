# ethereum-todolist-web
## A distributed application for a simple to-do list powered by Ethereum Smart Contracts and Solidity. Web application built with HTML, CSS and Javascript

### **Contributors**
- **Manish Meganathan**

### **Requirements**
- **NodeJS 16.2.0**
- **Truffle 5.3.7**
- **Solidity 0.5.16**
- **Web3.js  1.3.6**
- **MetaMask Browser Extension**
- **Truffle Ganache**

### **Usage**
1. Install NodeJS, Truffle, npm, Ganache and the MetaMask Browser Extension
2. CD into the project directory and install dependancies with ``npm install``.
3. Verify the Truffle Installation by running ``truffle version``.
4. Open Ganache and launch an Ethereum workspace (create one if necessary). Configure according to the truffle-config.js file in the repository.
5. Add the network and port of the Ganache blockchain to the MetaMask extension and add the first user provided by Ganache to the MetaMask extension for this network profile.
6. Run ``truffle compile`` to update the build artifacts
7. Run ``truffle migrate`` to migrate the smart contract to the Ganache Blockchain. Use ``truffle migrate --reset`` when migrating after making changes.
8. Run ``npm run dev`` to start the lite-server. A browser window will open with the application.
9. Open the MetaMask extension and make sure, the extension is connected to account and the Ganache network.
10. TodoList Application is now ready to use.

Note: Running ``truffle migrate --reset`` will remove all tasks for all users.