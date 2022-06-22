import React, { useState, useEffect } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import SuccessAlertModal from './SuccessAlertModal';
import { getProductData, purchaseProduct } from './Web3Client';

export default function TableProduct({addr}) {
  let [productData, setProductData] = useState([]);
  let [transactionData, setTransactionData] = useState({});
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  async function getTableData(){
    let products = await getProductData();
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
              <th>Ratio</th>
              <th>Seller</th>
              <th>Buyer</th>
              <th>Timestamp</th>
              <th>Buy</th>
              </tr>
          </thead>
          <tbody>
            {productData.map(item => { 
              return <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.product_name}</td>
                <td>{item.product_price} Eth(IDR {item.product_idr})</td>
                <td>{item.ratio_price}</td>
                <td>{item.seller}</td>
                <td>{item.status_buy === false ? "Available" : item.owner}</td>
                <td>{item.timestamp}</td>
                <td>{!item.status_buy ? 
                <Button variant="success" name={item.id} value={item.product_price} onClick={async (event) => {
                  let receipt = await purchaseProduct(item.id, event.target.value, addr);
                  setTransactionData(receipt);
                  setShowAlertSuccess(true);
                }}>Buy!</Button> :
                <Button variant="secondary" disabled>Buy!
                </Button>
                }</td>
              </tr>
            })}
          </tbody>
      </Table>
      <SuccessAlertModal show={showAlertSuccess} handleClose={() => {setShowAlertSuccess(false); window.location.reload();}} transaction={transactionData}/>
    </Container>
  )
}
