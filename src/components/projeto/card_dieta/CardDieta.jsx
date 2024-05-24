import React, { useState, useEffect } from "react";
import styles from './CardDieta.module.css';
import img1 from "../../../utils/cafe-da-manha.jpg";
import img2 from "../../../utils/almoco.jpg";
import img3 from "../../../utils/lanche.jpg";
import img4 from "../../../utils/jantar.jpg";
import img5 from "../../../utils/ceia.webp";
import ModalDieta from "../modal_dieta/ModalDieta";

const CardDieta = () => {
    const qtdCards = 5;
    const [cardsData, setCardsData] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            const data = [];
            for (let i = 0; i < qtdCards; i++) {
                const id = i + 1;
                let horario = '';
                let img = '';

                switch (id) {
                    case 1:
                        horario = "Café da Manhã - 9:00 AM";
                        img = img1;
                        break;
                    case 2:
                        horario = "Almoço - 12:00 PM";
                        img = img2;
                        break;
                    case 3:
                        horario = "Lanche da tarde - 15:00 PM";
                        img = img3;
                        break;
                    case 4:
                        horario = "Jantar - 19:00 PM";
                        img = img4;
                        break;
                    case 5:
                        horario = "Ceia - 22:00 PM";
                        img = img5;
                        break;
                    default:
                        break;
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

    const handleGreenButtonClick = (card) => {
        setSelectedCard(card);
    };

    const handleRedButtonClick = (id) => {
        alert(`Concluir refeição do card ${id}`);
    };

    const closeModal = () => {
        setSelectedCard(null);
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
                        <button onClick={() => handleGreenButtonClick(card)} className={styles.button_green}>
                            <div className={styles.text_button}>Detalhes</div>
                        </button>
                        <button onClick={() => handleRedButtonClick(card.id)} className={styles.button_red}>
                            <div className={styles.text_button}>Concluir Refeição</div>
                        </button>
                    </div>
                </div>
            ))}
            {selectedCard && <ModalDieta card={selectedCard} onClose={closeModal} />}
        </div>
    );
};

export default CardDieta;