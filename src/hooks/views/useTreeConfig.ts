import { useMemo } from "react";

const useTreeConfig = <M extends ModelName>(): IACele.Hook.List.Tree.Config<M> => {

    // Inicialización de configuración del árbol
    const config = useMemo<IACele.View.List.Tree.Config<M>[]>(
        () => ([]), []
    );

    return { config };
};

export default useTreeConfig;
