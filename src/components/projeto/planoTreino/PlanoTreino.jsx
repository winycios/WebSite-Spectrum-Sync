import React, { useState } from "react";
import styles from "./PlanoTreino.module.css";
import img1 from "../../../utils/assets/Card.png";
import img2 from "../../../utils/assets/Ex.jpg";
import img3 from "../../../utils/assets/Ex1.jpg";
import img4 from "../../../utils/assets/Ex2.jpg";

const PlanoTreino = () => {
    const cards = [
        { description: "Cardio (Alta Intensidade)", duration: "30 MINUTOS", backgroundImage: img1 },
        { description: "Musculação (Pernas)", duration: "45 MINUTOS", backgroundImage: img2 },
        { description: "Yoga (Alongamento)", duration: "20 MINUTOS", backgroundImage: img3 },
        { description: "Pilates (Core)", duration: "40 MINUTOS", backgroundImage: img4 }
    ];

    const [showAllCards, setShowAllCards] = useState(false);

    const handleToggleCards = () => {
        setShowAllCards(!showAllCards);
    };

    return (
        <div className={styles.main}>
            <div className={styles.container_meu_treino}>
                <h2 className={styles.sub_tittle}>Plano de Treino para Hoje:</h2>

                {cards.map((card, index) => (
                    <div className={styles.card} key={index} style={{ display: showAllCards || index === 0 ? 'inherit' : 'none', backgroundImage: `url(${card.backgroundImage})`,opacity: "0.9", marginBottom: '1rem' }}>
                        <div className={styles.cardOverlay}></div>
                        <div className={styles.caption}>
                            <div className={styles.sub_tittle}>{card.description}</div>
                            <div className={styles.sub_caption}>
                                <div className={styles.vector} />
                                <div className={styles.sub_tittle}>{card.duration}</div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className={styles.container_tittle}>
                    <h2 className={styles.sub_tittle_red} onClick={handleToggleCards}>
                        {showAllCards ? "Mostrar Menos" : "Ver Mais"}
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default PlanoTreino;