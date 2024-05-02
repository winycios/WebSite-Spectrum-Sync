import instagram from '../../../utils/assets/instagram.svg';
import linkedin from '../../../utils/assets/linkedin.svg';
import youtube from '../../../utils/assets/youtube.svg';
import googleplay from '../../../utils/assets/GooglePlay.svg';
import styles from './Footer.module.css';


const Footer = () => {
  	return (
    		<div className={styles.footer}>
      			<div className={styles.bottom}>
        				<div className={styles.logoContainer}>
          					<div className={styles.logoGrey}>
            						<b>FitTech</b>
          					</div>
        				</div>
        				<div className={styles.companyname202x}>2024 Todos os direitos reservados.<br/>SPECTRUM SYNC.</div>
        				<div className={styles.footerComponentsverticalMen}>
          					<div className={styles.footerComponentslinkfooter}>
            						<div className={styles.linkName}>Termos</div>
          					</div>
          					<div className={styles.footerComponentslinkfooter}>
            						<div className={styles.linkName}>Privacidade</div>
          					</div>
          					<div className={styles.footerComponentslinkfooter}>
            						<div className={styles.linkName}>Contato</div>
          					</div>
        				</div>
        				<div className={styles.footerComponentssocialIcons}>
          					<img className={styles.iconJamIconsOutlineL} alt="" src={youtube} />
          					<img className={styles.iconJamIconsOutlineL} alt="" src={instagram} />
          					<img className={styles.iconJamIconsOutlineL} alt="" src={linkedin} />
        				</div>
        				<div className={styles.appDownload}>
          					<div className={styles.button}>
            						<div className={styles.googlePlay}>
                                        <img src={googleplay} alt="" />
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default Footer;