/** 
 *  ## Componente redimensionable
 *  Este componente renderiza dos versiones declaradas de un componente que 
 *  cambia de apariencia en vista móvil y escritorio.
 *  
 *  Este componente recibe como `children` una función flecha que destructura 
 *  parámetros algunos parámetros proporcionados a ésta que cambian en base a 
 *  si la vista es móvil o escritorio.
 *  
 *  ### Parámetros de entrada de la función `children`
 *  - [ {@link IACele.UI.Sizeable._View View} ]: `view`: Tipo de vista actual.
 *  Los valores disponibles son:
 *      - `'mobile'`: Vista móvil
 *      - `'desktop'`: Vista de escritorio
 *  - [ {@link IACele.UI.Sizeable._ComponentSize ComponentSize} ]:
 *  `componentSize`: Valor de tamaño utilizado para componentes de HeroUI. Los
 *  valores disponibles son:
 *      - `'md'`: Valor de tamaño mediano para vista móvil
 *      - `'sm'`: Valor de tamaño pequeño para vista de escritorio.
 *  - [ {@link IACele.UI.Sizeable._TextSize TextSize} ]: `textSize`: Nombre de
 *  clase de tamaño de texto. Los valores disponibles son:
 *      - `'text-medium'`: Tamaño de texto mediano para vista móvil
 *      - `'text-sm'`: Tamaño de texto pequeño para vista de escritorio
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const Sizeable: React.FC<IACele.UI.Sizeable.SizeableParams> = ({
    children,
}) => {

    return (
        <div className="h-min">
            {/* Renderización para componente visible en móvil */}
            <div className="sm:hidden flex items-center">
                {children({ view: 'mobile', componentSize: 'md', textSize: 'text-medium' })}
            </div>
            {/* Renderización para componente visible en escritorio */}
            <div className="hidden sm:flex items-center">
                {children({ view: 'desktop', componentSize: 'sm', textSize: 'text-sm' })}
            </div>
        </div>
    );
};

export default Sizeable;
