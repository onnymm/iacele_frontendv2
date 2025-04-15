/** 
 *  ## Campo de Kanban
 *  Este componente renderiza un campo para la declaración de vista kanban
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string | undefined` ] `label`: Nombre explícito de la columna en caso
 *  de querer reemplazar su nombre prestablecido.
 */ 
const FieldWrapper = ({
    children,
    label,
}: IACele.View.Widget.FieldWrapper) => {

    return (
        <div className={`flex flex-row items-center gap-1`}>
            {label &&
                <span className="text-gray-500">{label}</span>
            }
            {children}
        </div>
    );
};

export default FieldWrapper;
