import { Route, Routes } from "react-router"
import App from "./App"
import Home from "./routes/Home"

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
            </Route>
        </Routes>
    );
};

export default Router;
