import React, { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Styles from './Section3.module.css'
import Api from '../../../api';
import { toast } from 'react-toastify';

import ListGroup from 'react-bootstrap/ListGroup';
import { Col } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { CheckLg, DashLg } from 'react-bootstrap-icons';
import { Person } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import ScoreIcon from '@mui/icons-material/Score';
import CakeIcon from '@mui/icons-material/Cake';
import HeightIcon from '@mui/icons-material/Height';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import TransgenderIcon from '@mui/icons-material/Transgender';
import moment from 'moment';

const Section3 = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        userDataEscolhido(id);
        setShow(true)
    };

    var count = 1;
    const [users, setUsers] = useState([]);

    const [user, setUser] = useState({
        nome: '',
        dataNascimento: '',
        genero: '',
        peso: '',
        altura: '',
        meta: '',
        pontuacao: '',
        objetivo: ''
    });
    // Listar todos os usuarios
    useEffect(() => {
        const fetchData = () => {
            Api.get(`usuarios/pontuacao`).then((response) => {
                setUsers(response.data);
            }).catch(() => {
                toast("Deu erro, tente novamente!")
            })
        };
        fetchData();
    }, []);

    // Listar usuario escolhido
    const userDataEscolhido = async (id) => {
        try {
            const response = await Api.get(`usuarios/${id}`);
            const userData = response.data;
            setUser(userData);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const color = () => {
        if (count === 1) {
            return "5px solid #FFB800"
        } else if (count === 2) {
            return "5px solid #9A9587"
        }
        else {
            return "5px solid #FF8A00"
        }
    };

    const formatDate = (dateString) => {
        return moment(dateString).format('DD/MM/YYYY');

    };

    return (
        <>
            <Col className={Styles.cols} style={{ display: "flex", flexDirection: "column", gap: "30px" }} sm>
                <Card border="danger" bg="dark">
                    <Card.Header className={Styles.title}>RANKING GERAL</Card.Header>
                    <Card.Body className={Styles.box}>
                        {users.map((data) => (
                            <div key={data.id} style={{ cursor: "pointer" }} onClick={() => handleShow(data.id)}>
                                <ListGroup horizontal className={Styles.list}>
                                    <ListGroup.Item className={Styles.item}>{data.img ? (<img src={`${data.img}`} alt="Foto do usuário" />) : (<Person color="white" size={30} />)}</ListGroup.Item>
                                    <ListGroup.Item className={Styles.item}>{data.nome}</ListGroup.Item>
                                    <ListGroup.Item className={Styles.item}><div className={`${Styles.button_nav}`} style={{ border: `${color()}` }}>{count++}</div></ListGroup.Item>
                                </ListGroup>
                            </div>
                        ))}
                    </Card.Body>
                </Card>

                <Card border="danger" bg="dark">
                    <Card.Header className={Styles.title}>Exercicios do dia</Card.Header>
                    <Card.Body className={Styles.box}>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li" className={`d-flex justify-content-between align-items-start ${Styles.item}`}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Treino diário</div>
                                    <h6>23/04/2024</h6>
                                </div>
                                <Badge bg="warning" pill>
                                    <DashLg color="white" size={15} className="align-center" />
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className={`d-flex justify-content-between align-items-start ${Styles.item}`}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Treino diário</div>
                                    <h6>23/04/2024</h6>
                                </div>
                                <Badge bg="success" pill>
                                    <CheckLg color="white" size={15} className="align-center" />
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" className={`d-flex justify-content-between align-items-start ${Styles.item}`}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Treino diário</div>
                                    <h6>23/04/2024</h6>
                                </div>
                                <Badge bg="warning" pill>
                                    <DashLg color="white" size={15} className="align-center" />
                                </Badge>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>

            {/* modal */}
            <Modal show={show} onHide={handleClose} centered size="lg"
            >
                <div className={Styles.backModal}>
                    <Modal.Body>
                        <div className={Styles.box_person}>
                            <div className={Styles.perfil}>
                                {user.img ? (<img src={`${user.img}`} className={Styles.img} alt="Foto do usuário" />) : (<Person color="white" size={200} />)}
                                <p>{user.nome}</p>
                                <p>{user.objetivo.objetivo}</p>
                            </div>
                            <div className={Styles.dados}>
                                <List sx={{ width: '100%' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={Styles.fundoIcon}>
                                                <MonitorWeightIcon className={Styles.icon} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Peso" secondary={`${user.peso} kg`}
                                            sx={{ '.css-83ijpv-MuiTypography-root': { color: '#686868', textAlign: "justify" } }} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={Styles.fundoIcon}>
                                                <HeightIcon className={Styles.icon} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Altura" secondary={`${user.altura} cm`}
                                            sx={{ '.css-83ijpv-MuiTypography-root': { color: '#686868', textAlign: "justify" } }} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={Styles.fundoIcon}>
                                                <GpsNotFixedIcon className={Styles.icon} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Meta" secondary={user.meta}
                                            sx={{ '.css-83ijpv-MuiTypography-root': { color: '#686868', textAlign: "justify" } }} />
                                    </ListItem>
                                </List>

                                <List sx={{ width: '100%' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={Styles.fundoIcon}>
                                                <CakeIcon className={Styles.icon} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Nascimento" secondary={formatDate(user.dataNascimento)}
                                            sx={{ '.css-83ijpv-MuiTypography-root': { color: '#686868', textAlign: "justify" } }} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={Styles.fundoIcon}>
                                                <TransgenderIcon className={Styles.icon} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Sexo" secondary={user.genero}
                                            sx={{ '.css-83ijpv-MuiTypography-root': { color: '#686868', textAlign: "justify" } }} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={Styles.fundoIcon}>
                                                <ScoreIcon className={Styles.icon} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Pontuação" secondary={user.pontuacao}
                                            sx={{ '.css-83ijpv-MuiTypography-root': { color: '#686868', textAlign: "justify" } }} />
                                    </ListItem>
                                </List>
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-light" onClick={handleClose}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
}

export default Section3;