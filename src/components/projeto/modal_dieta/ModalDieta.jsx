import React from "react";
import styles from './ModalDieta.module.css';
import img3 from "../../../utils/lanche.jpg";

const ModalDieta = ({ card, onClose }) => {
    if (!card) return null;

    const calcularPorcentagem = (valorAtual, valorMaximo) => {
        return (valorAtual / valorMaximo) * 100;
    };

    const determinarClasse = (valorAtual, valorMaximo) => {
        const porcentagem = calcularPorcentagem(valorAtual, valorMaximo);
        return porcentagem >= 80 ? styles.scaleActive : styles.scaleNone;
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.title}>
                    <h2 className={styles.font}>{card.titulo}</h2>
                    <span className={styles.closeButton} onClick={onClose}>&times;</span>
                </div>
                <div className={styles.sectionInfo}>
                    <img src={card.img ? card.img : img3} alt={card.titulo} className={styles.img} />
                    <div className={styles.info}>
                        <div className={styles.sectionInfo}>
                            <h2 className={styles.font_secondary}>Calorias</h2>
                            <h2 className={styles.font_secondary}>{card.calorias}kcal</h2>
                        </div>
                        <div className={styles.scale}>
                            <div className={determinarClasse(card.calorias, 50)} />
                            <div className={determinarClasse(card.calorias, 100)} />
                            <div className={determinarClasse(card.calorias, 200)} />
                            <div className={determinarClasse(card.calorias, 300)} />
                            <div className={determinarClasse(card.calorias, 400)} />
                            <div className={determinarClasse(card.calorias, 500)} />
                        </div>
                        <div className={styles.sectionInfo}>
                            <h2 className={styles.font_secondary}>Proteínas</h2>
                            <h2 className={styles.font_secondary}>{card.proteinas}g</h2>
                        </div>
                        <div className={styles.scale}>
                            <div className={determinarClasse(card.proteinas, 10)} />
                            <div className={determinarClasse(card.proteinas, 20)} />
                            <div className={determinarClasse(card.proteinas, 30)} />
                            <div className={determinarClasse(card.proteinas, 40)} />
                            <div className={determinarClasse(card.proteinas, 50)} />
                            <div className={determinarClasse(card.proteinas, 60)} />
                        </div>
                        <div className={styles.sectionInfo}>
                            <h2 className={styles.font_secondary}>Carboidratos</h2>
                            <h2 className={styles.font_secondary}>{card.carboidratos}g</h2>
                        </div>
                        <div className={styles.scale}>
                            <div className={determinarClasse(card.carboidratos, 10)} />
                            <div className={determinarClasse(card.carboidratos, 20)} />
                            <div className={determinarClasse(card.carboidratos, 30)} />
                            <div className={determinarClasse(card.carboidratos, 40)} />
                            <div className={determinarClasse(card.carboidratos, 50)} />
                            <div className={determinarClasse(card.carboidratos, 60)} />
                        </div>
                        <div className={styles.sectionInfo}>
                            <h2 className={styles.font_secondary}>Gorduras</h2>
                            <h2 className={styles.font_secondary}>{card.gorduras}g</h2>
                        </div>
                        <div className={styles.scale}>
                            <div className={determinarClasse(card.gorduras, 10)} />
                            <div className={determinarClasse(card.gorduras, 20)} />
                            <div className={determinarClasse(card.gorduras, 30)} />
                            <div className={determinarClasse(card.gorduras, 40)} />
                            <div className={determinarClasse(card.gorduras, 50)} />
                            <div className={determinarClasse(card.gorduras, 60)} />
                        </div>
                        <div className={styles.sectionInfo}>
                            <h2 className={styles.font_secondary}>Açúcares</h2>
                            <h2 className={styles.font_secondary}>{card.acucares}g</h2>
                        </div>
                        <div className={styles.scale}>
                            <div className={determinarClasse(card.acucares, 5)} />
                            <div className={determinarClasse(card.acucares, 10)} />
                            <div className={determinarClasse(card.acucares, 15)} />
                            <div className={determinarClasse(card.acucares, 20)} />
                            <div className={determinarClasse(card.acucares, 25)} />
                            <div className={determinarClasse(card.acucares, 30)} />
                        </div>
                    </div>
                </div>
                <div className={styles.modalContent}>
                    <h1 className={styles.font}>Sobre a Refeição:</h1>
                    <p className={styles.font_secondary}>{card.descricao}</p>
                    <h1 className={styles.font}>Tempo de Preparo:</h1>
                    <p className={styles.font_secondary}>{card.tempoPreparo} minutos.</p>
                    <h1 className={styles.font}>Ingredientes:</h1>
                    <p className={styles.font_secondary}>{card.ingredientes.join(", ")}.</p>
                </div>
            </div>
        </div>
    );
};

export default ModalDieta;