import Web3 from "web3";
import Marketplace from "contracts/Marketplace.json"

let selectedAccount;

// let erc20Contract;

// let isInitialized = false;

export const init = async () => {
	let provider = window.ethereum;
	
    if (typeof provider !== 'undefined') {
		provider.on('accountsChanged', () => window.location.reload())
		return provider
		.request({ method: 'eth_requestAccounts' })
		.then((accounts) => {
			selectedAccount = accounts[0];
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
		let millis = parseFloat(product.timestamp) * 1000;
		let productPrice = web3.utils.fromWei(product.price.toString(), "ether")
		let product_time = new Date(millis).toLocaleString();
		products.push({
			id: product.id,
			product_name: product.name,
			owner: product.owner,
			seller: product.seller,
			product_price: productPrice,
			product_idr: product.idr_price,
			status_buy: product.purchased,
			timestamp: product_time
		});
	}
	return products;
}

export const createProduct = async (name, price, idrPrice, seller) => {
	let provider = window.ethereum;
	let marketContract;
	const web3 = new Web3(provider);
	const networkId = await web3.eth.net.getId();
	
	marketContract = new web3.eth.Contract(Marketplace.abi, Marketplace.networks[networkId].address);
	return marketContract.methods.createProduct(name, price, idrPrice).send({from: seller})
	.then(productData => {
		return productData
	}).catch(err => {
		return err.message;
	});
}

export const purchaseProduct = async (id, price, buyerAddr) => {
	let provider = window.ethereum;
	let marketContract;
	let priceToWei = Web3.utils.toWei(price, "ether")
	const web3 = new Web3(provider);
	const networkId = await web3.eth.net.getId();
	
	marketContract = new web3.eth.Contract(Marketplace.abi, Marketplace.networks[networkId].address);
	return marketContract.methods.purchaseProduct(id).send({from: buyerAddr, value: priceToWei})
	.then(productData => {
		return productData
	}).catch(err => {
		return err.message;
	});
}