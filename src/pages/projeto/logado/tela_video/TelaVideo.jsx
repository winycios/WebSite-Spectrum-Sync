import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { FitnessCenterOutlined } from '@mui/icons-material';


const TelaVideo = () => {
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

    const [open, setOpen] = React.useState(false);


    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const perderPeso = [
        { nome: "Agachamento (Squat)", repeticao: "4x de 20 repetições", backgroundImage: "https://media1.tenor.com/m/Re3T3B66V9UAAAAd/barbellsquats-gymexercisesmen.gif" },
        { nome: "Rosca Alternada", repeticao: "4x de 20 repetições", backgroundImage: "https://www.mundoboaforma.com.br/wp-content/uploads/2022/09/rosca-biceps-direta-com-halteres.gif" },
        { nome: "Tríceps na Máquina", repeticao: "4x de 20 repetições", backgroundImage: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/07/triceps-sentado-no-aparelho.gif" },
        { nome: "Flexão de Braço", repeticao: "4x de 20 repetições", backgroundImage: "https://media1.tenor.com/m/Re3T3B66V9UAAAAd/barbellsquats-gymexercisesmen.gif" },
        { nome: "Puxada na Frente", repeticao: "4x de 20 repetições", backgroundImage: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-puxada-aberta-com-barra-no-pulley.gif" },
        { nome: "Elevação Lateral", repeticao: "4x de 20 repetições", backgroundImage: "https://www.hipertrofia.org/blog/wp-content/uploads/2023/11/dumbbell-lateral-raise.gif" }
    ];
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} justifyContent={"center"} alignItems={"center"} style={{ margin: "0", height: "100vh" }}>
                    <Grid xs={12} sm={10}>
                        <div className={Styles.container}>
                            <div className="box_img">
                                <img src={perderPeso[selectedIndex].backgroundImage} alt="gif do treino a ser feito" />
                                <div className={Styles.box_text}>
                                <span>{perderPeso[selectedIndex].repeticao}</span>
                                </div>
                                <Stack direction="row" spacing={2} className={Styles.box_button}>
                                    <Button variant="contained" disabled={selectedIndex === 0 ? true : false} onClick={(event) => handleListItemClick(event, selectedIndex - 1)}>
                                        Voltar exercicio
                                    </Button>
                                    <Button variant="contained" color="success" disabled={selectedIndex + 1 === perderPeso.length ? true : false} onClick={(event) => handleListItemClick(event, selectedIndex + 1)}>
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
                        mb={1}>Parabens. Continue assim, te vemos no proximo treino !</Typography>
                    <Typography id="modal-desc" textColor="white" textAlign={"justify"}>
                        Iremos te redirecionar em breve.
                    </Typography>
                    <img src="https://workover.com.br/build/assets/dancing-giraffe.2068ddb3.gif" alt="Girafa dançando" />
                </Sheet>
            </Modal>
        </>
    )
}

export default TelaVideo;