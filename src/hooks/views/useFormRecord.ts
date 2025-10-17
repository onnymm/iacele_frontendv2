import React, { useCallback, useContext, useEffect, useState } from "react";
import APIContext from "../../contexts/apiContext";
import useViewName from "../app/usePageName";
import useRecordId from "./query/useRecordId"
import useReload from "./useReload";
import { useLocation, useNavigate } from "react-router";

const useRecordForm = <M extends ModelName>(
    modelName: M,
): IACele.Hook.View.Form.FormRecord<M> => {

    // Inicialización de estado de carga
    const [ loaded, setLoaded ] = useState<boolean>(false);
    // Inicialización de estado de formulario
    const { formMode, setFormMode } = useFormMode();
    // Inicialización de estado de edición de registro
    const { formRecord, setFormRecord, setFormRecordField } = useEditFormRecord<M>();
    // Obtención de los datos desde la API
    const { recordInDatabase, fieldsMetadata, reload } = useReadFormRecord<M>(modelName, formMode, setFormRecord, setLoaded);
    // Obtención de función para cambiar el formulario a modo de creación
    const { newRecord } = useNewFormRecord<M>(setFormMode, setFormRecord);
    // Obtención de la función de creación de registro
    const { createRecord } = useCreateFormRecord<M>(modelName, formRecord, setFormMode, fieldsMetadata);
    // Obtención de la función de actualización de registro
    const { updateRecord } = useUpdateFormRecord<M>(modelName, formRecord, recordInDatabase, fieldsMetadata, reload);
    // Obtención de estado de cambios
    const { hasChanges } = useCheckRecordChanges<M>(formRecord, recordInDatabase);
    // Obtención de función de deshacer cambio
    const { undoChanges } = useUndoFormChanges<M>(formMode, setFormMode, setFormRecord, recordInDatabase, reload);
    // Obtención de función para eliminar el registro
    const { deleteRecord } = useDeleteFormRecord<M>(modelName, formMode);
    // Obtención de función para guardar registro
    const { saveChanges } = useSaveFormRecord(formMode, createRecord, updateRecord);
    // Ejecución de hook para asignación de nombre a la vista
    useFormName<M>(formMode, recordInDatabase);

    return {
        loaded,
        formMode,
        formRecord,
        setFormRecordField,
        fieldsMetadata,
        reload,
        newRecord: newRecord,
        hasChanges,
        undoChanges,
        saveChanges,
        deleteRecord,
    };
};

export default useRecordForm;

const useNewFormRecord = <M extends ModelName>(
    setFormMode: React.Dispatch<React.SetStateAction<IACele.View.Form.Mode>>,
    setFormRecord: React.Dispatch<React.SetStateAction<Partial<IACele.Data.Models.Record<M>>>>,
): IACele.Hook.View.Form.Callback.NewRecord => {

    // Obtención de función de redireccionamiento
    const navigateTo = useNavigate();
    // Obtención de ruta
    const location = useLocation();

    // Creación de la función para cambiar el modo del formulario
    const newRecord = useCallback(
        () => {
            // Se redirecciona a la ruta sin ID
            navigateTo(location.pathname);
            // Se cambia el modo del formulario
            setFormMode('create');
            // Se vacía el registro del formulario
            setFormRecord({})
        }, [navigateTo, location, setFormMode, setFormRecord]
    );

    return { newRecord };
};

const useDeleteFormRecord = <M extends ModelName>(
    modelName: M,
    formMode: IACele.View.Form.Mode,
): IACele.Hook.View.Form.Callback.DeleteRecord => {

    // Obtención de la ID del registro
    const { recordId } = useRecordId();
    // Obtención de instancia de API
    const { api } = useContext(APIContext);
    // Obtención de función para navegación
    const navigateTo = useNavigate();

    // Inicialización de la función para eliminar el registro
    const deleteRecord = useCallback(
        async () => {

            // Si el formulario está en modo de creación no se ejecuta nada
            if ( formMode === 'create' ) return;

            // Se realiza la eliminación del registro
            await api.form.delete(modelName, recordId);
            // Se redirecciona hacia atrás para eliminar el registro
            navigateTo(-1);
        }, [formMode, api, modelName, recordId, navigateTo]
    );

    return { deleteRecord };
};

