import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import RenderCell from "./components/RenderCell";
import SortingFieldContext from "../../../contexts/sortingFieldContext";
import InteractiveColumn from "./components/InteractiveColumn";

interface TreeParams {
    tableName: IACele.API.Database.TableName; // Nombre de la tabla de donde se obtienen los datos.
    tableColumns: IACele.View.List._TableColumnConfig<IACele.API.DataTypes.GenericRecord>[]; // Configuración de columnas.
    selectedSortingDirection: Set<IACele.View.SortingDirectionValue>; // Conjunto que contiene la dirección de ordenamiento.
    sortingFieldKey: string | null; // Llave de columna que ordena los datos actualmente.
    toggleSortingColumn: (key: string) => void; // Función que establece la columna de ordenamiento.
    emptyContent: string; // Leyenda de contenido vacío.
    loading: boolean; // Estado de carga.
    records: IACele.API.DataTypes.GenericRecord[]; // Arreglo de objetos que contienen los datos de un registro de la base de datos.
};

/** 
 *  ## Vista de Árbol/Tabla.
 *  Este componente renderiza una vista de ábol/tabla para visualizar múltiples
 *  registros del mismo tipo.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.API.Database.TableName} ] `tableName`: Nombre de la tabla
 *  de donde se obtienen los datos.
 *  - [ {@link IACele.View.List._TableColumnConfig<IACele.API.DataTypes.GenericRecord>[]}
 *  ] `tableColumns`: Configuración de columnas.
 *  - [ {@link Set<IACele.View.SortingDirectionValue>} ]
 *  `selectedSortingDirection`: Conjunto que contiene la dirección de
 *  ordenamiento.
 *  - [ {@link string | null} ] `sortingFieldKey`: Llave de columna que ordena
 *  los datos actualmente.
 *  - [ `undefined` ] `toggleSortingColumn`: Función que establece la columna
 *  de ordenamiento.
 *  - [ `string` ] `emptyContent`: Leyenda de contenido vacío.
 *  - [ `boolean` ] `loading`: Estado de carga.
 *  - [ {@link IACele.API.DataTypes.GenericRecord[]} ] `records`: Arreglo de
 *  objetos que contienen los datos de un registro de la base de datos.
 */ 
const Tree: React.FC<TreeParams> = ({
    tableName,
    tableColumns,
    selectedSortingDirection,
    sortingFieldKey,
    toggleSortingColumn,
    emptyContent,
    loading,
    records,
}) => {

    return (
        <div className="flex flex-col gap-2 h-full overflow-hidden">
            <div className="bg-white dark:bg-[#1f2f3f] p-2 rounded-2xl h-full">
                <SortingFieldContext.Provider value={{ sortingFieldKey, selectedSortingDirection, toggleSortingColumn }}>
                    <Table
                        isHeaderSticky
                        hideHeader={!records}
                        aria-label="Tabla"
                        classNames={{
                            table: 'h-full overflow-y-scroll',
                            base: 'h-full',
                            wrapper: 'p-0 bg-transparent h-full',
                            th: 'shadow-sm p-0 bg-transparent',
                            tr: 'transition-transform-colors hover:bg-primary-500',
                            thead: '*:hover:bg-transparent',
                        }}
                    >
                        <TableHeader columns={tableColumns}>
                            {
                                (column) => (
                                    <TableColumn>
                                        <InteractiveColumn viewConfig={tableColumns} columnKey={column.key} label={column.label} ascendingDirection={selectedSortingDirection} />
                                    </TableColumn>
                                )
                            }
                        </TableHeader>
                        <TableBody isLoading={loading} loadingContent={<Spinner />} items={records} emptyContent={emptyContent}>
                            {
                                (record) => (
                                    <TableRow className="hover:cursor-pointer">
                                        {
                                            (columnKey) => (
                                                <TableCell>
                                                    <RenderCell
                                                        columns={tableColumns as IACele.View.List.ViewConfig<IACele.API.DataTypes.GenericRecord>}
                                                        columnKey={columnKey as string}
                                                        record={record}
                                                        tableName={tableName}
                                                        />
                                                </TableCell>
                                            )
                                        }
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </SortingFieldContext.Provider>
            </div>
        </div>
    );
};

export default Tree;
