import React, { useState, useEffect } from 'react';
import Styles from './Editar.module.css'
import NavBar from "../../../../../components/projeto/navBar/NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Api from '../../../../../api';
import { getId } from '../../../../../service/auth';
import FindImage from "../../../../../components/projeto/GET/ProcurarImg";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Form from 'react-bootstrap/Form';


const User = () => {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    };

    const [newUser, setUser] = useState({
        nome: '',
        img: '',
        altura: '',
        dataNascimento: '',
        meta: '',
        nivelCondicao: ''
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

    const [validated, setValidated] = useState(false);


    // Atualiza o objeto de estado para cada mudança de input
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            handleSave();
        }
        setValidated(true);
    };

    const handleSave = () => {
        Api.put(`usuarios/perfil/${getId()}`, newUser).then(() => {

            toast.success("Seus dados foram atualizado com sucesso!");
            setTimeout(() => { navigate('../homeProjeto/user'); }, 2000);

        }).catch(function (error) {
            toast.error(error.response.data.message);
        });
    }

    return (
        <>
            <NavBar />
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edição de Perfil</h2>
            <Container style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
                <Row className={Styles.container}>
                    <Col className={Styles.cols}>
                        <Card border="danger" bg="dark">
                            <Card.Header className={Styles.title}>SEUS DADOS</Card.Header>
                            <Card.Body>

                                <Form noValidate validated={validated} className={Styles.box_form}>
                                    <Col className={Styles.form}>
                                        <Form.Group controlId="validationCustomUsername">
                                            <div className={Styles["input-container"]}>
                                                <Form.Control required type="text" value={newUser.nome} name="nome" onChange={handleInputChange} />
                                                <Form.Control.Feedback type="invalid">Por favor digite seu nome completo!</Form.Control.Feedback>
                                                <label className={Styles.label}>Seu nome</label>
                                            </div>
                                        </Form.Group>

                                        <Form.Group controlId="validationCustomAltura">
                                            <div className={Styles["input-container"]}>
                                                <Form.Control required type="number" name="altura" value={newUser.altura} onChange={handleInputChange} />
                                                <Form.Control.Feedback type="invalid">Informe um valor para sua altura</Form.Control.Feedback>
                                                <label className={Styles.label}>Sua altura (cm)</label>
                                            </div>
                                        </Form.Group>

                                        <Form.Group>
                                            <div className={Styles["input-container"]}>
                                                <label>Sua data de nascimento</label>
                                                <Form.Control type="date" required name="dataNascimento" onChange={handleInputChange} value={newUser.dataNascimento} />
                                                <Form.Control.Feedback type="invalid">Por favor  sua data de nascimento.</Form.Control.Feedback>
                                            </div>
                                        </Form.Group>

                                        <Form.Group controlId="validationCustomMeta">
                                            <div className={Styles["input-container"]}>
                                                <label>Sua Meta:</label>
                                                <Form.Select aria-label="Select meta" name="meta" onChange={handleInputChange} value={newUser.meta}>
                                                    <option disabled value="">Selecione sua meta</option>
                                                    <option value="Perder peso">Perder peso</option>
                                                    <option value="Ganhar massa">ganhar massa muscular</option>
                                                </Form.Select>
                                            </div>
                                        </Form.Group>

                                        <Form.Group controlId="validationCustomNivel">
                                            <div className={Styles["input-container"]}>
                                                <label>Seu nível de condição física:</label>
                                                <Form.Select aria-label="Select condicionamento fisico" name="nivelCondicao" onChange={handleInputChange} value={newUser.nivelCondicao}>
                                                    <option disabled value="">Selecione seu nível</option>
                                                    <option value="Basico">Não treino</option>
                                                    <option value="Mediano">Treino as vezes</option>
                                                    <option value="Avancado">treino diariamente</option>
                                                </Form.Select>
                                            </div>
                                        </Form.Group>

                                    </Col>
                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>

                    <Col className={Styles.cols}>
                        <Card bg="transparent">
                            <Card.Body>
                                <div className={Styles.box}>
                                    <form className={Styles.box_image}>
                                        <label htmlFor="file" className={Styles.custom_file_button}>{FindImage()}</label>                                    </form>
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="outlined" onClick={() => handleNavigate('../homeProjeto/user')} startIcon={<ArrowBackIcon />}>
                                            Voltar
                                        </Button>
                                        <Button variant="outlined" color="success" onClick={handleSubmit} endIcon={<SendIcon />}>
                                            Atualizar
                                        </Button>
                                    </Stack>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default User;