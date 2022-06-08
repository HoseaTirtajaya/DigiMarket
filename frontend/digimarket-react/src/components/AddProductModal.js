import React, { useRef, useState} from 'react'
import { Form, Modal, Button } from 'react-bootstrap';
import { createProduct } from './Web3Client';
import SuccessAlertModal from './SuccessAlertModal';
import Web3 from 'web3';

export default function AddProductModal({show, handleClose, seller}) {
  let productName = useRef();
  let productPrice = useRef();
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  // const [convertETH, setConvertETH] = useState([""]);
  let [responseTransaction, setResponseTransaction] = useState({});

  async function handleAddProduct(seller){
    const priceProduct = productPrice.current.value;
    const nameProduct = productName.current.value;
    let priceToEth = (priceProduct * 4e-8).toFixed(18);
    console.log(priceToEth)
    let priceToWei = Web3.utils.toWei(priceToEth.toString(), "ether")
    let productData = await createProduct(nameProduct, priceToWei, priceProduct, seller)
    handleClose();
    setShowAlertSuccess(true);
    setResponseTransaction(productData)
    return productData;
  }

  // function handleChangeConversion(i, event){
  //   const values = [...convertETH];
  //   values[i] = event.target.value;
  //   setConvertETH(values);
  // }

  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Seller Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddProduct}>
          <Form.Group className="mb-3" controlId="product_name">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type='text'
              placeholder="Steam Wallet Code IDR 120.000"
              autoFocus
              ref={productName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="product_price">
            <Form.Label>Product Price</Form.Label>
            <div className='input-group'>
              <div className='input-group-append'>
                <span className='input-group-text'>
                  IDR
                </span>
              </div>
              <input 
                className='form-control'
                type="number"
                placeholder=""
                min={0}
                ref={productPrice}
                />
            </div>
          </Form.Group>
        </Form>
        {/* {convertETH.map((item, idx) => {
          return(
            <div className='input-group'>
                  <div className='input-group-append'>
                    <span className='input-group-text'>
                      ETH
                    </span>
                  </div>
                  <input 
                    className='form-control'
                    type="number"
                    placeholder="Please input IDR value"
                    value={item || 0}
                    onChange={(e) => handleChangeConversion(idx, e)}
                    />
              </div>
          )
        })} */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" type='submit' onClick={() => handleAddProduct(seller)}>
          Add Product!
        </Button>
      </Modal.Footer>
    </Modal>
    <SuccessAlertModal show={showAlertSuccess} handleClose={() => {setShowAlertSuccess(false); window.location.reload()}} transaction={responseTransaction}/>
  </>
  )
}
