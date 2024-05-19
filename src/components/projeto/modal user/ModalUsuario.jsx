import { React, useState, useMemo  } from "react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Gear, PeopleFill, Collection } from 'react-bootstrap-icons';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Modal from 'react-bootstrap/Modal';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { FloatLabel } from 'primereact/floatlabel';
import Api from '../../../api'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { getId } from '../../../service/auth';

import Styles from "./ModalUsuario.module.css"

const Logo = "https://fittech500.blob.core.windows.net/imagens-spectrum/semFundo.svg"

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#FF0000',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#FF0000',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1
    },
}));


const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: "rgb(255, 8, 23)",
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 10px 0 rgba(5,8,4, 25)',
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const ImgIcon = useMemo(() => () => <img src={Logo} alt="Logo" style={{ width: "70px", height: "70px" }} />, []);

    const icons = {
        1: <ImgIcon />,
        2: <Gear />,
        3: <PeopleFill />,
        4: <Collection />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const steps = ['Fit tech', 'Credencial', 'Seu corpo', 'Adicionais'];


const CustomizedSteppers = ({ nome, email }) => {

    const navigate = useNavigate();
    const [newUser, setUser] = useState({
        nome: nome,
        senha: '',
        img: '',
        genero: '',
        peso: '',
        altura: '',
        dataNascimento: '',
        meta: '',
        nivelCondicao: ''
    });

    const handleSave = () => {
        Api.put(`usuarios/${getId()}`, newUser).then(() => {

            toast.success("Seus dados foram atualizado com sucesso!");
            setTimeout(() => { navigate("/homeProjeto/user"); }, 2000);

        }).catch(function (error) {
            toast.error(error.response.data.message);
        });
    }

    // Atualiza o objeto de estado para cada mudança de input
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };


    const [validated, setValidated] = useState(false);

    const [show] = useState(true);


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

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const header = <div className="font-bold mb-3">digite sua nova senha</div>;
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


    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return renderStep0();
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            default:
                return null;
        }
    };

    const renderStep0 = () => (
        <h5 style={{ textAlign: "center" }}>Olá! Seja bem-vindo à Fit Tech. Gostaríamos de conhecê-lo melhor!</h5>
    );

    const renderStep1 = () => (
        <Form noValidate validated={validated} className={Styles.box_form}>
            <Col className={Styles.form}>
                <Form.Group>
                    <div className={Styles["input-container"]}>
                        <label>Seu Nome</label>
                        <Form.Control required type="text" value={newUser.nome} name="nome" onChange={handleInputChange} />
                    </div>
                </Form.Group>

                <Form.Group>
                    <div className={Styles["input-container"]}>
                        <label>Seu Email</label>
                        <Form.Control required type="text" value={email} readOnly />
                    </div>
                </Form.Group>


                <Form.Group controlId="validationCustomSenha">
                    <div className={`${Styles["input-container"]}`}>
                        <FloatLabel>
                            <Password
                                type="password"
                                required
                                className={Styles.pass}
                                name="senha" value={newUser.senha}
                                onChange={handleInputChange}
                                header={header}
                                footer={footer}
                                toggleMask
                                promptLabel="Nível senha"
                                weakLabel="Fraca"
                                mediumLabel="Média"
                                strongLabel="Forte"
                            />
                            <label className={Styles.labels} htmlFor="password">Nova senha</label>
                        </FloatLabel>
                    </div>
                </Form.Group>
            </Col>
        </Form>
    );

    const renderStep2 = () => (
        <Form noValidate validated={validated} className={Styles.box_form}>
            <Col className={Styles.form}>
                <Form.Group controlId="validationCustomGenero">
                    <div className={Styles["input-container"]}>
                        <label>Seu Gênero:</label>
                        <Form.Select aria-label="Select sexo" name="genero" onChange={handleInputChange} defaultValue={newUser.genero}>
                            <option disabled value="">Selecione seu gênero</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="N/A">Prefiro não informar</option>
                        </Form.Select>
                    </div>
                </Form.Group>



                <Form.Group controlId="validationCustomPeso">
                    <div className={Styles["input-container"]}>
                        <Form.Control required type="number" name="peso" onChange={handleInputChange} value={newUser.peso} />
                        <Form.Control.Feedback type="invalid">Por favor informe seu peso!</Form.Control.Feedback>
                        <label className={Styles.label}>Digite seu peso</label>
                    </div>
                </Form.Group>

                <Form.Group controlId="validationCustomAltura">
                    <div className={Styles["input-container"]}>
                        <Form.Control required type="number" name="altura" onChange={handleInputChange} value={newUser.altura} />
                        <Form.Control.Feedback type="invalid">Por favor informe sua altura!</Form.Control.Feedback>
                        <label className={Styles.label}>Digite sua altura</label>
                    </div>
                </Form.Group>
            </Col>
        </Form>
    );

    const renderStep3 = () => (
        <Form validated={validated} className={Styles.box_form}>
            <Col className={Styles.form}>
                <Form.Group>
                    <div className={Styles["input-container"]}>
                        <label>Informe sua data de nascimento</label>
                        <Form.Control type="date" required name="dataNascimento" onChange={handleInputChange} value={newUser.dataNascimento} />
                        <Form.Control.Feedback type="invalid">Por favor informe sua data de nascimento.</Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group controlId="validationCustomMeta">
                    <div className={Styles["input-container"]}>
                        <label>Sua Meta:</label>
                        <Form.Select aria-label="Select meta" name="meta" onChange={handleInputChange} defaultValue={newUser.meta}>
                            <option disabled value="">Selecione sua meta</option>
                            <option value="PerderPeso">Perder peso</option>
                            <option value="GanharMassa">ganhar massa muscular</option>
                        </Form.Select>
                    </div>
                </Form.Group>

                <Form.Group controlId="validationCustomNivel">
                    <div className={Styles["input-container"]}>
                        <label>Seu nível de condição física:</label>
                        <Form.Select aria-label="Select condicionamento fisico" name="nivelCondicao" onChange={handleInputChange} defaultValue={newUser.nivelCondicao}>
                            <option disabled value="">Selecione seu nível</option>
                            <option value="Basico">Não treino</option>
                            <option value="Mediano">Treino as vezes</option>
                            <option value="Avancado">treino diariamente</option>
                        </Form.Select>
                    </div>
                </Form.Group>
            </Col>
        </Form>
    );
    return (
        <>
            <Modal show={show} animation={true}>
                <div className={Styles.box}>
                    <div className={Styles.container}>
                        <Stack sx={{ width: '100%' }} spacing={4}>
                            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel
                                            StepIconComponent={ColorlibStepIcon}
                                            sx={{
                                                '& .MuiStepLabel-label': {
                                                    color: index === activeStep ? 'green !important' : index < activeStep ? 'white' : 'inherit',
                                                },
                                                '&.MuiStepLabel-label.Mui-active': {
                                                    color: 'green'
                                                }
                                            }}>
                                            {label}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            {renderStepContent(activeStep)}

                            <Stack direction="row" spacing={2}>
                                <Button onClick={handleBack} variant="outlined">Voltar</Button>
                                <Button
                                    variant={activeStep !== steps.length - 1 ? "contained" : "outlined"}
                                    onClick={activeStep !== steps.length - 1 ? handleNext : handleSubmit}
                                    style={activeStep !== steps.length - 1 ? null : { border: "1px solid green", color: "green" }}>
                                    {activeStep !== steps.length - 1 ? "Próximo" : "Finalizar"}
                                </Button>
                            </Stack>
                        </Stack>
                    </div>
                </div>
            </Modal>
        </>
    )
}



export default CustomizedSteppers;