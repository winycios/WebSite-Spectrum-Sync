import { React, useState, useEffect } from "react";
import Styles from "./L_G.module.css";
import LayoutLogin from "../../../components/projeto/cadastro_login/layout/Layout_Login";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';

import { toast } from 'react-toastify';
import Api from '../../../api'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import LoginGoogle from "../../../components/projeto/cadastro_login/google/LoginGoogle";
import { LogarUser } from "../../../service/auth";

const tela = "https://fittech500.blob.core.windows.net/imagens-spectrum/FundoLogin.png"

const Login = () => {
    useEffect(() => {
        toast.dismiss();
    }, []);
    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    const handleLogin = () => {
        Api.post(`usuarios/login`, {
            email: email,
            senha: senha

        }).then((response) => {
            LogarUser(response.data.userId, response.data.token)

            toast.success(`Olá ${response.data.nome}, seja bem vindo!`);
            setTimeout(() => {
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
        toast.dismiss();
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false && senha === "") {
            toast.warning("Por favor digite uma senha")
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
                                </div>
                            </Form.Group>

                            <Form.Group controlId="validationCustomSenha">
                                <div className={Styles["input-container"]}>
                                    <FloatLabel>
                                        <Password
                                            required
                                            className={Styles.pass}
                                            value={senha}
                                            feedback={false}
                                            onChange={(e) => handleInputChange(e, setSenha)}
                                            toggleMask
                                        />
                                        <Form.Control.Feedback type="invalid">Por favor digite sua senha!</Form.Control.Feedback>
                                        <label className={Styles.labels} htmlFor="password">Digite sua senha</label>
                                    </FloatLabel>
                                </div>
                            </Form.Group>
                            <Link className={Styles.help_pass} to="../recuperar">Esqueci minha senha</Link>

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