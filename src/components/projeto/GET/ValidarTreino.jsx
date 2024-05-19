import React, { useState, useEffect } from 'react';
import Api from '../../../api';
import { getId } from '../../../service/auth';

import ModalTreino from "../modal_criar_treino/ModalTreino"

const FindTreino = () => {
    const [valid, setValid] = useState("");


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`treinos/verificar/${getId()}`);
                setValid(response.data)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {!valid ? <ModalTreino /> : null}
        </>
    );
};

export default FindTreino;
