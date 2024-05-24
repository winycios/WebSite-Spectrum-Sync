import React, { useState, useEffect } from "react";
import styles from "./TelaDieta.module.css";
import NavBar from "../../../../components/projeto/navBar/NavBar";
import FindUser from "../../../../components/projeto/GET/ValidarUsuario";
import Api from '../../../../api';
import { getId } from '../../../../service/auth';
import { toast } from 'react-toastify';
import CardDieta from '../../../../components/projeto/card_dieta/CardDieta';
const TelaDieta = () => {
    const [user, setUser] = useState({
        nome: ''
    });
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
    return (
        <>
            <NavBar />
            <FindUser />
            <div className={styles.main}>
                <div className={styles.sub_main}>
                    <h1 className={styles.h1}>Suas Refeições de Hoje:</h1>
                    <CardDieta />
                    <div className={styles.main_dashboards}>
                    <div className={styles.box_KPI}>
                        <div className={styles.title_box_KPI}>
                            <h1 className={styles.title_KPI}>Sua Atividade Hoje:</h1>
                        </div>
                        <div className={styles.info_box_KPI}>
                            <div className={styles.info_KPI}>
                                <h2 className={styles.title_info}>Calorias</h2>
                                <h2 className={styles.title_info}><span className={styles.sub_title_info}>35{}</span>/135{}kcal</h2>
                                <h2 className={styles.title_info}>Proteínas</h2>
                                <h2 className={styles.title_info}><div className={styles.sub_title_info}>{}</div>/{}</h2>
                                <h2 className={styles.title_info}>Carboidratos</h2>
                                <h2 className={styles.title_info}><div className={styles.sub_title_info}>{}</div>/{}</h2>
                                <h2 className={styles.title_info}>Gorduras</h2>
                                <h2 className={styles.title_info}><div className={styles.sub_title_info}>{}</div>/{}</h2>
                            </div>
                            d
                        </div>
                    </div>
                    <div className={styles.box_KPI}>
                        <div className={styles.title_box_KPI}>
                            <h1 className={styles.title_KPI}>Atualmente você pesa: <span>62kg{}</span></h1>
                        </div>
                        <div className={styles.info_box_Dashboard}>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TelaDieta;