import React from "react";
import styles from "./NotFound.module.css";
import imgNotFound from "../../utils/assets/404.svg";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { ArrowLeft } from 'react-bootstrap-icons';



const NotFound = () => {
    return (
        <>
            <div className={styles["content"]}>
                <img src={imgNotFound} alt="Erro 404" />
                <div className={styles.box}>
                    <h1>NOT FOUND</h1>
                    <h3>Não conseguimos encontrar o que você está procurando</h3>
                    <div>
                        <Link to="/"><Button variant="danger"><ArrowLeft color="white" size={25} className="align-center" style={{ marginLeft: "6px" }} /></Button>{' '}</Link>
                        <Link to="/"><Button variant="outline-danger">VOLTAR PARA A FIT TECH</Button>{' '}</Link>
                    </div>
                </div>
            </div>
        </>
    );
};
export default NotFound;
