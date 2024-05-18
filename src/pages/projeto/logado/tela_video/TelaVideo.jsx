import React, { useEffect, useState } from 'react';
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

import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ModalDescanso from '../../../../components/projeto/modal_descanso/ModalDescanso';

import { FitnessCenterOutlined } from '@mui/icons-material';

const TelaVideo = () => {
    var url = useParams();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            handleNavigate("logar");
            window.location.reload();
        }
    });


console.log(url)
    const [modalDescanso, setModalDescanso] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const perderPeso = [
        {
            "nome": "Agachamento (Squat)",
            "repeticao": "4x de 20 repetições",
            "backgroundImage": "https://media1.tenor.com/m/Re3T3B66V9UAAAAd/barbellsquats-gymexercisesmen.gif",
            "beneficios": "Desenvolvimento Muscular: Principalmente quadríceps, glúteos e isquiotibiais.\nForça Funcional: Melhora a força para atividades diárias.\nEstabilidade e Equilíbrio: Fortalece o core e melhora a coordenação.",
            "tecnica": "Respiração: Inalar na descida e exalar na subida.\nAlinhamento: Manter joelhos alinhados com os pés.\nCore Ativado: Manter o abdômen contraído durante todo o movimento.\nAmplitude de Movimento: Completar o movimento com a maior amplitude possível, respeitando os limites do corpo."
        },
        {
            "nome": "Rosca Alternada",
            "repeticao": "4x de 20 repetições",
            "backgroundImage": "https://www.mundoboaforma.com.br/wp-content/uploads/2022/09/rosca-biceps-direta-com-halteres.gif",
            "beneficios": "Desenvolvimento Muscular: Fortalece os bíceps e antebraços.\nForça de Preensão: Melhora a força da pegada.\nEstabilidade Articular: Contribui para a estabilidade do cotovelo.",
            "tecnica": "Postura: Manter as costas retas e os ombros para trás.\nMovimento Controlado: Levantar e abaixar os halteres de forma controlada.\nRespiração: Exalar ao levantar o peso e inalar ao abaixar.\nAlinhamento: Manter os cotovelos próximos ao corpo durante todo o movimento."
        },
        {
            "nome": "Tríceps na Máquina",
            "repeticao": "4x de 20 repetições",
            "backgroundImage": "https://www.mundoboaforma.com.br/wp-content/uploads/2021/07/triceps-sentado-no-aparelho.gif",
            "beneficios": "Desenvolvimento Muscular: Foca nos músculos tríceps.\nIsolamento Muscular: Permite um trabalho mais isolado do tríceps.\nFacilidade de Uso: Ideal para iniciantes e pessoas com dificuldade em usar pesos livres.",
            "tecnica": "Posicionamento: Ajustar a máquina para que os cotovelos fiquem alinhados com o ponto de rotação do aparelho.\nMovimento: Estender completamente os braços sem travar os cotovelos.\nRespiração: Exalar ao empurrar e inalar ao voltar à posição inicial.\nControle: Manter o movimento lento e controlado."
        },
        {
            "nome": "Flexão de Braço",
            "repeticao": "4x de 20 repetições",
            "backgroundImage": "https://media1.tenor.com/m/Re3T3B66V9UAAAAd/barbellsquats-gymexercisesmen.gif",
            "beneficios": "Desenvolvimento Muscular: Trabalha peitoral, tríceps e deltoides.\nForça Funcional: Melhora a força para atividades diárias.\nEstabilidade do Core: Fortalece o abdômen e a região lombar.",
            "tecnica": "Alinhamento: Manter as mãos na linha dos ombros e os cotovelos próximos ao corpo.\nPostura: Manter o corpo reto da cabeça aos pés.\nRespiração: Inalar ao descer e exalar ao subir.\nAmplitude de Movimento: Descer até que o peito quase toque o chão, respeitando os limites do corpo."
        },
        {
            "nome": "Puxada na Frente",
            "repeticao": "4x de 20 repetições",
            "backgroundImage": "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-puxada-aberta-com-barra-no-pulley.gif",
            "beneficios": "Desenvolvimento Muscular: Principalmente dorsais, bíceps e ombros.\nPostura: Melhora a postura ao fortalecer os músculos das costas.\nForça Funcional: Facilita atividades que envolvem puxar.",
            "tecnica": "Posicionamento: Sentar com os pés firmes e ajustar a almofada das coxas.\nPegada: Manter uma pegada aberta na barra.\nMovimento: Puxar a barra até a parte superior do peito, mantendo os cotovelos para baixo e para trás.\nRespiração: Exalar ao puxar a barra e inalar ao retornar à posição inicial."
        },
        {
            "nome": "Elevação Lateral",
            "repeticao": "4x de 20 repetições",
            "backgroundImage": "https://www.hipertrofia.org/blog/wp-content/uploads/2023/11/dumbbell-lateral-raise.gif",
            "beneficios": "Desenvolvimento Muscular: Fortalece os deltoides laterais.\nSimetria: Ajuda a desenvolver a simetria nos ombros.\nAmplitude de Movimento: Melhora a amplitude de movimento dos ombros.",
            "tecnica": "Postura: Manter as costas retas e os joelhos levemente flexionados.\nMovimento: Levantar os halteres até a altura dos ombros com os braços ligeiramente flexionados.\nRespiração: Exalar ao levantar e inalar ao abaixar.\nControle: Evitar movimentos bruscos, mantendo o movimento controlado."
        }
    ];

    useEffect(() => {
        if (modalDescanso) {
            setTimeout(setModalDescanso(false), 800);
        }
    }, [modalDescanso]);

    return (
        <>
            <ModalDescanso boolean={modalDescanso} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} justifyContent={"center"} alignItems={"center"} style={{ margin: "0", height: "100vh" }}>
                    <Grid xs={12} sm={10}>
                        <div className={Styles.container}>
                            <div className="box_img">
                                <Tabs size="md" aria-label="Basic tabs" defaultValue={0} sx={{ borderRadius: "20px" }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList>
                                            <Tab color="danger">Execução do exercício</Tab>
                                            <Tab color="danger">Mais detalhes</Tab>
                                            <Tab disabled><span style={{ textAlign: "center", color: "black" }}>{perderPeso[selectedIndex].repeticao}</span></Tab>
                                        </TabList>
                                    </Box>
                                    <TabPanel value={0}>
                                        <img src={perderPeso[selectedIndex].backgroundImage} alt="gif do treino a ser feito" />
                                    </TabPanel>
                                    <TabPanel value={1}>
                                        <h3>Benefícios</h3>
                                        {perderPeso[selectedIndex].beneficios.split('\n').map((line, index) => (
                                            <p style={{ color: "black", textAlign: "justify" }} key={index}>{line}</p>
                                        ))}

                                        <h3>Técnica</h3>
                                        {perderPeso[selectedIndex].tecnica.split('\n').map((line, index) => (
                                            <p style={{ color: "black", textAlign: "justify" }} key={index}>{line}</p>
                                        ))}
                                    </TabPanel>
                                </Tabs>

                                <Stack direction="row" spacing={2} className={Styles.box_button}>
                                    <Button variant="contained" disabled={selectedIndex === 0 ? true : false} onClick={(event) => handleListItemClick(event, selectedIndex - 1)}>
                                        Voltar exercicio
                                    </Button>
                                    <Button variant="contained" color="success" disabled={selectedIndex + 1 === perderPeso.length ? true : false} onClick={(event) => { handleListItemClick(event, selectedIndex + 1); setModalDescanso(true); }}>
                                        Proxímo exercicio
                                    </Button>
                                </Stack>
                            </div>

                            <Box sx={{ width: '100%', border: '1px solid #474747', display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <List component="nav" aria-label="Lista de treino">
                                    <p>Não desista !</p>
                                    {perderPeso.map((card, index) => (
                                        <div key={index}>
                                            <ListItemButton
                                                selected={selectedIndex === index}>
                                                <ListItemText primary={card.nome} />
                                                <FitnessCenterOutlined style={{ fill: (selectedIndex > index) ? "green" : (selectedIndex === index) ? "#ed6c02" : "white" }} />
                                            </ListItemButton>
                                            <Divider style={{ backgroundColor: "white" }} />
                                        </div>
                                    ))}
                                </List>
                                <Stack direction="row" spacing={2} className={Styles.box_button}>
                                    <Button variant="outlined" color='warning'>
                                        Sair
                                    </Button>
                                    <Button variant="outlined" color="success" disabled={selectedIndex + 1 === perderPeso.length ? false : true} onClick={() => { setOpen(true) }}>
                                        Concluir treino
                                    </Button>
                                </Stack>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Box>

            {/* modal fim  */}
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
                    }}>

                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="white"
                        fontWeight="lg"
                        mb={1}>Parabéns!. Continue com o excelente trabalho e nos vemos no próximo treino!</Typography>
                    <Typography id="modal-desc" textColor="white" textAlign={"justify"}>
                        Você será redirecionado em breve.
                    </Typography>
                    <img src="https://workover.com.br/build/assets/dancing-giraffe.2068ddb3.gif" alt="Girafa dançando" />
                </Sheet>
            </Modal>
        </>
    )
}

export default TelaVideo; 