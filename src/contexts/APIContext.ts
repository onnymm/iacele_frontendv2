import { createContext } from "react";
import { APIParams } from "../hooks/app/useAPI";
import APIManager from "../api/api";

const APIContext = createContext<APIParams>({
    appLoading: false,
    setAppLoading: () => null,
    api: new APIManager(() => null),
});

export default APIContext;
