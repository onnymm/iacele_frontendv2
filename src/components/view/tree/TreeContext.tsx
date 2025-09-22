import { useContext } from "react";
import TreeContext from "../../../contexts/view/tree/TreeContext";
import useTreeRecords from "../../../hooks/views/tree/useTreeRecords";
import useOpenRecord from "../../../hooks/views/tree/useOpenRecord";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import WidgetHub from "../widget/WidgetHub";
import RecordFormContext from "../../../contexts/view/form/RecordFormContext";
import FieldContext from "../../../contexts/view/form/FieldContext";

const TreeContent = <M extends ModelName>() => {

    // Obtención de valores desde el contexto
    const { config, open, metadataFromAPI, modelName, dataLoaded } = useContext(TreeContext as React.Context<IACele.Context.View.List.Tree<M>>);
    // Obtención de valores para renderización de datos
    const { treeRecordsIndex, getTType, computeLabel, executeValidation } = useTreeRecords<M>();
    // Obtención de función para abrir registro
    const { openRecord } = useOpenRecord<M>();

    // Si no se han cargado los datos se termina la ejecución
    if ( !dataLoaded ) return null;

    return (
        <div className="md:col-span-2 group-[.ui-group]:pt-1 w-full">
            <Table
                isHeaderSticky
                aria-label={modelName}
                removeWrapper
                classNames={{
                    base: 'dark:bg-[#1f2f3f]/50 size-full overflow-scroll',
                    wrapper: 'p-0 shadow-none ui-table group pb-1 border-gray-500/50 h-max rounded-lg bg-transparent rounded-none',
                    table: 'p-0',
                    th: 'p-0 dark:bg-[#101b26] bg-slate-100 px-2 last:pr-4 !rounded-none transition-colors first:pl-4 dark:hover:bg-transparent',
                    tr: `${open ? 'cursor-pointer' : ''} transition-transform-colors dark:bg-[#1f2f3f] dark:even:bg-[#1f2f3f]/20 even:brightness-90a hover:bg-primary-500/50 dark:hover:bg-primary-500/50`,
                    td: 'px-0 py-1',
                    thead: '[&>tr:last-child]:!hidden bg-[#1f2f3f]',
                }}
            >
                <TableHeader
                    columns={
                        config.map(
                            (c) => ({ ...c, key: c.name })
                        )
                    }
                >
                    {(config) => {

                        // Obtención del nombre de la columna
                        const columnName = (
                            metadataFromAPI.find(
                                (d) => (d.name === config.name)
                            )?.name as IACele.Data.Models.FieldName<M>
                        );

                        // Cómputo de etiqueta de la columna
                        const columnLabel = computeLabel(columnName);

                        return (
                            <TableColumn key={config.key as string} >
                                {columnLabel}
                            </TableColumn>
                        );
                    }}
                </TableHeader>
                <TableBody items={Object.keys(treeRecordsIndex).map((id) => (treeRecordsIndex[Number(id)]))}>
                    {(record) => {
                        return (
                            <TableRow key={record.id} onClick={() => {openRecord(record.id)}}>
                                {(columnKey) => {

                                    // Obtención del tipo de dato
                                    const ttype = getTType(columnKey as IACele.Data.Models.FieldName<M>);
                                    // Obtención del widget a usar
                                    const Widget = WidgetHub[ttype as 'char'];
                                    
                                    // Obtención del color computado de la celda
                                    const { computedDecorationColor } = executeValidation(config.find( (c) => (c.name === columnKey) ) as IACele.View.List.Tree.Config<M>, record.id)

                                    return (
                                        <TableCell className="px-2 last:pr-4 first:pl-4 h-8">
                                            <RecordFormContext.Provider
                                                value={{
                                                    fieldsMetadata: metadataFromAPI,
                                                    formMode: 'read',
                                                    formRecord: treeRecordsIndex[record.id],
                                                    reload: () => (null),
                                                    saveChanges: () => (null),
                                                    setFormRecordField: () => (null),
                                                    readonly: true,
                                                    modelName,
                                                }}
                                            >
                                            <FieldContext.Provider
                                                value={{
                                                    computedDecorationColor: computedDecorationColor,
                                                    computedLabel: '',
                                                    computedReadonly: true,
                                                    domain: [],
                                                    name: columnKey,
                                                    ttype: ttype,
                                                }}
                                            >
                                                <Widget />
                                            </FieldContext.Provider>
                                            </RecordFormContext.Provider>
                                        </TableCell>
                                    );
                                }}
                            </TableRow>
                        )
                    }}
                </TableBody>
            </Table>
        </div>
    )
};

export default TreeContent;
