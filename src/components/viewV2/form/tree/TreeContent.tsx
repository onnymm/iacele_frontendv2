import { useContext } from "react";
import FormTreeContext from "../../../../contexts/view/form/FormTreeContext";
import useTreeRecords from "../../../../hooks/views/form/tree/useTreeRecords";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import Widgets from "../../Widgets";
import RecordFormContext from "../../../../contexts/view/form/RecordFormContext";
import FieldContext from "../../../../contexts/view/form/FieldContext";

const TreeContent = <
    K extends ModelName,
    F extends IACeleV2.Data.Models.FieldName<K>,
    R extends IACeleV2.Data.Models.RelatedModelName<K, F>,
>() => {

    // Obtención de valores desde el contexto
    const { fields, name, records, treeConfig, modelName } = useContext<IACeleV2.Context.View.FormTree<K, F, R>>(FormTreeContext);
    // Obtención de valores para renderización de datos
    const { computeLabel, getTType, createSetFormRecordField, treeRecordsIndex } = useTreeRecords<K, F, R>(records, fields);

    return (
        <div className="md:col-span-2 group-[.ui-group]:pt-1">
            <Table
                aria-label={name as string}
                classNames={{
                    base: 'dark:bg-[#1f2f3f]',
                    wrapper: 'p-0 shadow-none ui-table group pb-1 border-gray-500/50 h-max rounded-lg bg-transparent rounded-none',
                    table: 'p-0',
                    th: 'p-0 dark:bg-[#101b26]/60 bg-slate-100 px-2 last:pr-4 !rounded-none first:pl-4',
                    tr: 'transition-transform-colors dark:bg-[#1f2f3f] even:brightness-90 hover:bg-primary-500',
                    td: 'p-0',
                    thead: '*:hover:bg-transparent',
                }}
            >
                <TableHeader
                    columns={
                        treeConfig.map(
                            (config) => ({ ...config, key: config.name })
                        )
                    }
                >
                    {(config) => {

                        // Obtención del nombre de la columna
                        const columnName = (
                            fields.find(
                                (d) => (d.name === config.name)
                            )?.name as IACeleV2.Data.Models.FieldName<R>
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
                        <TableRow key={record.id}>
                            {(columnKey) => {

                                // Obtención del tipo de dato
                                const ttype = getTType(columnKey as IACeleV2.Data.Models.FieldName<R>);
                                // Obtención del widget a usar
                                const Widget = Widgets[ttype as 'char'];

                                return (
                                    <TableCell className="px-2 last:pr-4 first:pl-4 h-8">
                                        <RecordFormContext.Provider
                                            value={{
                                                fieldsMetadata: fields,
                                                formMode: 'read',
                                                formRecord: treeRecordsIndex[record.id],
                                                reload: () => null,
                                                saveChanges: () => null,
                                                setFormRecordField: createSetFormRecordField(record.id),
                                                readonly: true,
                                                modelName,
                                        }}>
                                        <FieldContext.Provider value={{ computedDecorationColor: 'default', computedLabel: '', computedReadonly: true, domain: [], name: columnKey, ttype }}>
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
    );
};

export default TreeContent;
