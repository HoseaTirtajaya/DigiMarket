// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721 {
    using Counters for Counters.Counter;
    constructor() ERC721("Item 1", "itema") {}

    Counters.Counter private _tokenId;
    
    function mint(address owner) external returns (uint){
        _tokenId.increment();

        uint256 newTokenID = _tokenId.current();
        _mint(owner, newTokenID);
        return newTokenID;
    }
}