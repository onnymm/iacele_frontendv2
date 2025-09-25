import { Route, Routes } from "react-router"
import App from "./App"
import Home from "./routes/Home"
import Login from "./routes/Login";
import CarpentryProyectTree from "./routes/views/list/CarpentryProyectTree";
import CarpentryProject from "./routes/views/form/CarpentryProject";
import BaseUsersTree from "./routes/views/list/Users";
import User from "./routes/views/form/User";
import Models from "./routes/views/list/Models";
import Model from "./routes/views/form/Model";
import Fields from "./routes/views/list/Fields";
import Field from "./routes/views/form/Field";
import Selections from "./routes/views/list/Selections";
import Groups from "./routes/views/list/Groups";
import Permissions from "./routes/views/list/Permissions";

/** 
 *  ## Ruteador
 *  Este componente renderiza un proveedor de contexto para la estructura del
 *  ruteador de React Router v7.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const Router = (): (React.JSX.Element) => {

    return (
        <Routes>
            <Route element={<App />}>
                <Route index element={<Home />} />
                <Route path="view">

                    <Route path="list">
                        <Route path="projects" element={<CarpentryProyectTree />} />
                        <Route path="users" element={<BaseUsersTree />} />
                        <Route path="models" element={<Models />} />
                        <Route path="fields" element={<Fields />} />
                        <Route path="selections" element={<Selections />} />
                        <Route path="groups" element={<Groups />} />
                        <Route path="permissions" element={<Permissions />} />
                    </Route>

                    <Route path="form">
                        <Route path="project" element={<CarpentryProject />} />
                        <Route path="user" element={<User />} />
                        <Route path="model" element={<Model />} />
                        <Route path="field" element={<Field />} />
                    </Route>
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default Router;
