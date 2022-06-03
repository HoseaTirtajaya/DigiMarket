// import Web3 from "web3";
// import MarketContract from "contracts/Market.json";

let selectedAccount;

// let nftContract;
// let erc20Contract;

// let isInitialized = false;

export const init = async () => {
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
		return provider
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => {
				selectedAccount = accounts[0];
				console.log(`Selected account is ${selectedAccount}`);
                return selectedAccount;
			})
			.catch((err) => {
				console.log(err);
				return;
			});
    }

    // const web3 = new Web3(provider);

	// const networkId = await web3.eth.net.getId();
}