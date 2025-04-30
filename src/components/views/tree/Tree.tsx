import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import SortingFieldContext from "../../../contexts/sortingFieldContext";
import InteractiveColumn from "./components/InteractiveColumn";
import RenderCell from "./components/RenderCell";
import useOpenRecord from "../../../hooks/views/useOpenRecord";
/** 
 *  ## Vista de Árbol/Tabla.
 *  Este componente renderiza una vista de ábol/tabla para visualizar múltiples
 *  registros del mismo tipo.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.API.Database.TableName Table} ] `table`: Nombre de la tabla de base de datos para extraer
 *  los nombres de los campos.
 *  - [ {@link IACele.View.Tree.ViewConfig ViewConfig} ] `viewConfig`: Configuración de vista de
 *  columnas de la tabla.
 *  - [ {@link Set<SortingDirectionValue>} ] `selectedSortingDirection`:
 *  Conjunto que contiene el valor de dirección de ordenamiento de datos.
 *  - [ {@link IACele.View.RecordInDatabase keyof API.Database.Table | null} ] `sortingFieldKey`: Llave
 *  que indica el campo por el cual los datos están siendo ordenados
 *  actualmente.
 *  - [ `undefined` ] `toggleSortingColumn`: Función para establecer el campo
 *  de ordenamiento.
 *  - [ `string` ] `emptyContent`: Leyenda para mostrar cuando no existan datos
 *  a mostrar.
 *  - [ `boolean` ] `loading`: Estado de carga.
 *  - [ {@link IACele.API.Database.Table RecordInDatabase[ ]} ] `records`: Datos a mostrar.
 */ 
const Tree = <T extends IACele.API.Database.TableName>({
    table,
    viewConfig,
    selectedSortingDirection,
    sortingFieldKey,
    toggleSortingColumn,
    emptyContent,
    loading,
    records,
}: IACele.View.Tree.Component<T>) => {

    const { recordPath, openRecord } = useOpenRecord();

    return (
        <div className="flex flex-col gap-2 h-full overflow-hidden">
            <div className="p-2 h-full">
                <SortingFieldContext.Provider value={{ sortingFieldKey, selectedSortingDirection, toggleSortingColumn: toggleSortingColumn as (key: string | number | symbol) => void }}>
                    <Table
                        isHeaderSticky
                        hideHeader={!records}
                        aria-label="Tabla"
                        classNames={{
                            table: 'h-full overflow-y-scroll bg-white dark:bg-[#1f2f3f]',
                            base: 'h-full',
                            wrapper: 'p-0 rounded-lg bg-transparent h-full rounded-none',
                            th: 'shadow-sm p-0 bg-transparent',
                            tr: 'transition-transform-colors hover:bg-primary-500',
                            td: 'p-0',
                            thead: '*:hover:bg-transparent',
                        }}
                    >
                        <TableHeader columns={viewConfig}>
                            {
                                (column) => (
                                    <TableColumn key={column.name as string}>
                                        <InteractiveColumn<T> table={table} viewConfig={viewConfig} columnKey={column.name} label={column.label} />
                                    </TableColumn>
                                )
                            }
                        </TableHeader>
                        <TableBody isLoading={loading} loadingContent={<Spinner />} items={records} emptyContent={emptyContent}>
                            {
                                (record) => (
                                    <TableRow>
                                        {
                                            (columnKey) => {
                                                return (
                                                    <TableCell className="">
                                                        <div
                                                            className={`${recordPath ? 'cursor-pointer' : ''} flex flex-row items-center px-4 py-2 h-full w-max min-w-full`}
                                                            onClick={() => openRecord(record.id)}
                                                        >
                                                            <RenderCell
                                                                viewConfig={viewConfig}
                                                                columnKey={columnKey as keyof IACele.API.Database.Table[T]}
                                                                record={record}
                                                                table={table}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                )
                                            }
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


