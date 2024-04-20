import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './NavBar.module.css'
import { House, Cursor, FileBreak, BoxArrowInLeft} from 'react-bootstrap-icons';

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
                        <Nav className={`${styles.nav} me-auto justify-content-around`}>
                            <div className={styles.box}>
                                <Nav.Link className={styles.nav_link}>Home
                                    <House color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>

                                <Nav.Link className={`${styles.nav_link}`}>Meu Treino
                                    <Cursor color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>

                                <Nav.Link className={`${styles.nav_link}`}>Minha Dieta
                                    <FileBreak color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>

                                <Nav.Link href='logar' className={`${styles.nav_link}`}>Sair
                                    <BoxArrowInLeft color="white" size={20} className="align-center" style={{ marginLeft: "6px" }} /></Nav.Link>
                            </div>

                            <div className={styles.box}>
                                <Nav.Link className={`${styles.button_nav}`}>2</Nav.Link>
                                id =
                                <Nav.Link className={`${styles.button_nav}`}>{sessionStorage.getItem("id")}</Nav.Link>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;