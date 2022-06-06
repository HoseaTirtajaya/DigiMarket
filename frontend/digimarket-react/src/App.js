import React, { useState } from "react"
import { init } from "./Web3Client"
import NavbarHome from "./components/NavbarHome";

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
      <NavbarHome></NavbarHome>
    </div>
  );
}

export default App;
