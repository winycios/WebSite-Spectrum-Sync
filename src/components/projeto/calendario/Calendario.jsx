import React, { useEffect, useState } from 'react';
import Styles from "./Calendario.module.css";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WeekendIcon from '@mui/icons-material/Weekend';
import CheckIcon from '@mui/icons-material/Check';
import Api from "../../../api";
import moment from 'moment';
import { getId } from '../../../service/auth';

const Calendario = () => {
    const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const [days, setDays] = useState([{
        dataTreino: "",
        status: "",
    }])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`treinos/usuario/${getId()}`);
                const userData = response.data;
                setDays(userData.map(item => ({
                    dataTreino: item.dataTreino,
                    status: item.status,
                })).reverse());
            } catch (error) { }
        };

        fetchData();
    }, []);


    const formatDate = (dateString) => {
        return moment(dateString).format('DD');
    };

    const formatDay = (dateString) => {
        return moment(dateString).day();
    };

    return (
        <>
            <h2>Rotina da semana</h2>
            <div className={Styles.box_data}>
                {days.map((result, index) => (
                    <div key={index} className={Styles.card} style={formatDate(result.dataTreino).toString() === moment().toDate().getDate().toString() ? { background: "var(--salmao)" } : { background: "var(--preto-tom-menor)" }}>
                        <span>{diasDaSemana[formatDay(result.dataTreino)]}</span>
                        <span>{formatDate(result.dataTreino)}</span>
                        {result.status === "Descanso" ? <WeekendIcon /> : (result.status === "Treino" ? <FitnessCenterIcon /> : <CheckIcon />)}
                    </div>
                ))
                }
            </div>
        </>
    );
}

export default Calendario;