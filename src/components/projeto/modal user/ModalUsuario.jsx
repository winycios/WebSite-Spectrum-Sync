import { React, useState } from "react";
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
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import Logo from "../../../utils/assets/semFundo.svg"

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import Styles from "./ModalUsuario.module.css"

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

    const ImgIcon = () => <img src={Logo} alt="Logo" style={{ width: "70px", height: "70px" }} />;

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


const CustomizedSteppers = () => {
    const [validated, setValidated] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
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

    // popover

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <h5 style={{ textAlign: "center" }}>Olá! Seja bem-vindo à Fit Tech. Gostaríamos de conhecê-lo melhor!</h5>
                    </>
                );
            case 1:
                return (
                    <Form noValidate validated={validated} className={Styles.box_form}>
                        <Col className={Styles.form}>
                            <Form.Group>
                                <div className={Styles["input-container"]}>
                                    <label>Seu Nome</label>
                                    <Form.Control required type="text" value="po" readOnly />
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <div className={Styles["input-container"]}>
                                    <label>Seu Email</label>
                                    <Form.Control required type="text" value="winycios@gmail.com" readOnly />
                                </div>
                            </Form.Group>


                            <Form.Group controlId="validationCustomSenha">
                                <div className={Styles["input-container"]}>
                                    <Form.Control type="password" required />
                                    <Form.Control.Feedback type="invalid">Por favor digite sua senha.</Form.Control.Feedback>
                                    <label className={Styles.label}>
                                        Digite sua nova Senha
                                    </label>
                                    <span aria-describedby={id} onClick={handleClick}>Renovar senha ?</span>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClosePopover}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        sx={{
                                            '& .MuiTypography-root ': {
                                                background: "#0f0f0f"
                                            }
                                        }}
                                    >
                                        <Typography sx={{ p: 2 }}>Renove sua senha por segurança após o login.</Typography>
                                    </Popover>
                                </div>
                            </Form.Group>
                        </Col>
                    </Form>
                );
            case 2:
                return (
                    <Form noValidate validated={validated} className={Styles.box_form}>
                        <Col className={Styles.form}>
                            <Form.Group controlId="validationCustomGenero">
                                <div className={Styles["input-container"]}>
                                    <label>Seu Gênero:</label>
                                    <Form.Select aria-label="Select sexo">
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                        <option value="N/A">Prefiro não informar</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>


                            <Form.Group controlId="validationCustomPeso">
                                <div className={Styles["input-container"]}>
                                    <Form.Control required type="number" />
                                    <Form.Control.Feedback type="invalid">Por favor informe seu peso!</Form.Control.Feedback>
                                    <label className={Styles.label}>Digite seu peso</label>
                                </div>
                            </Form.Group>

                            <Form.Group controlId="validationCustomAltura">
                                <div className={Styles["input-container"]}>
                                    <Form.Control required type="number" />
                                    <Form.Control.Feedback type="invalid">Por favor informe sua altura!</Form.Control.Feedback>
                                    <label className={Styles.label}>Digite sua altura</label>
                                </div>
                            </Form.Group>
                        </Col>
                    </Form>
                );
            case 3:
                return (
                    <Form noValidate validated={validated} className={Styles.box_form}>
                        <Col className={Styles.form}>
                            <Form.Group controlId="validationCustomMeta">
                                <div className={Styles["input-container"]}>
                                    <label>Sua Meta:</label>
                                    <Form.Select aria-label="Select meta">
                                        <option value="peso">Perder peso</option>
                                        <option value="massa">ganhar massa muscular</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <div className={Styles["input-container"]}>
                                    <label>Informe sua data de nascimento</label>
                                    <Form.Control type="date" required />
                                    <Form.Control.Feedback type="invalid">Por favor informe sua data de nascimento.</Form.Control.Feedback>
                                </div>
                            </Form.Group>

                            <Form.Group controlId="validationCustomNivel">
                                <div className={Styles["input-container"]}>
                                    <label>Seu nível de condição física:</label>
                                    <Form.Select aria-label="Select condicionamento fisico">
                                        <option value="Basico">Não treino</option>
                                        <option value="Mediano">Treino as vezes</option>
                                        <option value="Avancado">treino diariamente</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                        </Col>
                    </Form>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} animation={true}>
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
                                            }}
                                        >
                                            {label}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            {renderStepContent(activeStep)}

                            <Stack direction="row" spacing={2}>
                                <Button
                                    onClick={handleBack}
                                    variant="outlined"
                                >
                                    Voltar
                                </Button>
                                <Button
                                    variant={activeStep !== steps.length - 1 ? "contained" : "outlined"}
                                    onClick={activeStep !== steps.length - 1 ? handleNext : handleSubmit}
                                    style={activeStep !== steps.length - 1 ? null : { border: "1px solid green", color: "green" }}>
                                    {activeStep !== steps.length - 1 ? "Próximo" : "Finalizar"}
                                </Button>
                            </Stack>
                        </Stack>
                    </div>
                </div >
            </Modal>
        </>
    );
}


export default CustomizedSteppers;