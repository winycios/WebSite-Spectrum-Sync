import React from "react";
import styles from './ModalDieta.module.css';

const ModalDieta = ({ card, onClose }) => {
    if (!card) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.title}>
                    <h2 className={styles.font}>{card.titulo}</h2>
                    <span className={styles.closeButton} onClick={onClose}>&times;</span>
                </div>
                <div className={styles.sectionInfo}>
                    <img src={card.img} alt={card.titulo} className={styles.img} />
                    <div className={styles.info}>
                        <div className={styles.sectionInfo}>
                        <h2 className={styles.font_secondary}>Calorias</h2>
                        <h2 className={styles.font_secondary}>32{}g</h2>
                        </div>
                        <div className={styles.scale}>
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleNone} />
                                <div className={styles.scaleNone} />
                                <div className={styles.scaleNone} />
                        </div>
                        <div className={styles.sectionInfo}>
                        <h2 className={styles.font_secondary}>Proteínas</h2>
                        <h2 className={styles.font_secondary}>32{}g</h2>
                        </div>
                        <div className={styles.scale}>
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleNone} />
                                <div className={styles.scaleNone} />
                            </div>
                        <div className={styles.sectionInfo}>
                        <h2 className={styles.font_secondary}>Carboitrados</h2>
                        <h2 className={styles.font_secondary}>32{}g</h2>
                        </div>
                        <div className={styles.scale}>
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleNone} />
                            </div>
                        <div className={styles.sectionInfo}>
                        <h2 className={styles.font_secondary}>Gorduras</h2>
                        <h2 className={styles.font_secondary}>32{}g</h2>
                        </div>
                        <div className={styles.scale}>
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleNone} />
                                <div className={styles.scaleNone} />
                                <div className={styles.scaleNone} />
                                <div className={styles.scaleNone} />
                                <div className={styles.scaleNone} />
                            </div>
                        <div className={styles.sectionInfo}>
                        <h2 className={styles.font_secondary}>Açucares</h2>
                        <h2 className={styles.font_secondary}>32{}g</h2>
                        </div>
                        <div className={styles.scale}>
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleActive} />
                                <div className={styles.scaleNone} />
                                <div className={styles.scaleNone} />
                                <div className={styles.scaleNone} />
                            </div>
                    </div>
                </div>
                <div className={styles.modalContent}>
                    <h1 className={styles.font}>Sobre a Refeição:</h1>
                    <p>{card.descricao}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalDieta;