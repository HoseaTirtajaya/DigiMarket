// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IERC721.sol";

contract Market {
    //There is several modifier: public(anyone can call function), private(only this class can call function), 
    //internal(inheriting contracts if they extended), external(only modifier with this type can call function)

    enum ListingStatus {
        Active,
        Sold,
        Cancelled
    }

    event Listed(
        uint listingId,
        address seller,
        address token,
        uint tokenId,
        uint price
    );

    struct Listing{
        ListingStatus status;
        address seller;
        address token;
        uint token_id;
        uint price; 
    }

    event Sale(
        uint listingId,
        address buyer,
        address token,
        uint tokenId,
        uint price
    );

    event Cancel(
        uint listingId,
        address seller
    );

    uint private _listingId = 0;

    mapping(uint => Listing) private _listings;

    //STATE MUTABILITIIES
    // view -> function can read-only
    // pure -> specify functions that do not read or modify the state of the blockchain, like math functions. i.e: sum function that only returns a+b
    // payable -> payable to specify that an address or a function can receive Ether.
    // non-payable -> only way to shadow a payable function without being payable

    function getListing(uint listingId) public view returns (Listing memory){
        return _listings[listingId];
    }

    function listToken(address token, uint token_id, uint price) public{
        
        IERC721(token).transferFrom(msg.sender, address(this), token_id);

        Listing memory listing = Listing(
            ListingStatus.Active,
            msg.sender,
            token,
            token_id,
            price
        );

        _listingId++;

        _listings[_listingId] = listing;

        emit Listed(_listingId, msg.sender, token, token_id, price);
    }

    function buyToken(uint listingId) external payable{
        Listing storage listing = _listings[listingId];

        //The currency on this one is Wei, the smallest value of ether.
        require(listing.status == ListingStatus.Active, "Item is not available");
        require(msg.sender != listing.seller, "You can't buy your own item.");
        require(msg.value >= listing.price, "Insufficient balance");

        IERC721(listing.token).transferFrom(address(this), msg.sender, listing.token_id);
        payable(listing.seller).transfer(listing.price);

        emit Sale(listingId, msg.sender, listing.token, listing.token_id, listing.price);
    }

    function cancelListing(uint listingId) public {
        Listing storage listing = _listings[listingId];

        require(listing.status == ListingStatus.Active, "Item is not available");
        require(msg.sender == listing.seller, "Only seller can cancel listing");

        listing.status = ListingStatus.Cancelled;
        IERC721(listing.token).transferFrom(address(this), msg.sender, listing.token_id);

        emit Cancel(listingId, listing.seller);
    }
}