import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/joy/Checkbox';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import Api from '../../../api'
import { dias } from '../../../utils/vetor/dias';
import { getId } from '../../../service/auth';
import moment from 'moment';

const ModalTreino = () => {

    const [checkedState, setCheckedState] = useState(
        new Array(dias.length).fill(false)
    );

    const [meta, setMeta] = useState("");

    const [treino, setTreino] = useState(false);

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );


        setCheckedState(updatedCheckedState);
    };

    const checkedCount = checkedState.filter(value => value).length;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`usuarios/${getId()}`);
                setMeta(response.data.meta);

            } catch (error) {
                //console.log(error); 
            }
        };

        fetchData();
    }, []);

    const criarTreino = async () => {
        if (checkedCount === 0) {
            toast.warning("É necessário selecionar pelo menos uma opção!");
            return;
        }

        setTreino(true);

        const selectedDays = dias.filter((_, index) => checkedState[index]).map(item => item.name);

        try {
            const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

            let intervaloTreino = true;

            for (let i = 0; i < 7; i++) {
                const nextDay = moment().add(i, 'days');
                const diaSemanaAbreviado = diasDaSemana[nextDay.day()];
                const status = selectedDays.includes(diaSemanaAbreviado) ? "Descanso" : "Treino";
                const tipoTreino = intervaloTreino ? `${meta}_1` : `${meta}_2`;

                await Api.post("treinos", {
                    descricao: "Diario",
                    dataTreino: nextDay.format('YYYY-MM-DD'),
                    status,
                    tipoTreino,
                    usuarioId: getId()
                });

                intervaloTreino = !intervaloTreino;
            }

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };



    const exibicao = () => {
        if (!treino) {
            return (
                <form>
                    <Box>
                        <Typography id="topping" level="body-sm" fontWeight="500" fontSize={"18px"} mb={2}>
                            Selecione os dias de descanso (MAX. 2)
                        </Typography>
                        <div role="group" aria-labelledby="topping">
                            <List
                                orientation="horizontal"
                                wrap
                                sx={{
                                    '--List-gap': '8px',
                                    '--ListItem-radius': '20px',
                                }}
                            >
                                {dias.map((item, index) => (
                                    <ListItem key={index}>
                                        <Checkbox
                                            overlay
                                            disabled={!checkedState[index] && checkedCount >= 2}
                                            disableIcon
                                            label={item.name}
                                            color='danger'
                                            value={item.name}
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}
                                            sx={{
                                                '.css-10q1s9e-JoyCheckbox-label': {
                                                    color: "white",
                                                    fontWeight: "bold"
                                                }
                                            }} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Box>
                    <Button variant='contained' color='success' style={{ marginTop: "20px" }} onClick={criarTreino}>Enviar dado</Button>
                </form>
            );
        } else {
            return (
                <Stack sx={{ color: 'grey.500', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }} spacing={2} direction="row">
                    <CircularProgress color="secondary" />
                    <CircularProgress color="success" />
                    <CircularProgress color="inherit" />
                </Stack>
            );
        }
    };

    return (
        <>
            <Modal open={true}>
                <ModalDialog sx={{ background: "var(--preto-secundario)" }}>
                    <DialogTitle style={{ color: "white" }}>Criando sua lista de treinos personalizada.</DialogTitle>
                    {exibicao()}
                </ModalDialog>
            </Modal>
        </>
    )
}

export default ModalTreino;