const useFormName = <M extends ModelName>(
    formMode: IACele.View.Form.Mode,
    recordInDatabase: IACele.Data.Models.Record<M> | null,
): void => {

    // Obtención de función para establecer el nombre de la vista
    const { setViewName } = useViewName();

    useEffect(
        () => {

            // Si el formulario está en modo de lectura...
            if ( formMode === 'read') {
                if (recordInDatabase !== null) {
                    // Se usa el nombre del registro como título de la vista
                    setViewName(recordInDatabase.name);
                } else {
                    // Se usa el título de "Nuevo" sin guardar en rutas recientes
                    setViewName('Nuevo', false);
                };

            // Si el formulario está en modo de creación...
            } else {
                // Se usa el ´titulo de "Nuevo"
                setViewName('Nuevo')
            };
        }, [formMode, recordInDatabase, setViewName]
    );
};

const useSaveFormRecord = (
    formMode: IACele.View.Form.Mode,
    create: () => Promise<void>,
    update: () => Promise<void>,
): IACele.Hook.View.Form.Callback.SaveRecord => {

    // Creación de la función de guardar (Creación o modificación)
    const saveChanges = useCallback(
        () => {

            // Si el formulario está en modo creación...
            if ( formMode === 'create' ) {
                // Se ejecuta la función de creación
                create();

            // Si el formulario está en modo lectura...
            } else {
                // Se ejecuta la función de modificación de registro
                update();
            };
        }, [formMode, create, update]
    );

    return { saveChanges };
};

const useCheckRecordChanges = <M extends ModelName>(
    formRecord: Partial<IACele.Data.Models.Record<M>>,
    recordInDatabase: IACele.Data.Models.Record<M> | null,
): IACele.Hook.View.Form.HasChanges => {

    // Inicialización del estado de si el registro tiene cambios o no
    const [ hasChanges, setHasChanges ] = useState<boolean>(false);

    // Inicialización de función de comprobación de cambios
    const checkChanges = useCallback(
        () => {

            // Si el registro desde la base de datos es nulo...
            if ( recordInDatabase === null ) return;

            // Se inicia el estado de cambios en falso
            setHasChanges(false);
            // Obtención de los nombres de campos
            const fieldNames = Object.keys(formRecord) as IACele.Data.Models.FieldName<M>[];
            // Se compara cada uno de los valores de los objetos del registro desde la base de datos y los datos del registro en el formulario
            fieldNames.forEach(
                (fieldName) => {
                    // Si los valores de la misma llave son distintos...
                    if ( (formRecord)[fieldName] !== (recordInDatabase)[fieldName] ) {
                        // Se establece el indicador de cambios a verdadero
                        setHasChanges(true);
                    };
                }
            );
        }, [formRecord, recordInDatabase]
    );

    // Se registra un efecto que ejecuta la función de revisión de cambios cada vez que los objetos cambian
    useEffect(
        () => {
            checkChanges();
        }, [formRecord, recordInDatabase, checkChanges]
    );

    return { hasChanges };
};

const useUndoFormChanges = <M extends ModelName>(
    formMode: IACele.View.Form.Mode,
    setFormMode: React.Dispatch<React.SetStateAction<IACele.View.Form.Mode>>,
    setFormRecord: React.Dispatch<React.SetStateAction<Partial<IACele.Data.Models.Record<M>>>>,
    recordInDatabase: IACele.Data.Models.Record<M> | null,
    reload: () => void,
): IACele.Hook.View.Form.Callback.UndoChanges => {

    // Obtención de función de navegación
    const navigateTo = useNavigate();

    // Creación de función para deshacer cambios
    const undoChanges = useCallback(
        () => {

            // Escape de función para evitar advertencias de tipado
            if ( recordInDatabase === null ) return

            // Si el formulario está en modo de creación
            if ( formMode === 'create' ) {
                // Se retrocede una página atrás
                navigateTo(-1);
                // Se establece el formulario en lectura
                setFormMode('read');
                // Se ejecuta una recarga de datos
                reload();

            // Si el formulario está en modo de lectura
            } else {
                // Se restablecen los datos del registro de formulario con los datos del registro en la base de datos
                setFormRecord(recordInDatabase);
            };
        }, [formMode, navigateTo, setFormMode, setFormRecord, recordInDatabase, reload]
    );

    return { undoChanges };
};

