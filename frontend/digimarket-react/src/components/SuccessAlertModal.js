import React from 'react'
import { Modal, Button} from 'react-bootstrap'

export default function SuccessAlertModal({show, handleClose, transaction}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto" id='contained-modal-title-vcenter'>Transaction Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <b>Product has been succesfully created. Here's the detail about the product deployment details: </b> <br />
            <ul>
                <li>Transaction Hash: {transaction.transactionHash}</li>
                <br/>
                <li>Seller: {transaction.from}</li>
            </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
