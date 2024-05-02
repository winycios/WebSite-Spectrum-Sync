import React from "react";
import Navbar from "../../components/landing-page/navBar/NavBar_landing";
import Slider from "../../components/landing-page/slider/Slider";
import Separator from "../../components/landing-page/separator/Separator";
import AccordionFaq from "../../components/landing-page/accordion/AccordionFaq";
import AccordionSolution from "../../components/landing-page/accordion2/AccordionSolution";
import Footer from "../../components/landing-page/footer/Footer"
import styles from "./Home.module.css";


const folder1 = "https://fittech500.blob.core.windows.net/imagens-spectrum/supino.png";
const folder2 = "https://fittech500.blob.core.windows.net/imagens-spectrum/dieta.png";
const folder3 = "https://fittech500.blob.core.windows.net/imagens-spectrum/dispositivos-responsivos.png";
const exampleNavigation = "https://fittech500.blob.core.windows.net/imagens-spectrum/exampleNavigation.svg";
const exampleMobile = "https://fittech500.blob.core.windows.net/imagens-spectrum/mobileExample.svg";

const Home = () => {
    return (
        <>
            <Navbar />

            <div id="section_slider">
                <Slider />
            </div>

            <Separator />

            <div id="section_info" className={styles.container_section_info}>

                <ul className={styles.info_box}>
                    <li>
                        <img src={folder1} className={styles.info_img} alt="" />
                    </li>
                    <li>
                        <h1 className={styles.info_title}>Treinos personalizados</h1>
                    </li>
                    <li>
                        <h2 className={styles.info_subtitle}>
                            Explore treinos personalizados, adaptados para suas metas e necessidades individuais.
                        </h2>
                    </li>
                </ul>
                <ul className={styles.info_box}>
                    <li>
                        <img src={folder2} className={styles.info_img} alt="" />
                    </li>
                    <li>
                        <h1 className={styles.info_title}>Nutrição fitness personalizada</h1>
                    </li>
                    <li>
                        <h2 className={styles.info_subtitle}>
                            Nutrição personalizada para otimizar seus resultados fitness, adaptada às suas necessidades individuais e metas específicas.
                        </h2>
                    </li>
                </ul>
                <ul className={styles.info_box}>
                    <li>
                        <img src={folder3} className={styles.info_img} alt="" />
                    </li>
                    <li>
                        <h1 className={styles.info_title}>Acesso em qualquer dispositivo</h1>
                    </li>
                    <li>
                        <h2 className={styles.info_subtitle}>
                            Tenha acesso fácil e conveniente ao conteúdo em qualquer dispositivo que você preferir.
                        </h2>
                    </li>
                </ul>

            </div>

            <div id="section_solution" className={styles.container_section_solution}>
                <h1 className={styles.solution_title}>Solução no Website</h1>
                <h2 className={styles.info_subtitle}>
                    Transforme o website da FitTech em uma central de controle para sua jornada de saúde e fitness com a nossa solução!
                </h2>
                <div className={styles.grid_solution}>
                    <ul className={styles.solution_list}>
                        <li>
                            <h2 className={styles.solution_subtitle}>
                                SAÚDE E TECNOLOGIA
                            </h2>
                        </li>
                        <li>
                            <h1 className={styles.solution_title2}>
                                Otimize sua Saúde com Nossas Ferramentas
                            </h1>
                        </li>
                        <li>
                            <h2 className={styles.solution_subtitle}>
                                Centralize sua jornada de saúde e fitness no seu site com o FitTech. Acesse planos de treinamento personalizados, registre atividades e monitore nutrição. Com design intuitivo e conteúdo educativo, alcance seus objetivos com facilidade.
                            </h2>
                        </li>
                    </ul>
                    <img src={exampleNavigation} className={styles.solution_img} alt="" />
                </div>
            </div>

            <div className={styles.container_section_solution_mobile}>
                <h1 className={styles.solution_title}>
                    Concentre-se no que importa
                </h1>
                <h2 className={styles.solution_subtitle}>
                    A FitTech também está disponível em dispositivos móveis, tornando-a mais acessível e conveniente para uso em movimento.
                </h2>
                <div className={styles.solution_mobile_main}>
                    <img className={styles.solution_mobile_img} src={exampleMobile} alt="" />
                    <AccordionSolution />
                </div>

            </div>

            <div id="section_faq" className={styles.container_section_faq}>
                <h1 className={styles.solution_title}>
                    Respostas às suas perguntas
                </h1>
                <AccordionFaq />
            </div>

            <Footer />
        </>
    )
}

export default Home;