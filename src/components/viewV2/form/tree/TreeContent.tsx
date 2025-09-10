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
        <div className="md:col-span-2">
            <Table
                aria-label={name as string}
                classNames={{
                    base: 'dark:bg-[#1f2f3f]',
                    wrapper: 'p-0 shadow-none ui-table group py-1 border-gray-500/50 h-max rounded-lg bg-transparent rounded-none',
                    table: 'p-0',
                    th: 'p-0 bg-transparent',
                    tr: 'transition-transform-colors dark:bg-[#1f2f3f] even:brightness-90 hover:bg-primary-500',
                    td: 'p-0',
                    thead: '*:hover:bg-transparent',
                }}
            >
                <TableHeader columns={treeConfig.map((v) => ({ ...v, key: v.name }))}>
                    {(config) => {
                        const columnName = fields.find( (d) => (d.name === config.name) )?.name as IACeleV2.Data.Models.FieldName<R>;
                        return (
                            <TableColumn
                                className="px-2 last:pr-4 first:pl-4"
                                key={config.key as never}
                                >
                                {computeLabel(columnName)}
                            </TableColumn>
                        );
                    }}
                </TableHeader>
                <TableBody items={Object.keys(treeRecordsIndex).map((id) => (treeRecordsIndex[Number(id)]))}>
                    {(record) => {
                        return (
                        <TableRow key={record.id}>
                            {(columnKey) => {
                                // const value = record[columnKey as never];
                                const ttype = getTType(columnKey as IACeleV2.Data.Models.FieldName<R>);
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
