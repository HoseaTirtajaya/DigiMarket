import React, { useRef, useState} from 'react'
import { Form, Modal, Button } from 'react-bootstrap';
import { createProduct } from './Web3Client';
import SuccessAlertModal from './SuccessAlertModal';


export default function AddProductModal({show, handleClose, seller}) {
  let productName = useRef();
  let productPrice = useRef();
  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  let [responseTransaction, setResponseTransaction] = useState({});

  async function handleAddProduct(seller){
    const priceProduct = productPrice.current.value;
    const nameProduct = productName.current.value;
    let productData = await createProduct(nameProduct, priceProduct, seller)
    handleClose();
    setShowAlertSuccess(true);
    setResponseTransaction(productData)
    return productData;
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
              placeholder="Steam Wallet Code IDR 120.000"
              autoFocus
              ref={productName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="product_price">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="150000"
              min={0}
              ref={productPrice}
            />
          </Form.Group>
        </Form>
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
