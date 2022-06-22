import React, { useRef, useState} from 'react'
import { Form, Modal, Button } from 'react-bootstrap';
import { createProduct } from './Web3Client';
import SuccessAlertModal from './SuccessAlertModal';
import Web3 from 'web3';

export default function AddProductModal({show, handleClose, seller}) {
  let productName = useRef();
  let productPrice = useRef();
  let ratioPrice = useRef();
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [convertETH, setConvertETH] = useState(0);
  let [responseTransaction, setResponseTransaction] = useState({});

  async function handleAddProduct(seller){
    const priceProduct = productPrice.current.value;
    const nameProduct = productName.current.value;
    const ratioProduct = ratioPrice.current.value;
    const fixedRatio = Number(ratioProduct).toFixed(18);
    let priceToEth = Number(priceProduct * ratioProduct).toFixed(18);
    let priceToWei = Web3.utils.toWei(priceToEth.toString(), "ether")
    let ratioToWei = Web3.utils.toWei(fixedRatio.toString(), "ether")
    let productData = await createProduct(nameProduct, priceToWei, priceProduct, ratioToWei, seller)
                      .catch(err => {
                        console.log(err)
                        if(err){
                          alert("Wrong price value or name value");
                          // window.location.reload();
                        }
                      });
    handleClose();
    setShowAlertSuccess(true);
    setResponseTransaction(productData)
    return productData;
  }

  async function handleChangeConversion(event){
    event.preventDefault();
    let idrValue = event.target.value;
    let ethValue = (idrValue * ratioPrice.current.value).toFixed(25);
    return setConvertETH(ethValue);
  }

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
              placeholder="Paket Indomie 5 bungkus"
              autoFocus
              ref={productName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="product_name">
            <Form.Label>Price Ratio(Ratio IDR to ETH can be viewed <a href='https://www.coinbase.com/converter/eth/idr' target="_blank" rel="noopener noreferrer">here</a>)</Form.Label>
            <Form.Control
              type='number'
              placeholder="Ratio IDR to ETH"
              ref={ratioPrice}
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
                placeholder="Amount in Rp."
                min={0}
                ref={productPrice}
                onChange={(e) => handleChangeConversion(e)}
                />
            </div>
          </Form.Group>
        </Form>
        <div className='input-group'>
              <div className='input-group-append'>
                <span className='input-group-text'>
                  ETH(Estimated)
                </span>
              </div>
              <input 
                className='form-control'
                type="number"
                placeholder="Please input IDR value"
                value={convertETH || 0}
                readOnly
                />
          </div>
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
