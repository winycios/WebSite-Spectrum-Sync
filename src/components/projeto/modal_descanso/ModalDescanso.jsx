import React, { useEffect, useState, useRef, useCallback } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogContent from '@mui/joy/DialogContent';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Styles from "./ModalDescanso.module.css";
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';

const ModalDescanso = ({ boolean }) => {

    const [progress, setProgress] = useState(0);
    const [modalDescanso, setModalDescanso] = useState(false);
    const intervalRef = useRef(null);
    const [limitador, setLimitador] = useState(30);
    const [chance, setChance] = useState(0);

    const reiniciar = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setProgress(0);
        setModalDescanso(false);
    }, []);


    const progressao = useCallback(() => {
        setProgress((prevProgress) => {
            const newProgress = prevProgress + (100 / limitador);
            if (newProgress >= 100) {
                clearInterval(intervalRef.current);
                reiniciar();
                return 100;
            }
            return newProgress;
        });
    }, [limitador, reiniciar]);


    const iniciarProgressao = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(progressao, 1000);
    }, [progressao]);


    useEffect(() => {
        if (boolean) {
            setChance(0);
            setLimitador(30);
            setProgress(0);
            setModalDescanso(boolean);
            iniciarProgressao();
        }
    }, [boolean, iniciarProgressao]);



    const maisTempo = useCallback(() => {
        setChance((prevChance) => prevChance + 1);
        setLimitador((prevLimitador) => prevLimitador + 10);
    }, []);


    useEffect(() => {
        if (modalDescanso) {
            iniciarProgressao();
        }
    }, [iniciarProgressao, limitador, modalDescanso]);

    return (
        <>
            <Modal keepMounted open={modalDescanso}>
                <ModalDialog>
                    <DialogContent>
                        <div className={Styles.box}>
                            <div className={Styles.img}>
                                <SelfImprovementIcon sx={{ fontSize: 60, fill: "rgb(144, 202, 249)" }} />
                            </div>
                            <div className={Styles.text}>
                                <h5>Descanse antes de iniciar o próximo exercício.</h5>
                                <h6>Tempo total de descanso: {limitador} segundos</h6>
                                <LinearProgress
                                    determinate
                                    variant="outlined"
                                    color="neutral"
                                    thickness={24}
                                    value={progress}
                                    sx={{
                                        '--LinearProgress-radius': '20px',
                                        '--LinearProgress-thickness': '24px',
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        level="body-xs"
                                        fontWeight="xl"
                                        textColor="rgb(144, 202, 249)"
                                        sx={{ mixBlendMode: 'difference' }}
                                    >
                                        Em breve, começaremos o próximo exercício... {`${Math.round(progress)}%`}
                                    </Typography>
                                </LinearProgress>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<AlarmAddIcon sx={{ fill: "rgb(144, 202, 249)" }} />}
                                        disabled={progress >= 90 || chance === 3}
                                        onClick={maisTempo}
                                    >
                                        +10 Seg
                                    </Button>
                                    <Button variant="contained" endIcon={<HourglassDisabledIcon />} onClick={reiniciar}>
                                        Próximo
                                    </Button>
                                </Stack>
                            </div>
                        </div>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </>
    )
}

export default ModalDescanso;
