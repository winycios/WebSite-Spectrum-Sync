import { React, useState } from "react";
import Styles from "./L_G.module.css";
import LayoutLogin from "../../../components/projeto/cadastro_login/layout/Layout_Login";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import CadasGoogle from "../../../components/projeto/cadastro_login/google/CadasGoogle"
import Api from '../../../api'

import tela from "../../../utils/assets/FundoCadastro.png"

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const Cadastro = () => {
    const navigate = useNavigate();


    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSave = () => {

        Api.post(`usuarios`, {
            nome,
            email,
            senha

        }).then(() => {

            toast.success("Usuário criado com sucesso!");
            setTimeout(() => { navigate("/logar"); }, 2000);

        }).catch(function (error) {
            toast.error(error.response.data.message);
        });
    }

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }

    // Validação de campos
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
                    <LayoutLogin background={tela} value={false} />
                </div>
                <div className={Styles.col}>

                    <Form noValidate validated={validated} onSubmit={handleSubmit} className={Styles.box_form}>
                        <Col className={Styles.form}>

                            <h1>Faça seu cadastro</h1>

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


                            <Form.Group controlId="validationCustomSenha">
                                <div className={Styles["input-container"]}>
                                    <Form.Control type="password" required value={senha} onChange={(e) => handleInputChange(e, setSenha)} />
                                    <Form.Control.Feedback type="invalid">Por favor digite sua senha.</Form.Control.Feedback>
                                    <label className={Styles.label}>Digite sua senha</label>
                                    <div className={Styles.underline}></div>
                                </div>
                            </Form.Group>
                        </Col>
                        <Form.Group>
                            <Form.Check
                                required
                                label="Concorde com os termos e condições"
                                feedback="Concorde antes de se cadastrar"
                                feedbackType="invalid"
                            />
                        </Form.Group>
                        <div className={Styles.box_button}>
                            <CadasGoogle />
                            <Button className={Styles.button} variant="outline-danger" type="submit">Cadastrar-se</Button>{' '}
                        </div>
                    </Form>
                </div>
            </main >
        </>
    )
}

export default Cadastro;