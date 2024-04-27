import { React, useState } from "react";
import Styles from "./Recuperar_Senha.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Api from '../../../api'
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const Recuperar = () => {
    const navigate = useNavigate();


    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const handleSave = () => {

        Api.post(`usuarios`, {
            nome,
            email

        }).then(() => {

            toast.success("Senha alterada com sucesso!");
            setTimeout(() => { navigate("/logar"); }, 2000);

        }).catch(function (error) {
            toast.error(error.response.data.message);
        });
    }

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }

    const [validated, setValidated] = useState(false);

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

    return (
        <>
            <main>
                <div className={Styles.col}>

                    <Form noValidate validated={validated} onSubmit={handleSubmit} className={Styles.box_form}>
                        <Col className={Styles.form}>

                        <h1>Redefinir senha</h1>
                        <hr />
                        <p>Informe o seu email para enviarmos um link para alteração da senha.</p>
                        </Col>

                        <Form.Group controlId="validationCustomUsername">
                                <div className={Styles["input-container"]}>
                                    <Form.Control required type="text" value={nome} onChange={(e) => handleInputChange(e, setNome)} />
                                    <Form.Control.Feedback type="invalid">Por favor digite seu nome completo!</Form.Control.Feedback>
                                    <label className={Styles.label}>Digite seu nome completo</label>
                                    <div className={Styles.underline}></div>
                                </div>
                        </Form.Group>

                        <Form.Group controlId="validationCustomEmail">
                                <div className={Styles["input-container"]}>
                                    <Form.Control required type="text" value={email} onChange={(e) => handleInputChange(e, setEmail)} />
                                    <Form.Control.Feedback type="invalid">Por favor digite seu email!</Form.Control.Feedback>
                                    <label className={Styles.label}>Digite seu Email</label>
                                    <div className={Styles.underline}></div>
                                </div>
                        </Form.Group>

                        <div className={Styles.box_button}>
                            <Link className={Styles["btnCancelar"]} to="/logar">Cancelar</Link>
                            <Button className={Styles.button} variant="outline-danger" type="submit">Enviar</Button>{' '}
                        </div>
                    </Form>
                </div>
            </main >
        </>
    )

}

export default Recuperar;