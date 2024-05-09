import { React, useState } from "react";
import Styles from "./L_G.module.css";
import LayoutLogin from "../../../components/projeto/cadastro_login/layout/Layout_Login";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import CadasGoogle from "../../../components/projeto/cadastro_login/google/CadasGoogle"
import Api from '../../../api'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { FloatLabel } from 'primereact/floatlabel';


const tela = "https://fittech500.blob.core.windows.net/imagens-spectrum/FundoCadastro.png"

const Cadastro = () => {
    const navigate = useNavigate();


    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [option, setOption] = useState(false);

    const mudarOption = () => {
        if (!option) {
            setOption(true)
        } else {
            setOption(false)
        }
    }

    const header = <div className="font-bold mb-3">Digite sua senha</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Necessário ter</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>• Pelo menos 1 dígito</li>
                <li>• Pelo menos 1 letra minúscula</li>
                <li>• Pelo menos 1 letra maiúscula</li>
                <li>• Pelo menos 8 caracteres</li>
                <li>• Pelo menos 1 caractere especial</li>
            </ul>
        </>
    );

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
        toast.dismiss();
        event.preventDefault();

        const form = event.currentTarget;
        if ((form.checkValidity()) === false && (senha === "")) {
            toast.warning("Por favor digite uma senha")
            event.stopPropagation();
        } else if (!option) {
            toast.warning("É necessário aceitar os termos")
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
                                </div>
                            </Form.Group>

                            <Form.Group controlId="validationCustomEmail">
                                <div className={Styles["input-container"]}>
                                    <Form.Control required type="text" value={email} onChange={(e) => handleInputChange(e, setEmail)} />
                                    <Form.Control.Feedback type="invalid">Por favor digite seu email!</Form.Control.Feedback>
                                    <label className={Styles.label}>Digite seu Email</label>
                                </div>
                            </Form.Group>

                            <Form.Group controlId="validationCustomSenha">
                                <div className={`${Styles["input-container"]}`}>
                                    <FloatLabel>
                                        <Password
                                            type="password"
                                            required
                                            className={Styles.pass}
                                            value={senha}
                                            onChange={(e) => handleInputChange(e, setSenha)}
                                            header={header}
                                            footer={footer}
                                            toggleMask
                                            promptLabel="Nível senha"
                                            weakLabel="Fraca"
                                            mediumLabel="Média"
                                            strongLabel="Forte"
                                        />

                                        <label className={Styles.labels} htmlFor="password">Senha</label>
                                    </FloatLabel>
                                </div>
                            </Form.Group>

                        </Col>
                        <Form.Group>
                            <p style={{ textAlign: "justify", cursor: "pointer" }} onClick={() => window.open('https://fittech500.blob.core.windows.net/imagens-spectrum/modelo-termos-e-condicoes-FitTech.pdf', '_blank')}>Termos e condições</p>
                            <Form.Check
                                required
                                label="Concordo com os termos e condições"
                                feedback="Concorde antes de se cadastrar"
                                feedbackType="invalid"
                                onChange={() => mudarOption()}
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