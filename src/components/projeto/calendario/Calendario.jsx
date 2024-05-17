import React from "react";
import Styles from "./Calendario.module.css";

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WeekendIcon from '@mui/icons-material/Weekend';
import CheckIcon from '@mui/icons-material/Check';

const Calendario = () => {
    const diaAtual = new Date().getDate();
    const datas = [
        { dia: "Dom", data: 15, treino: "feito" },
        { dia: "Seg", data: 16, treino: "descanso" },
        { dia: "Ter", data: 17, treino: "treino" },
        { dia: "Qua", data: 18, treino: "descanso" },
        { dia: "Qui", data: 19, treino: "descanso" },
        { dia: "Sex", data: 20, treino: "treino" },
        { dia: "Sáb", data: 21, treino: "descanso" }
    ];

    return (
        <>
            <h2>Rotina da semana</h2>
            <div className={Styles.box_data}>
                {datas.map((result, index) => (
                    <div key={index} className={Styles.card} style={result.data === diaAtual ? { background: "var(--salmao)" } : { background: "var(--preto-tom-menor)" }}>
                        <span>{result.dia}</span>
                        <span>{result.data}</span>
                        {result.treino === "descanso" ? <WeekendIcon /> : (result.treino === "treino" ? <FitnessCenterIcon /> : <CheckIcon />)}
                    </div>
                ))
                }
            </div>
        </>
    );
}

export default Calendario;