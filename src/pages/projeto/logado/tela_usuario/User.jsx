import React, { useState, useEffect, useMemo } from 'react';
import Styles from './User.module.css'
import NavBar from "../../../../components/projeto/navBar/NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FindImage from "../../../../components/projeto/GET/ProcurarImg";
import Table from 'react-bootstrap/Table';
import Api from '../../../../api';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { getId } from '../../../../service/auth';
import { useNavigate } from "react-router-dom";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import { EggFried, FiletypeCsv, ArrowUpLeftCircle, Trash, ArrowsVertical } from 'react-bootstrap-icons';

import ScoreIcon from '@mui/icons-material/Score';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

import BarDirection from "../../../../components/projeto/Charts/BarDirection"
import LineDirection from "../../../../components/projeto/Charts/LineChart"
import AxisDirection from "../../../../components/projeto/Charts/AxisDirection"
import HearingIcon from '@mui/icons-material/Hearing';
import Section3 from '../../../../components/projeto/Charts/Section3'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import moment from 'moment';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Brightness6, Brightness7, KeyboardArrowDown, Nightlight, NightsStay } from '@mui/icons-material';
import { IconButton } from '@mui/joy';
import ModalDieta from '../../../../components/projeto/modal_dieta/ModalDieta';

import cafe from "../../../../utils/cafe-da-manha.jpg"
import almoco from "../../../../utils/almoco.jpg"
import lanche from "../../../../utils/lanche.jpg"
import jantar from "../../../../utils/jantar.jpg"
import ceia from "../../../../utils/ceia.webp"

const options = ["",
    "Acredite e faça acontecer.",
    "Persista e vença.",
    "Seja a mudança que você quer ver no mundo.",
    "Sonhe grande e corra atrás.",
    "Você é capaz.",
    "Cada passo conta.",
    "Vá em frente sem medo.",
    "A jornada é a recompensa.",
    "Nunca desista.",
    "O impossível é apenas uma questão de opinião."];


