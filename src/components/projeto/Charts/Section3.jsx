import Card from 'react-bootstrap/Card';
import Styles from './Section3.module.css'

import ListGroup from 'react-bootstrap/ListGroup';
import { Col } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { CheckLg, DashLg } from 'react-bootstrap-icons';


const Section3 = () => {

    return (
        <><Col className={Styles.cols} style={{ display: "flex", flexDirection: "column", gap: "30px" }} sm>
            <Card border="danger" bg="dark">
                <Card.Header className={Styles.title}>RANKING GERAL</Card.Header>
                <Card.Body className={Styles.box}>
                    <ListGroup horizontal style={{ height: "100%" }}>
                        <ListGroup.Item className={Styles.item}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGw26yaUR0xHW2l7H8IgX0X4rktKtgQhqBRg&s" alt="" /></ListGroup.Item>
                        <ListGroup.Item className={Styles.item}>Winycios alves</ListGroup.Item>
                        <ListGroup.Item className={Styles.item}><div className={`${Styles.button_nav}`} style={{ border: "5px solid #FFB800" }}>1</div></ListGroup.Item>
                    </ListGroup>
                    <ListGroup horizontal style={{ height: "100%" }}>
                        <ListGroup.Item className={Styles.item}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGw26yaUR0xHW2l7H8IgX0X4rktKtgQhqBRg&s" alt="" /></ListGroup.Item>
                        <ListGroup.Item className={Styles.item}>Winycios alves</ListGroup.Item>
                        <ListGroup.Item className={Styles.item}><div className={`${Styles.button_nav}`} style={{ border: "5px solid #9A9587" }}>2</div></ListGroup.Item>
                    </ListGroup>
                    <ListGroup horizontal style={{ height: "100%" }}>
                        <ListGroup.Item className={Styles.item}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGw26yaUR0xHW2l7H8IgX0X4rktKtgQhqBRg&s" alt="" /></ListGroup.Item>
                        <ListGroup.Item className={Styles.item}>Winycios alves</ListGroup.Item>
                        <ListGroup.Item className={Styles.item}><div className={`${Styles.button_nav}`} style={{ border: "5px solid #FF8A00" }}>3</div></ListGroup.Item>
                    </ListGroup>
                    <span className={Styles.line} />
                    <ListGroup horizontal style={{ height: "100%" }}>
                        <ListGroup.Item className={Styles.item}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGw26yaUR0xHW2l7H8IgX0X4rktKtgQhqBRg&s" alt="" /></ListGroup.Item>
                        <ListGroup.Item className={Styles.item}>Winycios alves</ListGroup.Item>
                        <ListGroup.Item className={Styles.item}><div className={`${Styles.button_nav}`} style={{ border: "5px solid #FF0000" }}>4</div></ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            <Card border="danger" bg="dark">
                <Card.Header className={Styles.title}>Exercicios do dia</Card.Header>
                <Card.Body className={Styles.box}>
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item as="li" className={`d-flex justify-content-between align-items-start ${Styles.item}`}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Treino diario</div>
                                <h6>23/04/2024</h6>
                            </div>
                            <Badge bg="warning" pill>
                            <DashLg color="white" size={15} className="align-center" />
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className={`d-flex justify-content-between align-items-start ${Styles.item}`}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Treino diario</div>
                                <h6>23/04/2024</h6>
                            </div>
                            <Badge bg="success" pill>
                            <CheckLg color="white" size={15} className="align-center" />
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className={`d-flex justify-content-between align-items-start ${Styles.item}`}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Treino diario</div>
                                <h6>23/04/2024</h6>
                            </div>
                            <Badge bg="warning" pill>
                            <DashLg color="white" size={15} className="align-center" />
                            </Badge>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col >
        </>
    );
}

export default Section3;