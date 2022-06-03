import './App.css';
import React, { useState } from "react"
import { init } from "./Web3Client"

function App() {
  let [AddressEth, setAddressEth] = useState("loading...");

  const web3Handler = async() => {
    let address = await init();
    setAddressEth(address);
  }

  console.log(AddressEth)
  web3Handler();

  return (
    <div className="App">
      <h1>Your account address is {AddressEth}</h1>
    </div>
  );
}

export default App;