const useUpdateFormRecord = <M extends ModelName>(
    modelName: M,
    formRecord: Partial<IACele.Data.Models.Record<M>>,
    recordInDatabase: IACele.Data.Models.Record<M> | null,
    fieldsMetadata: IACele.Data.Models.Field<M>[],
    reload: () => void,
): IACele.Hook.View.Form.Callback.UpdateRecord => {

    // Obtención de la ID del registro
    const { recordId } = useRecordId();
    // Obtención de instancia de API
    const { api } = useContext(APIContext);

    // Inicialización de función de actualización de registro en la base de datos
    const updateRecord = useCallback(
        async () => {
            // Inicialización de datos a ser escritos en el backend
            const dataToWrite: Partial<IACele.Data.Models.Record<M>> = {};
            // Obtención de los nombres de campo del registro
            const fieldNames = Object.keys(formRecord) as IACele.Data.Models.FieldName<M>[];

            // Escape de función para evitar advertencias de tipado
            if ( recordInDatabase === null ) return;

            // Se llena el objeto que se usará para actualizar los datos del registro
            fieldNames.forEach(
                (fieldName) => {
                    if ( formRecord[fieldName] !== (recordInDatabase)[fieldName] ) {
                        // Obtención de los metadatos del campo
                        const fieldMetadata = fieldsMetadata.find( (fieldData) => (fieldData.name === fieldName) ) as IACele.Data.Models.Field<M>;
                        // Si el campo es de tipo Many2One y no es nulo...
                        if ( fieldMetadata.ttype === 'many2one' && formRecord[fieldName] !== null ) {
                            // Se toma como valor de escritura la ID seleccionada
                            dataToWrite[fieldName] = (formRecord[fieldName] as IACele.Data.Models.TType.Many2One<'not_null'>)[0] as Partial<IACele.Data.Models.Record<M>>[keyof IACele.Data.Models.Record<M>];
                        } else {
                            // Se toma el valor sin procesar
                            dataToWrite[fieldName] = formRecord[fieldName];
                        };
                    }
                }
            );

            // Se comprueba que existas cambios a ser realizados
            const existingUpdates = Boolean( Object.keys(dataToWrite).length );

            // Si no hay cambios a realizarse, se finaliza la ejecución
            if ( !existingUpdates ) return;
            // Escritura del registro
            await api.form.update(
                modelName,
                recordId,
                dataToWrite,
            );

            // Se vuelven a cargar los datos para actualizar el registro
            reload();
        }, [modelName, formRecord, recordInDatabase, recordId, api, fieldsMetadata, reload]
    );

    return { updateRecord };
};

const useCreateFormRecord = <M extends ModelName>(
    modelName: M,
    formRecord: Partial<IACele.Data.Models.Record<M>>,
    setFormMode: React.Dispatch<React.SetStateAction<IACele.View.Form.Mode>>,
    fieldsMetadata: IACele.Data.Models.Field<M>[],
): IACele.Hook.View.Form.Callback.CreateRecord => {

    // Obtención de instancia de API
    const { api } = useContext(APIContext);
    // Obtención de función de navegación
    const navigateTo = useNavigate();
    // Obtención de la localización en la aplicación
    const location = useLocation();

    // Inicialización de función de creación de registro en base de datos
    const createRecord = useCallback(
        async () => {
            // Inicialización de datos a ser escritos en el backend
            const dataToWrite: Partial<IACele.Data.Models.Record<M>> = {};
            // Obtención de los nombres de campo del registro
            const fieldNames = Object.keys(formRecord) as IACele.Data.Models.FieldName<M>[];

            // Se llena el objeto que se usará para actualizar los datos del registro
            fieldNames.forEach(
                (fieldName) => {
                    // Obtención de los metadatos del campo
                    const fieldMetadata = fieldsMetadata.find( (fieldData) => (fieldData.name === fieldName) ) as IACele.Data.Models.Field<M>;
                    // Si el campo es de tipo Many2One y no es nulo...
                    if ( fieldMetadata.ttype === 'many2one' && formRecord[fieldName] !== null ) {
                        // Se toma como valor de escritura la ID seleccionada
                        dataToWrite[fieldName] = (formRecord[fieldName] as IACele.Data.Models.TType.Many2One<'not_null'>)[0] as Partial<IACele.Data.Models.Record<M>>[keyof Partial<IACele.Data.Models.Record<M>>];
                    } else {
                        // Se toma el valor sin procesar
                        dataToWrite[fieldName] = formRecord[fieldName];
                    };
                }
            );

            // Obtención de la ID del registro creado
            const recordId = await api.form.create(
                modelName,
                dataToWrite,
            );

            // Redireccionamiento a ID creada
            navigateTo(`${location.pathname}?id=${recordId}`);
            // Se establece el modo de formulario como lectura
            setFormMode('read');

        }, [formRecord, fieldsMetadata, api, modelName, navigateTo, location.pathname, setFormMode]
    );

    return { createRecord };
};

