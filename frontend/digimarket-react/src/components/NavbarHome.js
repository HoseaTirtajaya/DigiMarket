import React, { useState } from 'react'; 
import { Navbar, Button, Container } from 'react-bootstrap';
import AddProductModal from './AddProductModal';

export default function NavbarHome({addr}) {
  const [showAddProductModal, setShowAddProductModal] = useState(false)

  return (
    <>
    <Navbar bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">DigiMarket</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className='text-white'>
                Wallet address: <i>{addr}</i>
            </Navbar.Text>
            <div className='mx-3'>
              <Button variant="primary" size="lg" onClick={() => setShowAddProductModal(true)}>
                Add Item
              </Button>
            </div>
          </Navbar.Collapse>
      </Container>
  </Navbar>
  <AddProductModal show={showAddProductModal} handleClose={() => setShowAddProductModal(false)}/>
  </>
  )
}
