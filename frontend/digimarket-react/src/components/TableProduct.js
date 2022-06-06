import React, { useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import Marketplace from "contracts/Marketplace"

const getTableData = async () => {
  const web3 = window.web3
  // Load account
  const accounts = await web3.eth.getAccounts()
  this.setState({ account: accounts[0] })
  const networkId = await web3.eth.net.getId()
  const networkData = Marketplace.networks[networkId]

  if(networkData) {
    const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
    console.log(marketplace)
    this.setState({ marketplace })
    const productCount = await marketplace.methods.productCount().call()
    console.log(parseFloat(productCount))
    this.setState({ productCount })
    // Load products
    for (var i = 1; i <= productCount; i++) {
      const product = await marketplace.methods.products(i).call()
      console.log((parseFloat(product.price) / 100000000), "AKLWSJDLKAJSD")
      this.setState({
        products: [...this.state.products, product]
      })
    }
    this.setState({ loading: false})
  } else {
    window.alert('Marketplace contract not deployed to detected network.')
  }
}

export default function TableProduct() {
  let [productData, setProductData] = useState({});
  return (
    <Container className="mt-5">
      <Table striped bordered hover >
          <thead>
              <tr>
              <th>No.</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Transaction Hash</th>
              <th>Timestamps</th>
              <th>Detail</th>
              </tr>
          </thead>
      </Table>
    </Container>
  )
}
