import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";

/** 
 *  ## Plantilla de Selección de opciones
 *  Este componente renderiza un componente envuelto que despliega una lista de 
 *  opciones seleccionables.
 *   
 *  `< tsx />` Se autocierra.
 *   
 *  ### Parámetros de entrada
 *  - [ {@link SelectOption[]} ] `toggleableKeys`: Arreglo de opciones
 *  seleccionables.
 *  - [ {@link Set<string>} ] `selectedKeys`: Opciones activas.
 *  - [ `undefined` ] `setSelectedKeys`: Función de cambio de estado de llaves
 *  activas.
 *  - [ {@link React.JSX.Element} ] `trigger`: Componente para desplegar el
 *  Select.
 *  - [ {@link 'single' | 'multiple'} ] `selectionMode`: Tipo de selección de
 *  opciones.
 */ 
const SelectTemplate = <T extends string | number>({
    toggleableKeys,
    selectedKeys,
    setSelectedKeys,
    trigger,
    selectionMode = 'single'
}: IACele.UI.SelectTemplate<T>) => {

    return (
        <Dropdown className="bg-white dark:bg-[#1f2f3f] backdrop-blur-sm transition-none">
            <DropdownTrigger>
                {trigger}
            </DropdownTrigger>
            <DropdownMenu
                hideSelectedIcon={false}
                closeOnSelect={selectionMode === 'single'}
                selectionMode={selectionMode}
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
            >
                {
                    toggleableKeys.map(
                        (option) => (
                            <DropdownItem color="primary" key={option.name}>{option.label}</DropdownItem>
                        )
                    )
                }
            </DropdownMenu>
        </Dropdown>
    );
};

export default SelectTemplate;
