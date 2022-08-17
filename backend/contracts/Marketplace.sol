// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 ^0.8.9;

contract Marketplace {
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        string desc;
        uint price;
        uint qty;
        uint idr_price;
        uint ratio_price;
        address seller;
        address owner;
        bool purchased;
        uint256 timestamp;
    }

    event ProductCreated(
        uint id,
        string name,
        string desc,
        uint qty,
        uint price,
        uint idr_price,
        uint256 ratio_price,
        address seller,
        address owner,
        bool purchased,
        uint256 timestamp
    );

    event ProductPurchased(
        uint id,
        string name,
        string desc,
        uint price,
        uint qty,
        uint idr_price,
        uint ratio_price,
        address seller,
        address owner,
        bool purchased,
        uint256 timestamp
    );

    function createProduct(string memory _name, string memory _desc, uint _price, uint qty, uint _idrPrice, uint _ratio) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount ++;
        // Create the product
        products[productCount] = Product(productCount, _name, _desc, _price, qty, _idrPrice, _ratio, msg.sender, msg.sender, false, block.timestamp);
        // Trigger an event
        emit ProductCreated(productCount, _name, _desc, _price, qty, _idrPrice, _ratio, msg.sender, msg.sender, false, block.timestamp);
    }

    function purchaseProduct(uint _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = payable(_product.owner);
        
        //Validations
        require(_product.id > 0 && _product.id <= productCount, "Invalid Product ID");
        require(msg.value >= _product.price, "Insufficient balance on buyer");
        require(!_product.purchased, "Product is not available for sale");
        require(_seller != msg.sender, "Seller can't buy your own products!");
        require(_product.qty > 0, "Quantity is depleted. Please ask seller to restock");

        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Change the timestamp to now
        _product.timestamp = block.timestamp;
        // Condition if the qty is depleted
        if(_product.qty - 1 > 0){
            _product.qty = _product.qty - 1;
        } else {
            _product.purchased = true;
        }

        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        payable(_seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(productCount, _product.name, _product.desc, _product.price, _product.qty, _product.idr_price, _product.ratio_price, _seller, msg.sender, true, block.timestamp);
    }
}
