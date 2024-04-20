import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './NavBar_landing.module.css'

import { PersonAdd, House, BoxArrowInRight, Cursor, Shuffle, PersonRaisedHand, PersonLinesFill } from 'react-bootstrap-icons';

import logo from '../../../utils/assets/logo.png'

const NavBar = () => {
    return (
        <>
            <Navbar expand="lg" className={`${styles["bg-body-tertiary"]} navbar navbar-dark `}>
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
                                <Nav.Link className={styles.nav_link}>INICIO
                                    <House color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>

                                <Nav.Link className={`${styles.nav_link}`}>OBJETIVOS
                                    <Cursor color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>

                                <Nav.Link className={`${styles.nav_link}`}>VERSÁTIL
                                    <Shuffle color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>

                                <Nav.Link className={`${styles.nav_link}`}>FAQ
                                    <PersonRaisedHand color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>

                                <Nav.Link className={`${styles.nav_link}`}>CONTATO
                                    <PersonLinesFill color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>
                            </div>

                            <div className={styles.box}>
                                <Nav.Link href='cadastrar' className={`${styles.button_nav} ${styles.nav_link}`}>Cadastrar
                                    <PersonAdd color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>

                                <Nav.Link href='logar' className={`${styles.button_nav} ${styles.nav_link} ${styles.actives}`}>Entrar
                                    <BoxArrowInRight color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;