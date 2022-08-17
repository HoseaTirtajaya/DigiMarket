import React from 'react'
import { Modal, Button} from 'react-bootstrap'

export default function ReadMoreModal({show, handleClose, desc}) {
    return (
      <>
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title className="ms-auto" id='contained-modal-title-vcenter'>Detail Produk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { desc }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}
