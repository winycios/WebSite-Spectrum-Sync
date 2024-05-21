import React from "react";
import styles from "./ExerciciosRecomendados.module.css";
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from "react-router-dom";

const Img = 'https://fittech500.blob.core.windows.net/imagens-spectrum/Ex.jpg';
const Img1 = 'https://fittech500.blob.core.windows.net/imagens-spectrum/Ex1.jpg';
const Img2 = 'https://fittech500.blob.core.windows.net/imagens-spectrum/Ex2.jpg';

function ExerciciosRecomendados() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
      navigate(path);
  };

  return (
    <div className={styles.main}>
      <Carousel className={styles.carousel_box}>
        <Carousel.Item className={styles.carousel_container}>
          <img src={Img} alt="" className={styles.carousel_img} />
          <Carousel.Caption>
            <h3 className={styles.sub_tittle}>Cardio (Alta Intensidade)</h3>
            <p className={styles.sub_tittle_red} onClick={() => handleNavigate(`../homeProjeto/treino`)}>Exercícios para Iniciantes</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles.carousel_container}>
          <img src={Img1} alt="" className={styles.carousel_img} />
          <Carousel.Caption>
            <h3 className={styles.sub_tittle}>Funcional</h3>
            <p className={styles.sub_tittle_red} onClick={() => handleNavigate(`../homeProjeto/treino`)}>Exercícios para Iniciantes</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles.carousel_container}>
          <img src={Img2} alt="" className={styles.carousel_img} />
          <Carousel.Caption>
            <h3 className={styles.sub_tittle}>Alongamento</h3>
            <p className={styles.sub_tittle_red} onClick={() => handleNavigate(`../homeProjeto/treino`)}>Exercícios para Iniciantes</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ExerciciosRecomendados;