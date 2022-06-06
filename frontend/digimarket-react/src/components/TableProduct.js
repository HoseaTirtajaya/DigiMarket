import React from 'react'
import { Table } from 'react-bootstrap'

export default function TableProduct() {
  return (
    <Table striped bordered hover >
        <thead>
            <tr>
            <th>No.</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Transaction Hash</th>
            <th>Timestamps</th>
            <th>Detail</th>
            </tr>
        </thead>
    </Table>
  )
}
