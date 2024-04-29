import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './Accordion.module.css';

export default function AccordionUsage() {
  return (
    <div>
      <Accordion className={styles.AccordionSummary}>
        <AccordionSummary className={styles.AccordionSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h1 className={styles.h1_text}>Qual o objetivo da FitTech?</h1>
        </AccordionSummary>
        <AccordionDetails className={styles.h2_text}>
        O objetivo da FitTech é oferecer uma plataforma abrangente para ajudar as pessoas a alcançar seus objetivos de saúde e fitness de maneira totalmente gratuita, fornecendo ferramentas de treinamento personalizado, registro de atividades físicas e nutrição, feedback e motivação, e muito mais.
        </AccordionDetails>
      </Accordion>
      <Accordion className={styles.AccordionSummary}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <h1 className={styles.h1_text}>Quais academias são parceiras da SPECTRUM?</h1>
        </AccordionSummary>
        <AccordionDetails className={styles.h2_text}>
        A FitTech possui parcerias com diversas academias renomadas. Essas parcerias garantem acesso privilegiado a recursos exclusivos para os usuários da FitTech.
        </AccordionDetails>
      </Accordion>
      <Accordion className={styles.AccordionSummary}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <h1 className={styles.h1_text}>Realmente é tudo de graça?</h1>
        </AccordionSummary>
        <AccordionDetails className={styles.h2_text}>
        Isso mesmo! a FitTech oferece toda sua variedade de recursos gratuitos para os usuários, incluindo planos de treinamento personalizados, registro de atividades físicas e nutrição com receitas personalizadas.
        </AccordionDetails>
      </Accordion>
      <Accordion className={styles.AccordionSummary}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <h1 className={styles.h1_text}>Como faço para ter a FitTech em meu estabelecimento?</h1>
        </AccordionSummary>
        <AccordionDetails className={styles.h2_text}>
        Para ter a FitTech disponível em seu estabelecimento, basta entrar em contato conosco através do nosso site oficial ou do canal de suporte ao cliente. Nossa equipe terá prazer em orientá-lo sobre os próximos passos para integrar a FitTech em sua academia ou espaço fitness.
        </AccordionDetails>
      </Accordion>
      <Accordion className={styles.AccordionSummary}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <h1 className={styles.h1_text}>Meus dados são protegidos?</h1>
        </AccordionSummary>
        <AccordionDetails className={styles.h2_text}>
        Sim, seus dados são protegidos com os mais altos padrões de segurança e privacidade. A FitTech adota medidas rigorosas para garantir a confidencialidade e integridade das informações dos usuários, seguindo as melhores práticas de proteção de dados.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}