import styles from './Layout_Login.module.css';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';


const Layout_Recuperar = ({ background, value }) => {

    return (
        <>
            <div className={styles.box} style={{ backgroundImage: `url(${background})` }}>

                <Link to="/"><span className={styles.exit}><ArrowLeft size={30} className={`align-center`} /></span></Link>

                <div className={styles.boxText}>

                    <Link to="../logar"><span className={`${styles.text} ${value ? styles.active : ''}`}>Login</span></Link>
                    <Link to="../recuperar"><span className={`${styles.text} ${value === false ? styles.active : ''}`}>Recuperar Senha</span></Link>

                </div>
            </div>
        </>
    );
}


export default Layout_Recuperar;