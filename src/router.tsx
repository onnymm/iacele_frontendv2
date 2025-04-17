import { Route, Routes } from "react-router"
import App from "./App"
import Home from "./routes/Home"
import Login from "./routes/Login";
import Users from "./routes/views/list/Users";
import Sales from "./routes/views/list/Sales";
import User from "./routes/views/form/User";
import Sale from "./routes/views/form/Sale";

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

                <Route path="/view/list/sale" element={<Sales />} />
                <Route path="/view/list/user" element={<Users />} />

                <Route path="/view/form/sale" element={<Sale />} />
                <Route path="/view/form/user" element={<User />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default Router;
