/** 
 *  ## Grupo de campos en formulario
 *  Este componente renderiza un grupo para reunir campos de la vista.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `label`: Título del grupo.
 */ 
const Group: React.FC<IACele.UI.Group> = ({
    children,
    label,
}) => {

    return (
        <div className="group ui-group flex flex-col group-[.ui-group]:gap-2 group-[.ui-group]:grid group-[.ui-group]:grid-cols-2">
            {label &&
                <p className="group-[.ui-view-kanban]:hidden opacity-50 pb-2 font-semibold text-xs uppercase select-none">{label}</p>
            }
            {children}
        </div>
    );
};

export default Group;
