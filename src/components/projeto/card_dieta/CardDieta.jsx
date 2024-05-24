import React, { useState, useEffect } from "react";
import styles from './CardDieta.module.css';
import img1 from "../../../utils/cafe-da-manha.jpg";
import img2 from "../../../utils/almoco.jpg";
import img3 from "../../../utils/lanche.jpg";
import img4 from "../../../utils/jantar.jpg";
import img5 from "../../../utils/ceia.webp";
const CardDieta = () => {
    const qtdCards = 5;
    const [cardsData, setCardsData] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            const data = [];
            for (let i = 0; i < qtdCards; i++) {
                const id = i + 1;
                let horario = '';
                let img = '';
                if (id === 1) {
                    horario = "Café da Manhã - 9:00 AM";
                    img = img1;
                } else if (id === 2) {
                    horario = "Almoço - 12:00 PM";
                    img = img2;
                } else if (id === 3) {
                    horario = "Lanche da tarde - 15:00 PM";
                    img = img3;
                } else if (id === 4) {
                    horario = "Jantar - 19:00 PM";
                    img = img4;
                } else if (id === 5) {
                    horario = "Ceia - 22:00 PM";
                    img = img5;
                }
                data.push({
                    id,
                    titulo: `Título ${id}`,
                    descricao: `Descrição ${id}`,
                    horario,
                    img
                });
            }
            setCardsData(data);
        };
        fetchData();
    }, [qtdCards]);
    const handleGreenButtonClick = (id) => {
        alert(`Detalhes do card ${id}`);
    };
    const handleRedButtonClick = (id) => {
        alert(`Concluir refeição do card ${id}`);
    };
    return (
        <div className={styles.cards_listener}>
            {cardsData.map((card) => (
                <div key={card.id} className={styles.card_container}>
                    <div className={styles.horario}>{card.horario}</div>
                    <div id={`card-${card.id}`} className={styles.card_box}>
                        <div className={styles.title_box}>
                            <div className={styles.title}>{card.titulo}</div>
                        </div>
                        <div className={styles.img_box}>
                            <img className={styles.img} alt="" src={card.img} />
                        </div>
                        <div className={styles.box_desc}>
                            <div className={styles.sub_text}>Sobre a Refeição:</div>
                            <div className={styles.sub_text}>{card.descricao}</div>
                        </div>
                        <button onClick={() => handleGreenButtonClick(card.id)} className={styles.button_green}>
                            <div className={styles.text_button}>Detalhes</div>
                        </button>
                        <button onClick={() => handleRedButtonClick(card.id)} className={styles.button_red}>
                            <div className={styles.text_button}>Concluir Refeição</div>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default CardDieta;