import React, { useState } from 'react';
import styles from './Accordion2.module.css';
import ButtonType2 from '../button/Button';

const AccordionSolution = () => {
    const [activeAccordion, setActiveAccordion] = useState(0);

    function GavetaItemAccordion({ title, description, button, index }) {
        const isActive = index === activeAccordion;

        const handleClick = () => {
            setActiveAccordion(index);
        };

        return (
            <div className={`${styles.sectionText} ${isActive ? styles.active : ''}`}>
                <button onClick={handleClick}>
                    <span className={styles.secondaryHeadline}>{title}</span>
                </button>
                <div className={`${styles.solution_mobile_subtitle} ${isActive ? styles.active : ''}`}>
                    {description}
                    {isActive && button}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.col} id="gaveta">
            <GavetaItemAccordion
                title="O que o aplicativo me oferece?"
                description="O aplicativo FitTech oferece um conjunto abrangente de recursos para ajudá-lo a alcançar seus objetivos de saúde e fitness. Ele inclui um plano de treinamento personalizado, registro de atividades físicas e nutrição, feedback e motivação, uma comunidade online para suporte, acompanhamento de metas e notificações úteis. Com o FitTech, você pode acompanhar seu progresso, receber orientação personalizada e se manter motivado em sua jornada de saúde e bem-estar."
                button={<ButtonType2 />}
                index={0}
            />
            <GavetaItemAccordion
                title="Monitoramento de Nutrição"
                description="O FitTech oferece uma solução abrangente para o monitoramento da nutrição, permitindo aos usuários registrar e analisar sua ingestão alimentar de forma fácil e eficiente. Com recursos personalizados e intuitivos, os usuários podem acompanhar sua dieta diária, monitorar a ingestão de nutrientes, definir metas de nutrição e receber feedback personalizado para ajudá-los a alcançar seus objetivos de saúde e fitness."
                index={1}
            />
            <GavetaItemAccordion
                title="Notificações e lembretes"
                description="Com as notificações e lembretes integrados do FitTech, os usuários podem manter-se facilmente atualizados e motivados em sua jornada de saúde e bem-estar. Receba lembretes úteis para atividades físicas e planos de refeições. Além disso, as notificações fornecem feedback instantâneo, reconhecimento de conquistas e lembretes importantes, garantindo que os usuários permaneçam engajados e comprometidos com seus objetivos de forma consistente."
                index={2}
            />
        </div>
    );
}

export default AccordionSolution;
