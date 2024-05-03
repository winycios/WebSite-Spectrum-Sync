import React from "react";
import styles from "./PlanoTreino.module.css";

const PlanoTreino = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container_meu_treino}>

                <h2 className={styles.sub_tittle}>Plano de Treino para Hoje:</h2>

                <div className={styles.card}>
                    <div className={styles.caption}>
                        <div className={styles.sub_tittle}>Cardio (Alta Intensidade)</div>
                        <div className={styles.sub_caption}>
                            <div className={styles.vector} />
                            <div className={styles.sub_tittle}>30 MINUTOS</div>
                        </div>
                    </div>
                </div>


                <div className={styles.container_tittle}>
                <h2 className={styles.sub_tittle_red}>Ver Mais</h2>
                </div>

            </div>
        </div>
    );
}

export default PlanoTreino;