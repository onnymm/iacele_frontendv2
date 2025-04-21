/** 
 *  ### Camel Case a Snake Case
 *  Esta función convierte un nombre de Camel Case de la convensión de
 *  JavaScript/TypeScript a Snake Case que corresponde a la convensión de
 *  Python.
 */ 
const toSnake = (key: string) => {

    return (
        key
        // Reemplazo por expresiones regulares
        .replace(/([A-Z])/g, "_$1")
        // Conversión a minúscula
        .toLowerCase()
    );
};

export default toSnake;
