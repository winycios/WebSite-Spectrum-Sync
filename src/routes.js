import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

// iniciais
import Home from './pages/landing page/Home'
import NotFound from './pages/notFound/NotFound';

//Login e cadastro
import Cadastro from './pages/projeto/login_cadastro/Cadastro';
import Login from './pages/projeto/login_cadastro/Login';

//Usuario logado
import HomeProjeto from './pages/projeto/logado/home/Home'
import User from './pages/projeto/logado/tela_usuario/User'

const Rotas = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="cadastrar" element={<Cadastro />} />
                <Route path="logar" element={<Login />} />
                <Route path="homeProjeto" element={<HomeProjeto />} />
                <Route path="homeProjeto/user" element={<User />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </>
    )
);
export default Rotas;