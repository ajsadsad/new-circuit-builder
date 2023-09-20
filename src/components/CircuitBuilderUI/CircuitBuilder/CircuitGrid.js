import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function CircuitGrid ({ dimensions, draggingGate }) {
    let windowHeight = Math.floor(dimensions.height/48);
    let windowWidth = Math.floor(dimensions.width/48);

    let fullGrid = Array(windowHeight).fill(0).map(row => new Array(windowWidth).fill(false))
    return(
        <Container>
        {
            fullGrid.map((column, rowIndex) =>
                <Row
                    key = { rowIndex }
                    id = { rowIndex }
                    className = { styles.row }

                >
                    {
                        column.map((row, index) =>
                            <Col
                                key = { rowIndex + "." + index }
                                id = { rowIndex + "." + index }
                                onDragEnter = {(e) => { e.preventDefault();}}
                                onDragOver = {(e) => { e.preventDefault(); }}
                                onDrop = {(e) => { e.preventDefault(); console.log("Gate: " + draggingGate + " dropped into: " + e.target.id) }}
                                className = { styles.col }
                            >
                            </Col>
                        )
                    }
                </Row>
            )
        }
        </Container>
    )
}