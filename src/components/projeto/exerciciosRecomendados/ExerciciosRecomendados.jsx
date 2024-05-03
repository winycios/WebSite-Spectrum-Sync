import React from "react";
import styles from "./ExerciciosRecomendados.module.css";
import Carousel from 'react-bootstrap/Carousel';
import Img from '../../../utils/assets/Card.png';

function ExerciciosRecomendados() {
  return (
    <div className={styles.main}>
    <Carousel className={styles.carousel_box}>
      <Carousel.Item className={styles.carousel_container}>
        <img src={Img} alt="" className={styles.carousel_img} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.carousel_container}>
        <img src={Img} alt="" className={styles.carousel_img} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.carousel_container}>
        <img src={Img} alt="" className={styles.carousel_img} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default ExerciciosRecomendados;