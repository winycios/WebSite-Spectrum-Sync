import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Home from './pages/landing page/Home'
import Cadastro from './pages/projeto/login_cadastro/Cadastro';
import Login from './pages/projeto/login_cadastro/Login';
import NotFound from './pages/notFound/NotFound';
import HomeProjeto from './pages/projeto/home/Home'
const Rotas = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="cadastrar" element={<Cadastro />} />
                <Route path="logar" element={<Login />} />
                <Route path="homeProjeto" element={<HomeProjeto />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </>
    )
);
export default Rotas;