import styles from './Button.module.css';

const handleClick = () => {
    window.open("https://github.com/Cabayer915", "_blank");
}

const ButtonType = () => {
    return (
        <button onClick={handleClick} className={styles.button}>
            <div className={styles.textContainer}>
                <b className={styles.buttonText}>Faça download agora</b>
            </div>
        </button>
    );
}

export default ButtonType;