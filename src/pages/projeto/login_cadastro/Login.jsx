import { React, useState } from "react";
import Styles from "./L_G.module.css";
import LayoutLogin from "../../../components/projeto/cadastro_login/layout/Layout_Login";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import tela from "../../../utils/assets/FundoLogin.png"
import Api from '../../../api'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import LoginGoogle from "../../../components/projeto/cadastro_login/google/LoginGoogle";

const Login = () => {
    sessionStorage.clear();
    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    const handleLogin = () => {
        Api.post(`usuarios/login`, {
            email: email,
            senha: senha

        }).then((response) => {
            sessionStorage.setItem("id", response.data.userId);
            sessionStorage.setItem("nome", response.data.nome);

            toast.success(`Olá ${response.data.nome}, seja bem vindo!`);
            setTimeout(() => {
                toast.success("Carregando pagina!");
                navigate("/homeProjeto")
            }, 2000);

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
            handleLogin();
        }

        setValidated(true);
    };
    return (
        <>
            <main>
                <div className={Styles.col}>
                    <LayoutLogin background={tela} value={true} />
                </div>
                <div className={Styles.col}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className={Styles.box_form}>
                        <Col className={Styles.form}>

                            <h1>Faça seu Login</h1>

                            <Form.Group controlId="validationCustomUsername">
                                <div className={Styles["input-container"]}>
                                    <Form.Control required type="text" value={email} onChange={(e) => handleInputChange(e, setEmail)} />
                                    <Form.Control.Feedback type="invalid">Por favor digite seu Email!</Form.Control.Feedback>
                                    <label className={Styles.label}>Digite seu email</label>
                                    <div className={Styles.underline}></div>
                                </div>
                            </Form.Group>

                            <Form.Group controlId="validationCustomEmail">
                                <div className={Styles["input-container"]}>
                                    <Form.Control required type="password" value={senha} onChange={(e) => handleInputChange(e, setSenha)} />
                                    <Form.Control.Feedback type="invalid">Por favor digite sua Senha!</Form.Control.Feedback>
                                    <label className={Styles.label}>Digite seu senha</label>
                                    <div className={Styles.underline}></div>
                                </div>
                            </Form.Group>
                            <p className={Styles.help_pass}>Esqueci minha senha</p>
                        </Col>

                        <div className={Styles.box_button}>
                            <LoginGoogle />
                            <Button className={Styles.button} variant="outline-danger" type="submit">Logar-se</Button>{' '}
                        </div>
                    </Form>
                </div >
            </main >
        </>
    )
}

export default Login;