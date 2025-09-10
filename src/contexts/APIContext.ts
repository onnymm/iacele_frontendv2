import { createContext } from "react";
import { APIParams } from "../hooks/app/useAPI";
import Client from "../api/client/client";

const APIContext = createContext<APIParams>({
    appLoading: false,
    setAppLoading: () => (null),
    api: new Client(
        () => (null),
        () => (null),
        () => (null),
        () => (null),
    ),
});

export default APIContext;
