import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { getProductData } from './Web3Client';


export default function TableProduct() {
  let [productData, setProductData] = useState([]);

  async function getTableData(){
    let products = await getProductData();
    console.log(products, "THIS IS TRUEST DATA")
    setProductData(products);
  }

  useEffect(() => {
    getTableData();
  },[]);

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
          <tbody>
            {productData.map(item => { 
              return <tr>
                <td>{item.id}</td>
                <td>{item.product_name}</td>
                <td>{item.product_price}</td>
                <td>-</td>
                <td>Timestamp</td>
                <td>See Detail</td>
              </tr>
            })}
          </tbody>
      </Table>
    </Container>
  )
}
