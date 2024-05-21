import React, { useEffect, useState } from "react";
import styles from "./PlanoTreino.module.css";
import { useNavigate } from "react-router-dom";
import Api from "../../../api";
import { getId } from "../../../service/auth";

const imgTreino = "https://fittech500.blob.core.windows.net/imagens-spectrum/imgTreino.jpeg"

const PlanoTreino = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const [validarTreino, setTreino] = useState({
        dataTreino: "",
        status: ""
    })

    const exibicao = () => {
        if (validarTreino.status === "Treino") {
            return (
                <>
                    <div className={styles.sub_caption}>
                        <div className={styles.vector} />
                        <div className={styles.sub_tittle}>Status: <span style={{ color: "#cb7116", cursor: "pointer" }} onClick={() => handleNavigate(`../homeProjeto/treino/Diario`)}>Dia de treino</span></div>
                    </div>
                </>
            );
        } else if (validarTreino.status === "Descanso") {
            return (
                <span style={{ color: "blue" }}>Dia de descanso</span>

            );
        } else if (validarTreino.status === "Feito") {
            return (
                <span style={{ color: "green" }}>Concluído</span>
            )
        }
        else {
            return (
                <span>Treino não criado</span>
            )
        }
    };

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

    return (
        <div className={styles.main}>
            <div className={styles.container_meu_treino}>
                <h2 className={styles.sub_tittle}>Plano de Treino para Hoje:</h2>

                <div className={styles.card} style={{ backgroundImage: `url(${imgTreino})`, opacity: "0.9", marginBottom: '1rem' }}>
                    <div className={styles.cardOverlay}></div>
                    <div className={styles.caption}>
                        <div className={styles.sub_tittle}>TREINO DIÁRIO</div>
                        <div className={styles.sub_caption}>
                            <div className={styles.vector} />
                            <div className={styles.sub_tittle}>uma hora</div>
                        </div>
                        {exibicao()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlanoTreino;