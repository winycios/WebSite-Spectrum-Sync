import React from "react";
import NavBar from "../../../../components/projeto/navBar/NavBar";
import Styles from "./TelaTreino.module.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';


import Calendario from "../../../../components/projeto/calendario/Calendario";
import TreinoExtra from "../../../../components/projeto/treino_extra/TreinoExtra";

const imgTreino = "https://fittech500.blob.core.windows.net/imagens-spectrum/imgTreino.jpeg"
const TelaTreino = () => {

    return (
        <>
            <NavBar />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} justifyContent={"center"} style={{ margin: "0" }}>
                    <Grid xs={12} sm={10}>
                        <div className={Styles.container}>
                            <Calendario />
                            <div className={Styles.subtitles}>
                                <span>Seu plano de teino:</span>
                                <span style={{ color: "var(--rosa)" }}>Editar Meu Treino</span>
                            </div>
                            <div className={Styles.box}>
                                <img src={imgTreino} alt="mulher treinando" className={Styles.image} />
                                <div className={Styles.box_text}>
                                    <h3>TREINO DIÁRIO</h3>
                                    <h5>Fortalecimento  Muscular</h5>
                                    <h6>Comece seu treino agora e fortaleça seus músculos!</h6>
                                    <Button variant="outlined" color="error" style={{ padding: "10px" }}>Começar treino</Button>
                                </div>
                            </div>
                            <div className={Styles.subtitles}>
                                <span>Treinos extras:</span>
                            </div>
                            <TreinoExtra />
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default TelaTreino;