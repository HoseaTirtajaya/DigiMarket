import React, { useRef, useState} from 'react'
import { Form, Modal, Button } from 'react-bootstrap';
import { createProduct } from './Web3Client';
import SuccessAlertModal from './SuccessAlertModal';
import Web3 from 'web3';

export default function AddProductModal({show, handleClose, seller}) {
  let productName = useRef();
  let productDesc = useRef();
  let productPrice = useRef();
  let ratioPrice = useRef();
  let qtyProduct = useRef();
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [convertETH, setConvertETH] = useState(0);
  let [responseTransaction, setResponseTransaction] = useState({});

  async function handleAddProduct(seller){
    const priceProduct = productPrice.current.value;
    const nameProduct = productName.current.value;
    const quantityProduct = qtyProduct.current.value;
    const ratioProduct = ratioPrice.current.value;
    const descProduct = productDesc.current.value;
    const fixedRatio = Number(ratioProduct).toFixed(18);
    let priceToEth = Number(priceProduct * ratioProduct).toFixed(18);
    let priceToWei = Web3.utils.toWei(priceToEth.toString(), "ether")
    let ratioToWei = Web3.utils.toWei(fixedRatio.toString(), "ether")
    let productData = await createProduct(nameProduct, descProduct, priceToWei, quantityProduct, priceProduct, ratioToWei, seller)
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
            <Form.Label>Nama produk</Form.Label>
            <Form.Control
              type='text'
              placeholder="Nama produk"
              autoFocus
              ref={productName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="product_qty">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type='number'
              placeholder="Product Quantity"
              ref={qtyProduct}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="product_ratio">
            <Form.Label>Rasio Harga(Ratio IDR to ETH can be viewed <a href='https://www.coinbase.com/converter/eth/idr' target="_blank" rel="noopener noreferrer">here</a>)</Form.Label>
            <Form.Control
              type='number'
              placeholder="Ratio IDR ke ETH"
              ref={ratioPrice}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="product_price">
            <Form.Label>Harga Produk</Form.Label>
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
        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Deskripsi produk(Max 800 characters)</Form.Label>
          <Form.Control
            as='textarea'
            placeholder="Deskripsi produk"
            ref={productDesc}
            rows={3}
            maxLength="800"
          />
        </Form.Group>
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
