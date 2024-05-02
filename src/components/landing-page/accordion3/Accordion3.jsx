import React, { useState } from 'react';
import styles from './Accordion3.module.css';
import Arrow from '../../../utils/assets/arrow-right.svg';

function GavetaItem({ title, institution, startDate, endDate, position }) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={`${styles.gaveta_item} ${isActive ? styles.active : ''}`}>
            <button className={`${styles.gaveta_header} ${position}`} onClick={handleClick}>
                <span>{title}</span>
                <img className={styles.icon} src={Arrow} alt="" />
            </button>
            <div className={`${styles.gaveta_body} ${isActive ? styles.active : ''}`}>
                <p>{institution} - {startDate} - {endDate}</p>
            </div>
        </div>
    );
}

function Accordion3() {
    return (
        <div id="gaveta">
            <GavetaItem
                title="Example 1"
                institution="Nome da Instituição"
                startDate="Data inicio"
                endDate="Data fim"
                position="start"
            />
            <GavetaItem
                title="Example 2"
                institution="Nome da Instituição"
                startDate="Data inicio"
                endDate="Data fim"
            />
            <GavetaItem
                title="Example 3"
                institution="Nome da Instituição"
                startDate="Data inicio"
                endDate="Data fim"
                position="end"
            />
        </div>
    );
}

export default Accordion3;