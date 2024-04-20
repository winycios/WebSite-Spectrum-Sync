import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Api from '../../../../api';

function CadasGoogle() {
    const navigate = useNavigate();

    const responseMessage = (response) => {
        const profile = JSON.parse(atob(response.credential.split('.')[1]));

        const name = profile.name;
        const email = profile.email;
        const picture = profile.picture;
        handleSave(name, email, picture)
    }

    const errorMessage = (error) => {
        toast.error("Cadastro falhou, tente novamente mais tarde")
    }

    const handleSave = (name, email, picture) => {
        Api.post(`usuarios`, {
            nome: name,
            email: email,
            img: picture,
            senha: "MAdalena13#"

        }).then(() => {
            toast.success("Usuário criado com sucesso!");
            logOut();
            setTimeout(() => { navigate("/logar"); }, 2000);

        }).catch(function (error) {
            toast.error(error.response.data.message);
        });
    }


    const logOut = () => {
        googleLogout();
    };

    return (

        <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
        />
    );
}

export default CadasGoogle;