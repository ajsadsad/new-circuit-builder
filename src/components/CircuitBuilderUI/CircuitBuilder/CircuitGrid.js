import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CircuitGrid = ( { dimensions }) => {

    const [gridRows, setGridRows] = useState([(dimensions /48)]);

    let hehe = [...gridRows, gridRows.fill(
        <Row>
           <Col> hehe </Col>
        </Row>
    )];

    setGridRows(hehe); 
    
    return (
        {
            hehe
        }
    )
}

export default CircuitGrid