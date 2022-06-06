import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap';

export default function AddProductModal({show, handleClose}) {
  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Seller Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="product_name">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              placeholder="Steam Wallet Code IDR 120.000"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="product_price">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="email"
              placeholder="150000"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Add Product!
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}
