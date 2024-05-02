import React, { useState, useEffect } from 'react';
import Api from '../../../api';
import { getId } from '../../../service/auth';

import CustomizedSteppers from "../modal user/ModalUsuario"
const FindUser = () => {
    const [valid, setValid] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`usuarios/${getId()}`);
                setValid(response.data.genero);
                setNome(response.data.nome);
                setEmail(response.data.email);
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
            {valid == null ? <CustomizedSteppers nome={nome} email={email} /> : null
            }
        </>
    );
};

export default FindUser;
