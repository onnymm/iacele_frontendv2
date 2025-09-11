import { useCallback, useContext, useMemo, useState } from "react";
import FormTreeContext from "../../../../contexts/view/form/FormTreeContext";

const useTreeRecords = <
    M extends ModelName,
    F extends IACeleV2.Data.Models.FieldName<M>,
    R extends IACeleV2.Data.Models.RelatedModelName<M, F>,
>(
    records: IACeleV2.Data.Models.Record<R>[],
    fields: IACeleV2.Data.Models.Field<R>[],
): IACeleV2.Hook.View.Form.TreeRecords<M, F, R> => {

    // Obtención de valor desde el contexto
    const { treeConfig } = useContext<IACeleV2.Context.View.FormTree<M, F, R>>(FormTreeContext);

    // Inicialización de índice de registros
    const [ treeRecordsIndex, setTreeRecordsIndex ] = useState<Record<number, IACeleV2.Data.Models.Record<R>>>(
        () => {
            const index: Record<number, IACeleV2.Data.Models.Record<R>> = {};
            records.forEach(
                (record) => {
                    index[record.id] = { ...record };
                }
            );
            return index;
        }
    );

    // Inicialización de índice de campos
    const fieldsIndex = useMemo(
        () => {
            const index: Partial<Record<IACeleV2.Data.Models.FieldName<R>, IACeleV2.Data.Models.Field<R>>> = {};
            fields.forEach(
                (field) => {
                    index[field.name] = field;
                }
            )
            return index as Record<IACeleV2.Data.Models.FieldName<R>, IACeleV2.Data.Models.Field<R>>
        }, [fields]
    );

    // Inicialización de función de obtención de tipo de dato de campo.
    const getTType = useCallback(
        (name: IACeleV2.Data.Models.FieldName<R>) => {
            // Obtención del tipo de dato
            const ttype = fieldsIndex[name].ttype;

            return ttype;
        }, [fieldsIndex]
    );

    // Inicialización de función de cómputo de etiqueta de campo
    const computeLabel = useCallback(
        (name: IACeleV2.Data.Models.FieldName<R>) => {
            // Obtención de los datos de configuración de vista
            const config = treeConfig.find( (c) => (c.name === name) ) as IACeleV2.View.Form.Field.Tree.Config<R>;
            // Obtención de etiqueta de campo
            const fieldLabel = config.label
            // Selección de la etiqueta final
            const computedLabel = fieldLabel ?? fieldsIndex[name].label;

            return computedLabel;
        }, [fieldsIndex, treeConfig]
    );

    // Inicialización de función de creación de función de modificación de registro de vista de árbol
    const createSetFormRecordField = useCallback(
        (id: number) => {
            // Inicialización de función de modificación de registro
            const callback: IACeleV2.View.Form.FieldValueSetter<M> = <L extends IACeleV2.Data.Models.FieldName<M>>(
                name: IACeleV2.Data.Models.FieldName<M>,
                value: IACeleV2.Data.Models.Record<M>[L],
            ) => {

                // Se copia el objeto del registro del formulario
                const recordCopy: Record<number, IACeleV2.Data.Models.Record<R>> = {};
                Object.keys(treeRecordsIndex).forEach(
                    (id) => {
                        recordCopy[Number(id)] = { ...treeRecordsIndex[Number(id)] }
                    }
                );
                // Se establece el nuevo valor
                ( recordCopy[id][name as never] as IACeleV2.Data.Models.Record<M>[L] ) = value;
                setTreeRecordsIndex(recordCopy);
            };

            return callback;
        }, [treeRecordsIndex]
    );

    return { getTType, computeLabel, treeRecordsIndex, createSetFormRecordField };
};

export default useTreeRecords;
