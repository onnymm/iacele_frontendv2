import { useCallback } from "react";

const useAddConfig = <M extends ModelName>(
    treeConfig: IACele.View.List.Tree.Config<M>[],
): IACele.Hook.List.Tree.AddConfig<M> => {

    // Inicialización de función para añadir datos de vista
    const addConfig = useCallback(
        (config: IACele.View.List.Tree.Config<M>) => {
            // Si no se ha añadido la configuración de la vista...
            if ( !treeConfig.find( (item) => (item.name === config.name) ) ) {
                // Se añade ésta
                treeConfig.push(config);
            };
        }, [treeConfig]
    );

    return { addConfig };
};

export default useAddConfig;
