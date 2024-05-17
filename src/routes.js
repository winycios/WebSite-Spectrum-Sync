import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

// iniciais
import Home from './pages/landingPage/Home'
import NotFound from './pages/notFound/NotFound';

//Login e cadastro
import Cadastro from './pages/projeto/login_cadastro/Cadastro';
import Login from './pages/projeto/login_cadastro/Login';
import Recuperar from './pages/projeto/recuperar_senha/RecuperarSenha';

//Usuario logado
import HomeProjeto from './pages/projeto/logado/home/Home'
import Treino from './pages/projeto/logado/tela_treino/TelaTreino'
import Video from './pages/projeto/logado/tela_video/TelaVideo'
import User from './pages/projeto/logado/tela_usuario/User'
import Editar from './pages/projeto/logado/tela_usuario/editar/Editar'

const Rotas = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="cadastrar" element={<Cadastro />} />
                <Route path="logar" element={<Login />} />
                <Route path="recuperar" element={<Recuperar />} />
                <Route path="homeProjeto" element={<HomeProjeto />} />
                <Route path="homeProjeto/user" element={<User />} />
                <Route path="homeProjeto/treino" element={<Treino />} />
                <Route path="homeProjeto/treino/video" element={<Video />} />
                <Route path="homeProjeto/user/editar" element={<Editar />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </>
    )
);
export default Rotas;