import React, { useState, useEffect } from "react";
import styles from './CardDieta.module.css';
import img1 from "../../../utils/cafe-da-manha.jpg";
import img2 from "../../../utils/almoco.jpg";
import img3 from "../../../utils/lanche.jpg";
import img4 from "../../../utils/jantar.jpg";
import img5 from "../../../utils/ceia.webp";
import ModalDieta from "../modal_dieta/ModalDieta";
import Api from "../../../api"
import { getId } from "../../../service/auth"

const CardDieta = () => {
    const [cardsData, setCardsData] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showSelectModal, setShowSelectModal] = useState(true);
    const [qtdCards, setQtdCards] = useState(3);

    useEffect(() => {

        // try {
        //     const response = await Api.get(`pesos/historico-grafico/${getId()}`);
        //     console.log(response)
        // } catch (error) {
        //     console.error(error);
        // }

        if (!showSelectModal) {
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
        }
    }, [qtdCards, showSelectModal]);

    const handleGreenButtonClick = (card) => {
        setSelectedCard(card);
    };

    const handleRedButtonClick = (id) => {
        const updatedCards = cardsData.filter(card => card.id !== id);
        setCardsData(updatedCards);
    };

    const closeModal = () => {
        setSelectedCard(null);
    };

    const handleSelectChange = (e) => {
        setQtdCards(Number(e.target.value));
    };

    const handleStartClick = () => {
        setShowSelectModal(false);
    };

    return (
        <div className={styles.cards_listener}>
            {showSelectModal && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <h2>Selecione o número de refeições que deseja fazer hoje</h2>
                        <select value={qtdCards} onChange={handleSelectChange}>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <button onClick={handleStartClick}>Iniciar</button>
                    </div>
                </div>
            )}

            {cardsData.length === 0 && !showSelectModal && (
                <div className={styles.parabens}>Parabéns por ter completado suas refeições! Volte amanhã 😊</div>
            )}
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