import React, { useState, useEffect } from 'react';
import Styles from './User.module.css'
import NavBar from "../../../../components/projeto/navBar/NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FindImage from "../../../../components/projeto/GET/ProcurarImg";
import Table from 'react-bootstrap/Table';
import Api from '../../../../api';
import { getId } from '../../../../service/auth';

import { EggFried, FiletypeCsv, FilePdf, ArrowUpLeftCircle, Trash, ArrowsVertical, Arrows, Cursor, BrightnessHigh } from 'react-bootstrap-icons';

import BarDirection from "../../../../components/projeto/Charts/BarDirection"
import LineDirection from "../../../../components/projeto/Charts/LineChart"
import AxisDirection from "../../../../components/projeto/Charts/AxisDirection"
import Section3 from '../../../../components/projeto/Charts/Section3'
import { toast } from 'react-toastify';

const User = () => {
    const [user, setUser] = useState({
        nome: '',
        dataNascimento: '',
        genero: '',
        peso: '',
        altura: '',
        nivelCondicao: '',
        meta: '',
        objetivo: ''
    });

    // dados do usuario
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`usuarios/${getId()}`);
                const userData = response.data;
                setUser(userData);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, []);


    // baixar csv
    const handleDownload = async () => {
        try {
            const response = await Api.get('usuarios/download', {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'dados.csv');
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erro ao fazer o download do arquivo:', error);
        }
    };


    // atualizar imagem
    const handleImageChange = async (event) => {
        const newImageFile = event.target.files[0];

        if (newImageFile) {
            const maxSize = 2 * 1024 * 1024;
            const fileSize = newImageFile.size;

            if (fileSize <= maxSize) {
                const formData = new FormData();
                formData.append('imageFile', newImageFile);

                try {
                    await Api.patch(`usuarios/imagem/${getId()}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    toast.success('Imagem atualizada com sucesso!');
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } catch (error) {
                    toast.error('Erro ao atualizar a imagem, tente novamente mais tarde');
                }
            } else {
                toast.info('Por favor, selecione uma imagem menor que 2 MB.');
                event.target.value = null;
            }
        }
    }



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
                                    <form className={Styles.box_image}>
                                        <label htmlFor="file" className={Styles.custom_file_button}>{FindImage()}</label>
                                        <input type="file" onChange={handleImageChange} accept="image/*" id="file" name="file" />
                                    </form>
                                    <p>Olá, {user.nome}</p>
                                    <p>{user.genero}</p>
                                    <p>{user.objetivo.objetivo ? user.objetivo.objetivo : "--"}</p>
                                    <span className={Styles.line} />
                                    <div className={Styles.box}>

                                        <div className={Styles.box_text}> <Cursor color="white" size={22} className="align-center" /> <span>{user.meta}</span></div>

                                        <div className={Styles.box_text}> <Arrows color="white" size={22} className="align-center" /> <span>PESO: {user.peso} KG</span></div>

                                        <div className={Styles.box_text}> <ArrowsVertical color="white" size={22} className="align-center" /> <span>ALTURA: {user.altura}CM</span></div>
                                    </div>
                                    <span className={Styles.line} />
                                    <div className={Styles.box}>

                                        <div className={`${Styles.box_text} ${Styles.active}`}> <EggFried color="white" size={22} className="align-center" /><span>Dieta</span></div>

                                        <div onClick={handleDownload} className={`${Styles.box_text} ${Styles.active}`}> <FiletypeCsv color="white" size={22} className="align-center" /><span>Dados</span></div>

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