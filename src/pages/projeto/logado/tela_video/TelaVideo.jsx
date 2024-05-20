import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Styles from "./TelaVideo.module.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ModalDescanso from '../../../../components/projeto/modal_descanso/ModalDescanso';
import { FitnessCenterOutlined } from '@mui/icons-material';
import { getId } from '../../../../service/auth';
import Api from '../../../../api';
import { perderPeso1, perderPeso2 } from '../../../../utils/vetor/perderPeso';
import { ganharMassa, ganharMassa2 } from '../../../../utils/vetor/ganharMassa';


const TelaVideo = () => {
    const { url } = useParams();
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [modalDescanso, setModalDescanso] = useState(false);
    const [open, setOpen] = useState(false);
    const [objetivo, setObjetivo] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleNavigate = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    // Valores de treino válidos
    const validUrls = useMemo(() => [
        "Diario",
        "Cardio (Alta Intensidade)",
        "Funcional",
        "Cardio (Baixa Intensidade)",
        "Alongamento"
    ], []);

    useEffect(() => {
        if (!validUrls.includes(url)) {
            handleNavigate('/homeProjeto/treino');
        }
    }, [url, validUrls, handleNavigate]);


    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            handleNavigate("logar");
            window.location.reload();
        }
    }, [handleNavigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`treinos/validar/${getId()}`);
                const userData = response.data;
                setObjetivo(userData.usuario.objetivo.objetivo)

                if (url === "Diario") {
                    switch (userData.tipoTreino) {
                        case "PerderPeso_1":
                            setVideos(perderPeso1);
                            break;
                        case "PerderPeso_2":
                            setVideos(perderPeso2);
                            break;
                        case "GanharMassa_1":
                            setVideos(ganharMassa);
                            break;
                        case "GanharMassa_2":
                            setVideos(ganharMassa2);
                            break;
                        default:
                            console.warn("Tipo de treino desconhecido:", userData.tipoTreino);
                    }
                } else {
                    console.log("Treino não é diário");
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                handleNavigate("../homeProjeto/treino");
            }
        };

        fetchData();
    }, [handleNavigate, url]);

    useEffect(() => {
        if (modalDescanso) {
            const timer = setTimeout(() => setModalDescanso(false), 800);
            return () => clearTimeout(timer);
        }
    }, [modalDescanso]);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };


    const atualizarPontos = async () => {

        try {
            await Promise.all([
                Api.put(`treinos/${getId()}`),
                Api.put(`usuarios/pontuacao/${getId()}`)
            ]);

            setTimeout(() => {
                handleNavigate("../homeProjeto/treino");
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <ModalDescanso boolean={modalDescanso} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ margin: "0", height: "100vh" }}>
                    <Grid xs={12} sm={10}>
                        <div className={Styles.container}>
                            <div className="box_img">
                                <Tabs size="md" aria-label="Basic tabs" defaultValue={0} sx={{ borderRadius: "20px" }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList>
                                            <Tab color="danger">Execução do exercício</Tab>
                                            <Tab color="danger">Mais detalhes</Tab>
                                            <Tab disabled>
                                                <span style={{ textAlign: "center", color: "black" }}>{videos[selectedIndex]?.repeticao}</span>
                                            </Tab>
                                        </TabList>
                                    </Box>
                                    <TabPanel value={0}>
                                        <img src={videos[selectedIndex]?.backgroundImage} alt="gif do treino a ser feito" />
                                    </TabPanel>
                                    <TabPanel value={1}>
                                        <h3>Benefícios</h3>
                                        {videos[selectedIndex]?.beneficios.split('\n').map((line, index) => (
                                            <p style={{ color: "black", textAlign: "justify" }} key={index}>{line}</p>
                                        ))}
                                        <h3>Técnica</h3>
                                        {videos[selectedIndex]?.tecnica.split('\n').map((line, index) => (
                                            <p style={{ color: "black", textAlign: "justify" }} key={index}>{line}</p>
                                        ))}
                                    </TabPanel>
                                </Tabs>
                                <Stack direction="row" spacing={2} className={Styles.box_button}>
                                    <Button variant="contained" disabled={selectedIndex === 0} onClick={(event) => handleListItemClick(event, selectedIndex - 1)}>
                                        Voltar exercício
                                    </Button>
                                    <Button variant="contained" color="success" disabled={selectedIndex + 1 === videos.length} onClick={(event) => { handleListItemClick(event, selectedIndex + 1); setModalDescanso(true); }}>
                                        Próximo exercício
                                    </Button>
                                </Stack>
                            </div>
                            <Box sx={{ width: '100%', border: '1px solid #474747', display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <List component="nav" aria-label="Lista de treino">
                                    <p>{objetivo ? objetivo : "Não desista, acreditamos em você"} !</p>
                                    {videos.map((card, index) => (
                                        <div key={index}>
                                            <ListItemButton selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)}>
                                                <ListItemText primary={card.nome} />
                                                <FitnessCenterOutlined style={{ fill: selectedIndex > index ? "green" : selectedIndex === index ? "#ed6c02" : "white" }} />
                                            </ListItemButton>
                                            <Divider style={{ backgroundColor: "white" }} />
                                        </div>
                                    ))}
                                </List>
                                <Stack direction="row" spacing={2} className={Styles.box_button}>
                                    <Button variant="outlined" color="warning" onClick={() => handleNavigate("../homeProjeto/treino")}>
                                        Sair
                                    </Button>
                                    <Button variant="outlined" color="success" disabled={selectedIndex + 1 !== videos.length} onClick={() => { setOpen(true); atualizarPontos() }}>
                                        Concluir treino
                                    </Button>
                                </Stack>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Box>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        backgroundColor: "var(--preto-tom-menor)",
                        color: "white"
                    }}
                >
                    <Typography component="h2" id="modal-title" level="h4" textColor="white" fontWeight="lg" mb={1}>
                        Parabéns! Continue com o excelente trabalho e nos vemos no próximo treino!
                    </Typography>
                    <Typography id="modal-desc" textColor="white" textAlign="justify">
                        Você será redirecionado em breve.
                    </Typography>
                    <img src="https://workover.com.br/build/assets/dancing-giraffe.2068ddb3.gif" alt="Girafa dançando" />
                </Sheet>
            </Modal>
        </>
    );
};

export default TelaVideo;
