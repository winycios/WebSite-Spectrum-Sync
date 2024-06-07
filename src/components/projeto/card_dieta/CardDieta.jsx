import React, { useState, useEffect, useMemo } from "react";
import styles from "./CardDieta.module.css";
import img1 from "../../../utils/cafe-da-manha.jpg";
import img2 from "../../../utils/almoco.jpg";
import img3 from "../../../utils/lanche.jpg";
import img4 from "../../../utils/jantar.jpg";
import img5 from "../../../utils/ceia.webp";
import ModalDieta from "../modal_dieta/ModalDieta";
import api from "../../../api";
import CircularProgress from "@mui/material/CircularProgress";
import { getId } from "../../../service/auth";
import { toast } from 'react-toastify';

const CardDieta = ({ onNutrientTotalsUpdate, onCurrentNutrientUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showSelectModal, setShowSelectModal] = useState(true);
  const [qtdCards, setQtdCards] = useState(3);
  const [error, setError] = useState(null);

  const [user, setUser] = useState({
    peso: '',
    pesoMeta: '',
    usuario: {
        nome: '',
        dataNascimento: '',
        genero: '',
        altura: '',
        nivelCondicao: '',
        meta: '',
        objetivo: '',
        pontuacao: ''
    }
  });

  // dados do usuario
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.get(`/pesos/ultima-insercao/${getId()}`);
            const userData = response.data;
            setUser(userData);
        } catch (error) {
            toast.error(error.message);
        }

    };

    fetchData();
  }, []);

  const meta = user.usuario.meta;

  const predefinedCards = useMemo(() => [
    { id: 1, horario: "Café da Manhã - 9:00 AM", img: img1 },
    { id: 2, horario: "Almoço - 12:00 PM", img: img2 },
    { id: 3, horario: "Lanche da tarde - 15:00 PM", img: img3 },
    { id: 4, horario: "Jantar - 19:00 PM", img: img4 },
    { id: 5, horario: "Ceia - 22:00 PM", img: img5 },
  ], []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const id = getId();
        if (!id) {
          throw new Error("ID não encontrado");
        }

        const response = await api.get(`/openai/gpt3/${id}`, {
          params: { objetivo: meta, qtdSelecionada: qtdCards },
        });

        const apiData = response.data;

        const updatedCardsData = predefinedCards
          .slice(0, qtdCards)
          .map((card, index) => ({
            ...card,
            titulo: apiData[index]?.nome || `Título ${index + 1}`,
            descricao: apiData[index]?.modoPreparo || `Descrição ${index + 1}`,
            carboidratos: Number(apiData[index]?.carboidratos) || 0,
            calorias: Number(apiData[index]?.calorias) || 0,
            gorduras: Number(apiData[index]?.gorduras) || 0,
            proteinas: Number(apiData[index]?.proteina) || 0,
            acucares: apiData[index]?.acucar,
            tempoPreparo: apiData[index]?.tempoPreparo,
            ingredientes: apiData[index]?.ingredientes,
          }));

        setCardsData(updatedCardsData);
        sessionStorage.setItem("cardsData", JSON.stringify(updatedCardsData));

        const totalNutrients = updatedCardsData.reduce(
          (totals, card) => {
            return {
              carboidratos: totals.carboidratos + card.carboidratos,
              calorias: totals.calorias + card.calorias,
              gorduras: totals.gorduras + card.gorduras,
              proteinas: totals.proteinas + card.proteinas,
            };
          },
          { carboidratos: 0, calorias: 0, gorduras: 0, proteinas: 0 }
        );

        sessionStorage.setItem("totalNutrients", JSON.stringify(totalNutrients));
        onNutrientTotalsUpdate(totalNutrients);
      } catch (error) {
        console.error("Erro na requisição:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const storedCardsData = sessionStorage.getItem("cardsData");
    const storedTotalNutrients = sessionStorage.getItem("totalNutrients");

    if (storedCardsData && storedTotalNutrients) {
      const parsedCardsData = JSON.parse(storedCardsData);
      const parsedTotalNutrients = JSON.parse(storedTotalNutrients);
      setCardsData(parsedCardsData);
      setShowSelectModal(false);
      onNutrientTotalsUpdate(parsedTotalNutrients);
    } else {
      if (!showSelectModal) {
        fetchData();
      }
    }
  }, [qtdCards, showSelectModal, onNutrientTotalsUpdate, meta, predefinedCards]);

  const handleGreenButtonClick = (card) => {
    setSelectedCard(card);
  };

  const handleRedButtonClick = (id) => {
    const updatedCards = cardsData.filter((card) => card.id !== id);
    const completedCard = cardsData.find((card) => card.id === id);

    if (completedCard) {
      onCurrentNutrientUpdate((prevTotals) => {
        const newTotals = {
          carboidratos: prevTotals.carboidratos + completedCard.carboidratos,
          calorias: prevTotals.calorias + completedCard.calorias,
          gorduras: prevTotals.gorduras + completedCard.gorduras,
          proteinas: prevTotals.proteinas + completedCard.proteinas,
        };
        sessionStorage.setItem("currentNutrientTotals", JSON.stringify(newTotals));
        return newTotals;
      });
    }

    setCardsData(updatedCards);
    sessionStorage.setItem("cardsData", JSON.stringify(updatedCards));
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
      {showSelectModal && !sessionStorage.getItem("cardsData") && (
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

      {loading && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h2>Carregando suas refeições, aguarde...</h2>
            <div className={styles.loading}>
              <CircularProgress color="primary" />
            </div>
          </div>
        </div>
      )}

      {error && <p>Erro: {error}</p>}

      {cardsData.length === 0 && !showSelectModal && (
        <div className={styles.parabens}>
          Sem mais refeições por enquanto! Volte amanhã 😊
        </div>
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
            <button
              onClick={() => handleGreenButtonClick(card)}
              className={styles.button_green}
            >
              <div className={styles.text_button}>Detalhes</div>
            </button>
            <button
              onClick={() => handleRedButtonClick(card.id)}
              className={styles.button_red}
            >
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