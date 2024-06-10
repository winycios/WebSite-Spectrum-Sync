import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import React, { useEffect, useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import styles from './NavBar.module.css'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { House, BoxArrowInLeft, EggFried } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import FindImage from '../GET/ProcurarImg';
import api from '../../../api';
import { getId } from '../../../service/auth';
import { FitnessCenterOutlined } from '@mui/icons-material';

const logo = 'https://fittech500.blob.core.windows.net/imagens-spectrum/logo.png'

const NavBar = () => {
    const [progress, setProgress] = useState(0);
    const [nivel, setNivel] = useState(1);
    const [maxProgress, setMaxProgress] = useState(20);


    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    };

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            handleNavigate("logar");
            window.location.reload();
        }
    });

    const useLogout = () => {
        sessionStorage.clear();
        navigate("/logar");

        return null;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`usuarios/${getId()}`);
                const userData = response.data;
                setProgress(userData.pontuacao)
            } catch (error) {
            } finally {
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (progress <= 20) {
            setNivel(1);
            setMaxProgress(20);
        } else if (progress <= 50) {
            setNivel(2);
            setMaxProgress(51);
        } else if (progress <= 100) {
            setNivel(3);
            setMaxProgress(101);
        } else {
            setNivel(4);
            setMaxProgress(200);
        }
    }, [progress]);

    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 25, marginTop: 0.7 }}>
                    <LinearProgress variant="determinate" color='error'{...props} sx={{ height: 10, borderRadius: 50 }} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography sx={{ width: "100%", marginTop: 1, display: "flex", justifyContent: "space-between" }} variant="h6">
                        <p style={{ fontSize: "14px", fontWeight: 600 }}>PONTOS: {progress}</p>
                        <p style={{ fontSize: "14px", fontWeight: 600 }}>NÍVEL: {nivel}</p>
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <>
            <Navbar expand="lg" className={`${styles["bg-body-tertiary"]} navbar navbar-dark sticky-top`}>
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            width="100%"
                            height="120"
                            className="d-inline-block align-top"
                            alt="Logo FIT TECH"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={`${styles.nav} me-auto justify-content-around`}>
                            <div className={styles.box}>

                                <Nav.Link onClick={() => handleNavigate('../homeProjeto')} className={styles.nav_link}>Home
                                    <House color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>

                                <Nav.Link onClick={() => handleNavigate('../homeProjeto/treino')} className={`${styles.nav_link}`}>Treino
                                    <FitnessCenterOutlined color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>

                                <Nav.Link onClick={() => handleNavigate('../homeProjeto/dieta')} className={`${styles.nav_link}`}>Dieta
                                    <EggFried color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>

                                <Nav.Link onClick={useLogout} className={`${styles.nav_link}`}>Sair
                                    <BoxArrowInLeft color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>
                            </div>

                            <div className={styles.box}>
                                <Tooltip
                                    title={<Box sx={{ width: '100%', height: '35px' }}>
                                        <LinearProgressWithLabel value={(progress / maxProgress) * 100} />
                                    </Box>}
                                    sx={{
                                        '& .MuiTypography-root': {
                                            color: 'black'
                                        },
                                    }}
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [-47, -7],
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                >
                                    <Nav.Link className={`${styles.button_nav}`}>{nivel}</Nav.Link>

                                </Tooltip>

                                <Nav.Link onClick={() => handleNavigate('../homeProjeto/user')} className={`${styles.button_nav}`}>{FindImage()}</Nav.Link>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;