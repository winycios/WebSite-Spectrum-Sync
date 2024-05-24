import React from "react";
import styles from './ModalDieta.module.css';

const ModalDieta = ({ card, onClose }) => {
    if (!card) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.title}>
                <h2>{card.titulo}</h2>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                </div>
                <div className={styles.modalContent}>
                    <p>{card.descricao}</p>
                    <img src={card.img} alt={card.titulo} className={styles.img} />
                </div>
            </div>
        </div>
    );
};

export default ModalDieta;