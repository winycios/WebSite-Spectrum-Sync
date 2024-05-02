import { React } from "react";
import NavBar from "../../../../components/projeto/navBar/NavBar";
import FindUser from "../../../../components/projeto/GET/ValidarUsuario";

const Home = () => {
    return (
        <>
            <NavBar />
            <FindUser />
        </>
    )
}

export default Home;