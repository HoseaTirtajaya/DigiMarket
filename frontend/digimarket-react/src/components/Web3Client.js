import Web3 from "web3";
import Marketplace from "contracts/Marketplace.json"

let selectedAccount;

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
    } else if (window.web3) {
		window.web3 = new Web3(window.web3.currentProvider)
	} else {
		console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
	}
	
    // const web3 = new Web3(provider);
	
	// const networkId = await web3.eth.net.getId();
}

export const getProductData = async () => {
	let provider = window.ethereum;
	let marketContract;
	const web3 = new Web3(provider);
	const networkId = await web3.eth.net.getId();
	let products = [];
	
	marketContract = new web3.eth.Contract(Marketplace.abi, Marketplace.networks[networkId].address);
	let productCount = await marketContract.methods.productCount().call();
	// Load products
	for (var i = 1; i <= productCount; i++) {
        const product = await marketContract.methods.products(i).call();
		products.push({
			id: product.id,
			product_name: product.name,
			owner: product.owner,
			seller: product.seller,
			product_price: product.price,
			status_buy: product.purchased
		});
	}
	return products;
}

export const createProduct = async (name, price, seller) => {
	let provider = window.ethereum;
	let marketContract;
	const web3 = new Web3(provider);
	const networkId = await web3.eth.net.getId();
	
	marketContract = new web3.eth.Contract(Marketplace.abi, Marketplace.networks[networkId].address);
	return marketContract.methods.createProduct(name, price).send({from: seller})
	.once('receipt', (receipt) => {
		return receipt;
	})
}

export const purchaseProduct = async () => {
	let provider = window.ethereum;
	let marketContract;
	const web3 = new Web3(provider);
	const networkId = await web3.eth.net.getId();
	
	marketContract = new web3.eth.Contract(Marketplace.abi, Marketplace.networks[networkId].address);
}