const useEditFormRecord = <M extends ModelName>(): IACele.Hook.View.Form.EditFormRecord<M> => {

    // Inicialización de estado para edición
    const [ formRecord, setFormRecord ] = useState<Partial<IACele.Data.Models.Record<M>>>({});

    // Inicialización de función que cambia valor de un campo de datos del formulario del registro
    const setFormRecordField = useCallback<IACele.View.Form.FieldValueSetter<M>>(
        <F extends IACele.Data.Models.FieldName<M>>(
            name: F,
            value: IACele.Data.Models.FieldValue<M, F>,
        ) => {

            // Se copia el objeto del registro del formulario
            const recordCopy = { ...formRecord };
            // Se establece el nuevo valor
            (recordCopy)[name] = value;
            // Se reasigna el estado
            setFormRecord(recordCopy);
        }, [formRecord]
    );

    return { formRecord, setFormRecord, setFormRecordField };
};

const useReadFormRecord = <M extends ModelName>(
    modelName: M,
    formMode: IACele.View.Form.Mode,
    setFormRecord: React.Dispatch<React.SetStateAction<Partial<IACele.Data.Models.Record<M>>>>,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
): IACele.Hook.View.Form.ReadRecord<M> => {

    // Obtención de la ID del registro
    const { recordId } = useRecordId();
    // Obtención de instancia de API
    const { api } = useContext(APIContext);
    // Inicialización de estado de datos del registro en la base de datos
    const [ recordInDatabase, setRecordInDatabase ] = useState<IACele.Data.Models.Record<M> | null>(null);
    // Inicialización de lista de metadatos de campos del registro
    const [ fieldsMetadata, setFieldsMetadata ] = useState<IACele.Data.Models.Field<M>[]>([]);
    // Obtención de estado y función de recarga
    const { reloadSignal, reload } = useReload();

    // Inicialización de función para lectura de datos
    const read = useCallback(
        async () => {

            // Obtención de los datos desde el backend
            const data = await api.form.read<M>(
                modelName,
                recordId,
            );

            // Se establecen los estados
            setRecordInDatabase(data.record);
            setFieldsMetadata(data.fields);

            // Se establece el estado de carga como terminado
            setLoaded(true);

            // Si el modo de formulario es lectura...
            if ( formMode === 'read' ) {
                // Se establecen los datos del registro en los datos del formulario
                setFormRecord(data.record);
            };
        }, [api, recordId, modelName, setLoaded, formMode, setFormRecord]
    );

    // Se realiza una llamada a la API cada vez que se ejecuta la función de recarga
    useEffect(
        () => {
            read();
        }, [read, reloadSignal]
    );

    return { recordInDatabase, fieldsMetadata, reload };
};

/** 
 *  #### Modo de formulario
 *  Este Custom Hook define el modo del formulario en base a si existe una ID
 *  provista en la URL de la ruta.
 *  Modos disponibles:
 *  - `'create'`: Creación de registro.
 *  - `'read'`: Lectura de registro (Esto puede incluir posibilidad de
 *  modificación y eliminación).
 */ 
const useFormMode = (): IACele.Hook.View.Form.FormMode => {

    // Obtención de la ID del registro
    const { recordId } = useRecordId();
    // Inicialización del estado de modo de formulario
    const [ formMode, setFormMode ] = useState<IACele.View.Form.Mode>(
        () => (
            recordId !== 0
                ? 'read'
                : 'create'
        )
    );

    return { formMode, setFormMode };
};
