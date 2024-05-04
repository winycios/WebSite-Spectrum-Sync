import React, { useState, useEffect } from "react";
import NavBar from "../../../../components/projeto/navBar/NavBar";
import FindUser from "../../../../components/projeto/GET/ValidarUsuario";
import ExerciciosRecomendados from "../../../../components/projeto/exerciciosRecomendados/ExerciciosRecomendados";
import PlanoTreino from "../../../../components/projeto/planoTreino/PlanoTreino";
import styles from "./Home.module.css";
import Api from '../../../../api';
import { getId } from '../../../../service/auth';
import { toast } from 'react-toastify';
import Slider from '../../../../components/landing-page/slider/Slider';

const Home = () => {
    const [user, setUser] = useState({
        nome: ''
    });
    const [saudacao, setSaudacao] = useState('');
    const [dataFormatada, setDataFormatada] = useState('');

    const determinarSaudacao = () => {
        const horaAtual = new Date().getHours();

        if (horaAtual >= 6 && horaAtual < 12) {
            setSaudacao('Bom dia');
        } else if (horaAtual >= 12 && horaAtual < 18) {
            setSaudacao('Boa tarde');
        } else {
            setSaudacao('Boa noite');
        }
    };

    const formatarData = () => {
        const options = { weekday: 'short', day: '2-digit', month: 'short' };
        const data = new Date().toLocaleDateString('pt-BR', options).replace(/\b\w/g, c => c.toUpperCase()).replace(/\./g, '');
        setDataFormatada(data);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`usuarios/${getId()}`);
                const userData = response.data;
                setUser(userData);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        determinarSaudacao();
        formatarData();
    }, []);

    return (
        <>
            <NavBar />

            <FindUser />
            <div className={styles.main}>

            <div className={styles.header}>
                <div className={styles.col1}>
                    <div className={styles.col2}>
                        <h1 className={styles.tittle}>Olá <b className={styles.bolder}>{user.nome}</b>,</h1>
                        <h2 className={styles.sub_tittle}>{saudacao}!</h2>
                    </div>
                    <h2 className={styles.sub_tittle_red}>{dataFormatada}</h2>
                </div>
            </div>

            <PlanoTreino />

            <ExerciciosRecomendados />
            
            </div>
        </>
    )
}

export default Home;