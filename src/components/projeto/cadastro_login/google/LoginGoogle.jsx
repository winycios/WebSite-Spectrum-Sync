import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Api from '../../../../api';
import { GoogleLogin } from '@react-oauth/google';
import { LogarUser } from '../../../../service/auth';

function CadasGoogle() {
    const navigate = useNavigate();

    const responseMessage = (response) => {

        const profile = JSON.parse(atob(response.credential.split('.')[1]));

        const name = profile.name;
        const email = profile.email;
        handleLogin(name, email)
    };

    const errorMessage = (error) => {
        toast.error("Login falhou, tente novamente mais tarde")
    };

    const handleLogin = (name, email) => {

        Api.post(`usuarios/login/google`, {
            email: email,
            nome: name

        }).then((response) => {
            LogarUser(response.data.userId, response.data.token)


            toast.success(`Olá ${response.data.nome}, seja bem vindo!`);
            logOut();
            setTimeout(() => {
                toast.success("Carregando pagina!");
                navigate("/homeProjeto")
            }, 2000);

        }).catch(function (error) {
            toast.error(error.response.data.message);
        });
    }

    const logOut = () => {
        googleLogout();
    };

    return (
        <div>
            <GoogleLogin
                onSuccess={responseMessage}
                onError={errorMessage}
                useOneTap
            />
        </div>
    );
}

export default CadasGoogle;