const User = () => {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    };


    const [showDelete, setshowDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [showPeso, setShowPeso] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);


    const [valueMessage, setValueMessage] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    const [open, setOpen] = useState(false);


    const handleShow = () => setShow(true);
    const handleshowDelete = () => setshowDelete(true);
    const handleshowPeso = () => setShowPeso(true);



    const handleClose = () => setShow(false);
    const handleCloseDelete = () => setshowDelete(false);
    const handleClosePeso = () => setShowPeso(false);


    const [user, setUser] = useState({
        peso: '',
        pesoMeta: '',
        usuario: {
            nome: '',
            dataNascimento: '',
            genero: '',
            altura: '',
            nivelCondicao: '',
            meta: '',
            objetivo: '',
            pontuacao: ''
        }
    });

    const [peso, setPeso] = useState('');
    const [pesoMeta, setPesoMeta] = useState('');

    const [qtdDieta, setqtdSelecionada] = useState(0);
    const [dieta, setDieta] = useState([]);

    const predefinedCards = useMemo(() => [
        { id: 1, horario: "09:00", img: cafe, icon: LightModeIcon },
        { id: 2, horario: "12:00", img: almoco, icon: Brightness7 },
        { id: 3, horario: "15:00", img: lanche, icon: Brightness6 },
        { id: 4, horario: "19:00", img: jantar, icon: NightsStay },
        { id: 5, horario: "22:00", img: ceia, icon: Nightlight },
    ], []);

    const [dietaEx, setDietaEx] = useState([]);

    // dados do usuario
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`/pesos/ultima-insercao/${getId()}`);
                const userData = response.data;
                setUser(userData);
                loadDieta();
            } catch (error) {
                toast.error(error.message);
            }
        };

        const loadDieta = async () => {
            try {

                const response = await Api.get(`/openai/${getId()}`, {
                    params: { objetivo: user.usuario.meta }
                });

                const apiData = response.data;

                if (!Array.isArray(apiData)) {
                    return null
                }

                setqtdSelecionada(apiData[0]?.qtdSelecionada || 0);
                const updatedCardsData = apiData.map((data, index) => {
                    if (index < predefinedCards.length && apiData[index].qtdSelecionada >= 3) {
                        return {
                            ...predefinedCards[index],
                            titulo: data.nome || `Título 1`,
                            descricao: data.modoPreparo || `Descrição 1`,
                            carboidratos: Number(data.carboidratos) || 0,
                            calorias: Number(data.calorias) || 0,
                            gorduras: Number(data.gorduras) || 0,
                            proteinas: Number(data.proteina) || 0,
                            acucares: data.acucar || 0,
                            tempoPreparo: data.tempoPreparo || 0,
                            ingredientes: data.ingredientes || [],
                        };
                    } else {
                        return null;
                    }
                });

                setDieta(updatedCardsData.filter(card => card !== null));
                setDietaEx(apiData);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, [predefinedCards, user.usuario.meta]);

    const closeModal = () => {
        setSelectedCard(null);
    };

    const [focusedInput, setFocusedInput] = React.useState(false);
    const [focusedInput2, setFocusedInput2] = React.useState(false);

    // Atualizar peso
    const handleVadidate = () => {
        if (peso === "" || pesoMeta === "") {
            toast.error("Não pode haver campos vazios.");
            setFocusedInput(peso === '');
            setFocusedInput2(pesoMeta === '');

        } else {
            const data = moment().format('YYYY-MM-DD');

            Api.post(`pesos/${getId()}`, {
                "dataPostagem": data,
                "peso": peso,
                "pesoMeta": pesoMeta

            }).then(() => {
                toast.success("Peso atualizado com sucesso!");
                setTimeout(() => window.location.reload()
                    , 2000);
            }).catch(function (error) {
                toast.error(error.response.data.message);
            });
        }
    }


    // trocar mensagem
    const updateMessage = async () => {
        toast.dismiss();
        if (inputValue === "") {
            toast.info("Por favor informe sua motivação");
        } else {
            Api.put(`objetivos/${getId()}`, {
                objetivo: inputValue

            }).then(() => {

                toast.success("Mensagem atualizada com sucesso!");
                setTimeout(() => window.location.reload()
                    , 2000);

            }).catch(function (error) {
                toast.error(error.response.data.message);
            });
        }
    }

    // baixar csv
    const handleDownload = async () => {
        try {
            const response = await Api.get('usuarios/download', {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'dados.csv');
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erro ao fazer o download do arquivo:', error);
        }
    };

    // atualizar imagem
    const handleImageChange = async (event) => {
        const newImageFile = event.target.files[0];

        if (newImageFile) {
            const maxSize = 2 * 1024 * 1024;
            const fileSize = newImageFile.size;
            if (fileSize <= maxSize) {
                const formData = new FormData();
                formData.append('imageFile', newImageFile);
                toast.info("Tratando imagem ...")

                try {
                    await Api.patch(`usuarios/imagem/${getId()}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    toast.success('Imagem atualizada com sucesso!');
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } catch (error) {
                    toast.error('Erro ao atualizar a imagem, tente novamente mais tarde');
                }
            } else {
                toast.info('Por favor, selecione uma imagem menor que 2 MB.');
                event.target.value = null;
            }
        }
    }

    const deletarConta = () => {

        Api.delete(`usuarios/${getId()}`, {
        }).then(() => {

            toast.success("Exclusão feita com sucesso!");
            toast.success(`Até mais ${user.usuario.nome}!`);
            setTimeout(() => { navigate("/logar"); }, 2000);

        }).catch(function (error) {
            toast.error("Desculpe, tente novamente mais tarde!");
        });
    }

    const bloquearConta = () => {

        Api.delete(`usuarios/${getId()}/inativar`, {
        }).then(() => {

            toast.success("Inativação feita com sucesso!");
            toast.success(`Até mais ${user.usuario.nome}!`);
            setTimeout(() => { navigate("/logar"); }, 2000);

        }).catch(function (error) {
            toast.error("Desculpe, tente novamente mais tarde!");
        });
    }

    const ariaLabel = { 'aria-label': 'description' };

    return (
        <>
            <NavBar />
            <Container style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
                <Row className={Styles.container}>
                    <Col className={Styles.cols} style={{ display: "flex", flexDirection: "column", gap: "30px" }} sm>
                        <Card border="danger" bg="dark">
                            <Card.Header className={Styles.title}>SOBRE VOCÊ</Card.Header>
                            <Card.Body>
                                <div className={Styles.box}>
                                    <form className={Styles.box_image}>
                                        <label htmlFor="file" className={Styles.custom_file_button}>{FindImage()}</label>
                                        <input type="file" onChange={handleImageChange} accept="image/*" id="file" name="file" />
                                    </form>
                                    <p>Olá, {user.usuario.nome}</p>
                                    <p>{user.usuario.genero}</p>
                                    <p>{user.usuario.objetivo.objetivo ? user.usuario.objetivo.objetivo : "--"}</p>
                                    <span className={Styles.line} />
                                    <div className={Styles.box}>

                                        <div className={Styles.box_text}> <GpsNotFixedIcon color="white" size={22} className="align-center" /> <span>{user.usuario.meta === "GanharMassa" ? "Ganhar Massa" : "Perder Peso"}</span></div>

                                        <div className={Styles.box_text}> <MonitorWeightIcon color="white" size={22} className="align-center" /> <span>Peso: {user.usuario.peso} kg</span></div>

                                        <div className={Styles.box_text}> <ArrowsVertical color="white" size={22} className="align-center" /> <span>Altura: {user.usuario.altura}cm</span></div>

                                        <div className={Styles.box_text}> <ScoreIcon color="white" size={22} className="align-center" /> <span>Pontos: {user.usuario.pontuacao}</span></div>
                                    </div>
                                    <span className={Styles.line} />
                                    <div className={Styles.box}>

                                        <div className={`${Styles.box_text} ${Styles.active}`} onClick={() => handleNavigate('../homeProjeto/dieta')}> <EggFried color="white" size={22} className="align-center" /><span>Dieta</span></div>

                                        <div onClick={handleDownload} className={`${Styles.box_text} ${Styles.active}`}> <FiletypeCsv color="white" size={22} className="align-center" /><span>Dados</span></div>

                                        <div className={`${Styles.box_text} ${Styles.active}`} onClick={handleShow}> <HearingIcon color="white" size={22} className="align-center" /><span>Apoio</span></div>

                                        <div className={`${Styles.box_text} ${Styles.active}`} onClick={() => handleNavigate('Editar')}> <ArrowUpLeftCircle color="white" size={22} className="align-center" /><span>Editar</span></div>

                                        <div className={`${Styles.box_text} ${Styles.active}`} onClick={handleshowPeso}> <FitnessCenterIcon color="white" size={22} className="align-center" /><span>Atualizar peso</span></div>

                                        <div className={`${Styles.box_text} ${Styles.active}`} onClick={handleshowDelete}> <Trash color="white" size={22} className="align-center" /><span>Excluir conta</span></div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        <div className={Styles.visualization}>
                            <Section3 />
                        </div>
                    </Col>

                    <Col sm>
                        <Card border="danger" bg="dark">
                            <Card.Header className={Styles.title}>GRÁFICOS</Card.Header>
                            <Card.Body className={Styles.box_graf}>
                                <Card className={Styles.card_graf}>
                                    <Card.Body>
                                        <Card.Title className={Styles.title}>Treinos feitos na semana</Card.Title>
                                        <BarDirection />
                                    </Card.Body>
                                </Card>
                                <Card className={Styles.card_graf}>
                                    <Card.Body>
                                        <Card.Title className={Styles.title}>Histórico de Peso do Usuário</Card.Title>
                                        <LineDirection />
                                    </Card.Body>
                                </Card>

                                <Card className={Styles.card_graf}>
                                    <Card.Body>
                                        <Card.Title className={Styles.title}>Objetivo de peso</Card.Title>
                                        <AxisDirection />
                                    </Card.Body>
                                </Card>

                                <Card className={Styles.card_graf}>
                                    <Card.Body>
                                        <Card.Title className={Styles.title}>Alimentação diária</Card.Title>

                                        <List variant="plain">
                                            <div style={{ height: "200px", overflowY: "auto" }}>
                                                <ListItem nested>
                                                    <ListSubheader>Dieta diária</ListSubheader>
                                                    <List>
                                                        <ListItem>
                                                            <Table striped hover variant="dark">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Icon</th>
                                                                        <th>Horário</th>
                                                                        <th>Caloria</th>
                                                                        <th>Proteína</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {(dieta.length > 0) ? (
                                                                        dieta.slice(0, qtdDieta).map((result) => (
                                                                            <tr key={result.id} style={{ cursor: "pointer" }} onClick={() => setSelectedCard(result)}>
                                                                                <td><result.icon color="white" size={22} className="align-center" /></td>
                                                                                <td>{result.horario}</td>
                                                                                <td>{result.calorias}(kcal)</td>
                                                                                <td style={{ textAlign: "center" }}>{result.proteinas}(g)</td>
                                                                            </tr>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="4">Nenhuma receita feita</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </Table>
                                                        </ListItem>
                                                    </List>
                                                </ListItem>
                                            </div>
                                            <div style={{ height: "150px", overflowY: "auto" }}>
                                                <ListItem
                                                    nested
                                                    sx={{ my: 1 }}
                                                    startAction={
                                                        <IconButton
                                                            size="sm"
                                                            color="success"
                                                            onClick={() => setOpen(!open)}
                                                        >
                                                            <KeyboardArrowDown
                                                                sx={{ transform: open ? 'initial' : 'rotate(-90deg)' }}
                                                            />
                                                        </IconButton>
                                                    }>
                                                    <ListSubheader sx={{ marginLeft: "20px" }}>Receitas extras</ListSubheader>
                                                    {open && (
                                                        <List>
                                                            <ListItem>
                                                                <Table striped hover variant="dark">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Nome</th>
                                                                            <th>Calorias</th>
                                                                            <th>Proteínas</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {dietaEx.some(result => result.qtdSelecionada === 1) ? (
                                                                            dietaEx.map((result) => (
                                                                                result.qtdSelecionada === 1 ? (
                                                                                    <tr key={result.id} style={{ cursor: "pointer" }} onClick={() => setSelectedCard({
                                                                                        titulo: result.nome || `Título 1`,
                                                                                        descricao: result.modoPreparo || `Descrição 1`,
                                                                                        carboidratos: Number(result.carboidratos) || 0,
                                                                                        calorias: Number(result.calorias) || 0,
                                                                                        gorduras: Number(result.gorduras) || 0,
                                                                                        proteinas: Number(result.proteina) || 0,
                                                                                        acucares: result.acucar || 0,
                                                                                        img: result.image,
                                                                                        tempoPreparo: result.tempoPreparo || 0,
                                                                                        ingredientes: result.ingredientes || [],
                                                                                    })}>
                                                                                        <td>{result.nome}</td>
                                                                                        <td>{result.calorias}(kcal)</td>
                                                                                        <td style={{ textAlign: "center" }}>{result.proteina}(g)</td>
                                                                                    </tr>
                                                                                ) : null
                                                                            ))
                                                                        ) : (
                                                                            <tr>
                                                                                <td colSpan="3">Nenhuma receita extra feita</td>
                                                                            </tr>
                                                                        )}

                                                                    </tbody>
                                                                </Table>
                                                            </ListItem>
                                                        </List>
                                                    )}
                                                </ListItem>
                                            </div>
                                        </List>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col className={`${Styles.cols} ${Styles.section_none}`} sm>
                        <Section3 />
                    </Col>
                </Row >
            </Container>


            {/* Modal apoio */}
            < Modal show={show} onHide={handleClose} centered >
                <div className={Styles.backModal}>
                    <Modal.Header>
                        <Modal.Title>Sua nova mensagem motivacional</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={options}
                                value={valueMessage}
                                onChange={(event, newValue) => {
                                    setValueMessage(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        color="error"
                                        {...params}
                                        label="Escreva sua mensagem"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                        InputLabelProps={{
                                            style: { color: 'white' }
                                        }}
                                        sx={{
                                            '& input': {
                                                color: 'white'
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'white'
                                            },
                                        }}
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <li {...props} style={{ backgroundColor: 'var(--preto)', color: 'white' }}>
                                        {option}
                                    </li>
                                )}
                            />

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button variant="outline-success" onClick={() => updateMessage()}>
                            Salvar mensagem
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal >

            {/* Modal deletar */}
            < Modal show={showDelete} onHide={handleCloseDelete} centered >
                <div className={Styles.backModal}>
                    <Modal.Header>
                        <Modal.Title>Excluir Conta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Tem certeza de que deseja excluir sua conta?</p>
                        <p>Isso resultará na perda de todo o seu progresso.</p>
                        <p>Se preferir, pode optar por bloquear sua conta temporariamente.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            Fechar
                        </Button>
                        <Button variant="outline-danger" onClick={() => deletarConta()}>
                            Excluir Conta
                        </Button>
                        <Button variant="outline-success" onClick={() => bloquearConta()}>
                            Bloquear Conta
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal >

            {/* Modal peso */}
            < Modal show={showPeso} onHide={handleClosePeso} centered >
                <div className={Styles.backModal}>
                    <Modal.Header>
                        <Modal.Title>Atualize seu peso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Digite seu peso (KG)"
                                color="error"
                                error={focusedInput}
                                placeholder={user.peso ? String(user.peso) : "0.0"}
                                inputProps={ariaLabel}
                                onChange={(e) => setPeso(e.target.value)}
                                InputLabelProps={{
                                    style: { color: 'white' }
                                }}
                                sx={{
                                    '& input': {
                                        color: 'white'
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white'
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                type="number"
                                label="Digite sua meta de peso atual (KG)"
                                color="error"
                                error={focusedInput2}
                                placeholder={user.pesoMeta ? String(user.pesoMeta) : "0.0"}
                                onChange={(e) => setPesoMeta(e.target.value)}
                                InputLabelProps={{
                                    style: { color: 'white' }
                                }}
                                sx={{
                                    '& input': {
                                        color: 'white'
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white'
                                    },
                                }}
                            />
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClosePeso}>
                            Fechar
                        </Button>
                        <Button variant="outline-success" onClick={handleVadidate}>
                            Atualizar peso
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal >

            {selectedCard && <ModalDieta card={selectedCard} onClose={closeModal} />}
        </>
    )
}

export default User;