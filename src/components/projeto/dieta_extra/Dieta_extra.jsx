import React, { useState } from "react";
import styles from './Dieta_extra.module.css';
import { Button } from "@mui/material";
import { FoodBank } from "@mui/icons-material";
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import CircularProgress from "@mui/material/CircularProgress";
import { Checkbox } from "@mui/joy";
import { toast } from "react-toastify";
import Api from "../../../api";
import { getId } from "../../../service/auth";
import ModalDieta from "../modal_dieta/ModalDieta";

const DietaExtra = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkedItemsPrincipal, setCheckedItemsPrincipal] = useState([]);
    const [checkedItemsAcompanhamento, setCheckedItemsAcompanhamento] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);


    const handleSelectChangePrincipal = (value) => {
        if (checkedItemsPrincipal.includes(value)) {
            setCheckedItemsPrincipal(checkedItemsPrincipal.filter(item => item !== value));
        } else {
            setCheckedItemsPrincipal([...checkedItemsPrincipal, value]);
        }
    };

    const handleSelectChangeAcompanhamento = (value) => {
        if (checkedItemsAcompanhamento.includes(value)) {
            setCheckedItemsAcompanhamento(checkedItemsAcompanhamento.filter(item => item !== value));
        } else {
            setCheckedItemsAcompanhamento([...checkedItemsAcompanhamento, value]);
        }
    };

    const handleStartClick = async () => {
        try {
            setLoading(true);

            const response = await Api.get(`/openai/receita-extra/${getId()}`, {
                params: { principal: checkedItemsPrincipal[0], acompanhamento: checkedItemsAcompanhamento[0] },
            });
            setSelectedCard({
                titulo: response.data.nome || `Título 1`,
                descricao: response.data.modoPreparo || `Descrição 1`,
                carboidratos: Number(response.data.carboidratos) || 0,
                calorias: Number(response.data.calorias) || 0,
                gorduras: Number(response.data.gorduras) || 0,
                proteinas: Number(response.data.proteina) || 0,
                acucares: response.data.acucar || 0,
                tempoPreparo: response.data.tempoPreparo || 0,
                ingredientes: response.data.ingredientes || [],
            });

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const exibicao = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setSelectedCard(null);
    };

    return (
        <>
            <Button
                variant="contained"
                color="success"
                endIcon={<FoodBank />}
                onClick={exibicao}
            >
                Está com fome?
            </Button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{ background: "var(--preto-secundario)" }}>
                    <DialogTitle style={{ color: "white" }}>
                        Criando uma refeição leve
                    </DialogTitle>
                    {loading ? (
                        <Box className={styles.loading}>
                            <CircularProgress color="primary" />
                            <Typography style={{ color: "white" }}>
                                Carregando suas refeições, aguarde...
                            </Typography>
                        </Box>
                    ) : (
                        <form>
                            <Box>
                                <Typography variant="body1" fontWeight="bold" fontSize="18px" mb={2}>
                                    Qual o tipo de alimento principal você deseja?
                                </Typography>
                                <div role="group" aria-labelledby="topping">
                                    <List
                                        orientation="horizontal"
                                        wrap
                                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                                        sx={{
                                            '--List-gap': '8px',
                                            '--ListItem-radius': '20px',
                                        }}>
                                        {["Proteina", "Legume", "Fruta"].map((value) => (
                                            <ListItem key={value}>
                                                <Checkbox
                                                    overlay
                                                    disabled={checkedItemsPrincipal.length >= 1 && !checkedItemsPrincipal.includes(value)}
                                                    disableIcon
                                                    label={value}
                                                    color='danger'
                                                    value={value}
                                                    checked={checkedItemsPrincipal.includes(value)}
                                                    onChange={() => handleSelectChangePrincipal(value)}
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
                            <Box style={{ marginTop: "10px" }}>
                                <Typography variant="body1" fontWeight="bold" fontSize="18px" mb={2}>
                                    Escolha o acompanhamento:
                                </Typography>
                                <div role="group" aria-labelledby="topping">
                                    <List
                                        orientation="horizontal"
                                        wrap
                                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                                        sx={{
                                            '--List-gap': '8px',
                                            '--ListItem-radius': '20px',
                                        }}>
                                        {["Arroz", "Salada", "Pão"].map((value) => (
                                            <ListItem key={value}>
                                                <Checkbox
                                                    overlay
                                                    disabled={checkedItemsAcompanhamento.length >= 1 && !checkedItemsAcompanhamento.includes(value)}
                                                    disableIcon
                                                    label={value}
                                                    color='success'
                                                    value={value}
                                                    checked={checkedItemsAcompanhamento.includes(value)}
                                                    onChange={() => handleSelectChangeAcompanhamento(value)}
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

                            <Button
                                variant='contained'
                                color='success'
                                style={{ marginTop: "20px" }}
                                onClick={handleStartClick}
                                disabled={checkedItemsPrincipal.length === 0 || checkedItemsAcompanhamento.length === 0}>
                                Gerar receita
                            </Button>
                        </form>
                    )}
                </ModalDialog>
            </Modal>

            {selectedCard && <ModalDieta card={selectedCard} onClose={closeModal} />}
        </>
    );
};

export default DietaExtra;
