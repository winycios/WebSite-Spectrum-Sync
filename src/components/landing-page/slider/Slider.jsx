import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './Slider.module.css';
const img1 = 'https://fittech500.blob.core.windows.net/imagens-spectrum/image1.png';
const img2 = 'https://fittech500.blob.core.windows.net/imagens-spectrum/image2.png';
const img3 = 'https://fittech500.blob.core.windows.net/imagens-spectrum/image3.png';

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className={styles.carousel_box}>
      <Carousel.Item>
        <img src={img1} alt="" className={styles.carousel_img} />
        <Carousel.Caption>
          <h3 className={styles.carousel_caption_h3}>YOUR TRAINING PARTNER!</h3>
          <p className={styles.carousel_caption_p}>
          Treine com a FitTech e tenha um parceiro de treino dedicado ao seu sucesso!
            </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={img2} alt="" className={styles.carousel_img} />
        <Carousel.Caption>
          <h3 className={styles.carousel_caption_h3}>DESENVOLVA SUA FORÇA</h3>
          <p className={styles.carousel_caption_p}>
          Descubra o poder dentro de você com os programas de treino personalizados da FitTech!
            </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={img3} alt="" className={styles.carousel_img} />
        <Carousel.Caption>
          <h3 className={styles.carousel_caption_h3}>TREINO FOCADO EM VOCÊ</h3>
          <p className={styles.carousel_caption_p}>
          Na FitTech, cada treino é cuidadosamente adaptado às suas metas e necessidades individuais.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;