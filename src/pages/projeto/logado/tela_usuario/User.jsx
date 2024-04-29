import { React } from "react";
import Styles from './User.module.css'
import NavBar from "../../../../components/projeto/navBar/NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FindImage from "../../../../components/projeto/GET/FindImage";
import Table from 'react-bootstrap/Table';

import { EggFried, FiletypeCsv, FilePdf, ArrowUpLeftCircle, Trash, ArrowsVertical, Arrows, Cursor, BrightnessHigh } from 'react-bootstrap-icons';

import BarDirection from "../../../../components/projeto/Charts/BarDirection"
import LineDirection from "../../../../components/projeto/Charts/LineChart"
import AxisDirection from "../../../../components/projeto/Charts/AxisDirection"
import Section3 from '../../../../components/projeto/Charts/Section3'



const User = () => {
    return (
        <>
            <NavBar />

            <Container style={{ marginBottom: "20px" }}>
                <Row className={Styles.container}>
                    <Col className={Styles.cols} style={{ display: "flex", flexDirection: "column", gap: "30px" }} sm>
                        <Card border="danger" bg="dark">
                            <Card.Header className={Styles.title}>SOBRE VOCÊ</Card.Header>
                            <Card.Body>
                                <div className={Styles.box}>
                                    <div className={Styles.box_image}>{FindImage()}</div>
                                    <p>Olá, Dalva</p>
                                    <p>Feminino</p>
                                    <p>Desistir não é uma opção</p>
                                    <span className={Styles.line} />
                                    <div className={Styles.box}>

                                        <div className={Styles.box_text}> <Cursor color="white" size={22} className="align-center" /> <span>PERDER PESO</span></div>

                                        <div className={Styles.box_text}> <Arrows color="white" size={22} className="align-center" /> <span>PESO: 60 KG</span></div>

                                        <div className={Styles.box_text}> <ArrowsVertical color="white" size={22} className="align-center" /> <span>ALTURA: 1.65CM</span></div>
                                    </div>
                                    <span className={Styles.line} />
                                    <div className={Styles.box}>

                                        <div className={`${Styles.box_text} ${Styles.active}`}> <EggFried color="white" size={22} className="align-center" /><span>Dieta</span></div>

                                        <div className={`${Styles.box_text} ${Styles.active}`}> <FiletypeCsv color="white" size={22} className="align-center" /><span>Dados</span></div>

                                        <div className={`${Styles.box_text} ${Styles.active}`}> <FilePdf color="white" size={22} className="align-center" /><span>Relatório</span></div>

                                        <div className={`${Styles.box_text} ${Styles.active}`}> <ArrowUpLeftCircle color="white" size={22} className="align-center" /><span>Editar</span></div>

                                        <div className={`${Styles.box_text} ${Styles.active}`}> <Trash color="white" size={22} className="align-center" /><span>Excluir conta</span></div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        <div className={Styles.visualization}>
                            <Section3 />
                        </div>
                    </Col>

                    <Col sm>
                        <Card border="danger" bg="dark">
                            <Card.Header className={Styles.title}>GRÁFICOS</Card.Header>
                            <Card.Body className={Styles.box_graf}>
                                <Card className={Styles.card_graf}>
                                    <Card.Body>
                                        <Card.Title className={Styles.title}>Treinos feitos na semana</Card.Title>
                                        <BarDirection />
                                    </Card.Body>
                                </Card>
                                <Card className={Styles.card_graf}>
                                    <Card.Body>
                                        <Card.Title className={Styles.title}>Histórico de Peso do Usuário</Card.Title>
                                        <LineDirection />
                                    </Card.Body>
                                </Card>

                                <Card className={Styles.card_graf}>
                                    <Card.Body>
                                        <Card.Title className={Styles.title}>Objetivo de peso</Card.Title>
                                        <AxisDirection />
                                    </Card.Body>
                                </Card>

                                <Card className={Styles.card_graf}>
                                    <Card.Body>
                                        <Card.Title className={Styles.title}>Alimentação diária</Card.Title>

                                        <Table striped hover variant="dark">
                                            <thead>
                                                <tr>
                                                    <th>Icon</th>
                                                    <th>Horário</th>
                                                    <th>Calorias</th>
                                                    <th>Lista</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><BrightnessHigh color="white" size={22} className="align-center" /></td>
                                                    <td>10:00</td>
                                                    <td>320000</td>
                                                    <td>LISTAR</td>
                                                </tr>
                                                <tr>
                                                    <td><BrightnessHigh color="white" size={22} className="align-center" /></td>
                                                    <td>10:00</td>
                                                    <td>320000</td>
                                                    <td>LISTAR</td>
                                                </tr>

                                                <tr>
                                                    <td><BrightnessHigh color="white" size={22} className="align-center" /></td>
                                                    <td>10:00</td>
                                                    <td>320000</td>
                                                    <td>LISTAR</td>
                                                </tr>

                                                <tr>
                                                    <td><BrightnessHigh color="white" size={22} className="align-center" /></td>
                                                    <td>10:00</td>
                                                    <td>320000</td>
                                                    <td>LISTAR</td>
                                                </tr>
                                                <tr>
                                                    <td><BrightnessHigh color="white" size={22} className="align-center" /></td>
                                                    <td>10:00</td>
                                                    <td>320000</td>
                                                    <td>LISTAR</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col className={`${Styles.cols} ${Styles.section_none}`} sm>
                        <Section3 />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default User;