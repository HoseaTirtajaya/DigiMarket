import React from 'react'; 
import { Navbar } from 'react-bootstrap';
import Container from "react-bootstrap/Container";

export default function NavbarHome() {
  return (
    // <Navbar>
    //     <Container>
    //         <Navbar.Brand>Navbar with text</Navbar.Brand>
    //         <Navbar.Toggle />
    //         <Navbar.Collapse className="justify-content-end">
    //         <Navbar.Text>
    //             Signed in as: <a href="#login">Mark Otto</a>
    //         </Navbar.Text>
    //         </Navbar.Collapse>
    //     </Container>
    // </Navbar>
    <>
    <Container>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
    </>
  )
}
