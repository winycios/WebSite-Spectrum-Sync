import React, { useState, useEffect } from 'react';
import Api from '../../../api';
import { getId } from '../../../service/auth';

import ValidarUsuario from "../../../components/projeto/GET/ValidarUsuario"
import User from "../../../pages/projeto/logado/tela_usuario/User"

const FindUser = () => {
    const [user, setUser] = useState({
        nome: '',
        dataNascimento: '',
        genero: '',
        peso: '',
        altura: '',
        nivelCondicao: '',
        meta: '',
        objetivo: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`usuarios/${getId()}`);
                const userData = response.data;
                setUser(prevUser => ({
                    ...prevUser,
                    nome: userData.nome,
                    dataNascimento: userData.dataNascimento,
                    genero: userData.genero,
                    peso: userData.peso,
                    altura: userData.altura,
                    nivelCondicao: userData.nivelCondicao,
                    meta: userData.meta,
                    objetivo: userData.objetivo

                }));
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
            {user.dataNascimento == null ? <ValidarUsuario /> :
                <User nome={user.nome} dataNascimento={user.dataNascimento}
                    genero={user.genero} peso={user.peso} altura={user.altura}
                    nivelCondicao={user.nivelCondicao} meta={user.meta} objetivo={user.objetivo} />
            }
        </>
    );
};

export default FindUser;
