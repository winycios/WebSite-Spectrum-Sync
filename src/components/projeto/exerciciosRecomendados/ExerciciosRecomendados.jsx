import React from "react";
import styles from "./ExerciciosRecomendados.module.css";
import Carousel from 'react-bootstrap/Carousel';

const Img = 'https://fittech500.blob.core.windows.net/imagens-spectrum/Ex.jpg';
const Img1 = 'https://fittech500.blob.core.windows.net/imagens-spectrum/Ex1.jpg';
const Img2 = 'https://fittech500.blob.core.windows.net/imagens-spectrum/Ex2.jpg';

function ExerciciosRecomendados() {
  return (
    <div className={styles.main}>
      <Carousel className={styles.carousel_box}>
        <Carousel.Item className={styles.carousel_container}>
          <img src={Img} alt="" className={styles.carousel_img} />
          <Carousel.Caption>
            <h3 className={styles.sub_tittle}>Como Realizar Flexões Corretamente</h3>
            <p className={styles.sub_tittle_red}>Exercícios para Iniciantes</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles.carousel_container}>
          <img src={Img1} alt="" className={styles.carousel_img} />
          <Carousel.Caption>
            <h3 className={styles.sub_tittle}>Como Realizar Agachamento Sumô Corretamente</h3>
            <p className={styles.sub_tittle_red}>Exercícios para Iniciantes</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles.carousel_container}>
          <img src={Img2} alt="" className={styles.carousel_img} />
          <Carousel.Caption>
            <h3 className={styles.sub_tittle}>Como Realizar Agachamento Bulgaro Corretamente</h3>
            <p className={styles.sub_tittle_red}>Exercícios para Iniciantes</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ExerciciosRecomendados;