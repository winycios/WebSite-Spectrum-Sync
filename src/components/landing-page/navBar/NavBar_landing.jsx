import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './NavBar_landing.module.css'
import { PersonAdd, House, BoxArrowInRight, Cursor, Shuffle, PersonRaisedHand } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import useStack from '../../../utils/stack/Pilha';
import { Backdrop } from '@mui/material';

const logo = 'https://fittech500.blob.core.windows.net/imagens-spectrum/logo.png'

const NavBar = () => {
    const navigate = useNavigate();
    const stack = useStack('section_slider');

    const sectionMappings = {
        'section_slider': { icon: <House style={{ fill: "var(--salmao)" }} />, name: 'Inicio' },
        'section_info': { icon: <Cursor style={{ fill: "black" }} />, name: 'Objetivos' },
        'section_solution': { icon: <Shuffle style={{ fill: "black" }} />, name: 'Versátil' },
        'section_faq': { icon: <PersonRaisedHand style={{ fill: "black" }} />, name: 'Faq' }
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const scrollToSection = (sectionId) => {
        stack.push(sectionId);
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            window.scrollTo({
                top: section.offsetTop - navbarHeight,
                behavior: "smooth"
            });
        }
    };

    const handleBack = (sectionId) => {

        if (sectionId === 'section_slider') {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            window.scrollTo({
                top: sectionId.offsetTop - navbarHeight,
                behavior: "smooth"
            });
        } else {
            const section = document.getElementById(stack.pop());
            if (section) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: section.offsetTop - navbarHeight,
                    behavior: "smooth"
                });
            }
        }

        setOpen(false)
        handleClose();
    };

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
                        <Nav className={`${styles.nav} me-auto justify-content-between`}>
                            <div className={styles.box}>
                                <Nav.Link onClick={() => scrollToSection("section_slider")} className={styles.nav_link}>
                                    INICIO
                                    <House color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} />
                                </Nav.Link>

                                <Nav.Link onClick={() => scrollToSection("section_info")} className={styles.nav_link}>
                                    OBJETIVOS
                                    <Cursor color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} />
                                </Nav.Link>

                                <Nav.Link onClick={() => scrollToSection("section_solution")} className={styles.nav_link}>
                                    VERSÁTIL
                                    <Shuffle color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} />
                                </Nav.Link>

                                <Nav.Link onClick={() => scrollToSection("section_faq")} className={styles.nav_link}>
                                    FAQ
                                    <PersonRaisedHand color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} />
                                </Nav.Link>
                            </div>

                            <div className={styles.box}>
                                <Nav.Link onClick={() => handleNavigate('/cadastrar')} className={`${styles.button_nav} ${styles.nav_link}`}>
                                    Cadastrar
                                    <PersonAdd color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} />
                                </Nav.Link>

                                <Nav.Link onClick={() => handleNavigate('/logar')} className={`${styles.button_nav} ${styles.nav_link} ${styles.actives}`}>
                                    Entrar
                                    <BoxArrowInRight color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} />
                                </Nav.Link>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <Backdrop open={open} />
            </Navbar>
            <Box sx={{
                height: 330, transform: 'translateZ(0px)', flexGrow: 1, display: stack.data.length <= 1 ? "none" : "block", position: "fixed", bottom: 16, right: 16, zIndex: 10000
            }}>
                <SpeedDial
                    ariaLabel="Pilha de historico"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<ArrowBackIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    {stack.data.map((sectionId) => (
                        <SpeedDialAction
                            key={sectionId}
                            icon={sectionMappings[sectionId].icon}
                            tooltipTitle={sectionMappings[sectionId].name}
                            tooltipOpen
                            onClick={() => handleBack(sectionId)}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </>
    );
}

export default NavBar;
