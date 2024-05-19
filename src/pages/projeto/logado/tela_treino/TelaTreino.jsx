import React, { useEffect, useState } from 'react';
import NavBar from "../../../../components/projeto/navBar/NavBar";
import Styles from "./TelaTreino.module.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Api from '../../../../api';
import { useNavigate } from "react-router-dom";


import Calendario from "../../../../components/projeto/calendario/Calendario";
import TreinoExtra from "../../../../components/projeto/treino_extra/TreinoExtra";
import FindTreino from "../../../../components/projeto/GET/ValidarTreino";
import { getId } from '../../../../service/auth';

const imgTreino = "https://fittech500.blob.core.windows.net/imagens-spectrum/imgTreino.jpeg"
const TelaTreino = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const [validarTreino, setTreino] = useState({
        dataTreino: "",
        status: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`treinos/validar/${getId()}`);
                const userData = response.data;

                setTreino(userData);

            } catch (error) { }
        };

        fetchData();
    }, []);

    const exibicao = () => {
        if (validarTreino.status === "Treino") {
            return (
                <div className={Styles.box_text}>
                    <h3>TREINO DIÁRIO</h3>
                    <h5>Fortalecimento  Muscular</h5>
                    <h6>Comece seu treino agora e fortaleça seus músculos!</h6>
                    <Button variant="outlined" color="error" style={{ padding: "10px" }} onClick={() => handleNavigate(`../homeProjeto/treino/diario`)}>Começar treino</Button>
                </div>
            );
        } else if (validarTreino.status === "Descanso") {
            return (
                <div className={Styles.box_text}>
                    <h3>Dia de descanso</h3>
                    <h5>Deixe seu corpo relaxar um pouco</h5>
                </div>
            );
        } else {
            <div className={Styles.box_text}>
                <h3>TREINO DIÁRIO</h3>
                <h5>Fortalecimento  Muscular</h5>
                <h6>Você já fez seu treino hoje, descanse e espere até amanhã</h6>
            </div>
        }
    };

    return (
        <>
            <FindTreino />
            <NavBar />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} justifyContent={"center"} style={{ margin: "0" }}>
                    <Grid xs={12} sm={10}>
                        <div className={Styles.container}>
                            <Calendario />
                            <div className={Styles.subtitles}>
                                <span>Seu plano de teino:</span>
                            </div>
                            <div className={Styles.box}>
                                <img src={imgTreino} alt="mulher treinando" className={Styles.image} />
                                {exibicao()}
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