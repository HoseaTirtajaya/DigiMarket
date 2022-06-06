import React, { useState } from "react"
import { init } from "./Web3Client"
import NavbarHome from "./components/NavbarHome";
import TableProduct from "./components/TableProduct";

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
      <NavbarHome addr={AddressEth}/>
      <TableProduct/>
    </div>
  );
}

export default App;
