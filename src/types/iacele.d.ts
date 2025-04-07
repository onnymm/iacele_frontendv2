// import { SharedSelection } from "@heroui/react";

declare namespace IACele {

    declare namespace Application {

        interface CurrentUserData {
            id: number | undefined;
            user: string;
            name: string;
            odooId: number | undefined;
            createDate: string;
            writeDate: string;
        };
    };

    declare namespace Context {

        interface Token {
            token: string | null;
            setToken: React.Dispatch<React.SetStateAction<string | null>>;
        };

        interface DarkMode {
            darkMode: boolean;
            setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
        };

        interface SidebarDisplay {
            isSidebarLocked: boolean;
            setIsSidebarLocked: React.Dispatch<React.SetStateAction<boolean>>;
            isSidebarOpen: boolean;
            setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
        };

        interface Navbar {
            dynamicControls: React.JSX.Element | null;
            setDynamicControls: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>;
        };

        interface AppContent {
            appContentRef: React.RefObject<HTMLElement | null>;
        };

        interface PageName {
            pageName: string | null;
            setPageName: React.Dispatch<React.SetStateAction<string | null>>;
        };

        interface SortingField {
            sortingFieldKey: string | null;
            selectedSortingDirection: Set<IACele.View.SortingDirectionValue>;
            toggleSortingColumn: (key: string) => void;
        };

        interface AppLoading {
            appLoading: boolean;
            setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
        };

        interface RecordForm {
            tableName: API.Database.TableName;
            record: API.DataTypes.GenericRecord | null;
            formReadonly?: boolean;
        };
    };

    declare namespace UI {

        interface GenericInvolverComponent {
            children: React.ReactNode;
        };

        type SharedSelection = ('all' | Set<string | number>) & {
            anchorKey?: string;
            currentKey?: string;
        };

        // Color de decoración de valor de vista
        type DecorationColor = "default" | "secondary" | "success" | "warning" | "danger" | undefined;

        interface Input {
            value?: string;
            onValueChange?: React.Dispatch<React.SetStateAction<string>>;
        };

        interface CoreInput extends Input {
            name: string; // Nombre del campo en el formulario.
            label: string; // Nombre descriptivo del campo, visible en la interfaz.
            type?: React.InputHTMLAttributes<HTMLInputElement>['type']; // Tipo de campo.
            icon?: React.FC<React.SVGProps<SVGSVGElement>> | SvgIconComponent; // Ícono a renderizar en el campo.
            endContent?: React.ReactNode; // Componente a renderizar en la parte final del campo.
        };

        interface SelectOption {
            key: string;
            label: string;
        };

        interface SelectOptions {
            toggleableKeys: SelectOption[]; // Arreglo de opciones seleccionables
            selectedKeys: Set<string>; // Opciones activas
            setSelectedKeys: (keys: SharedSelection) => void; // Función de cambio de estado de llaves activas
        };

        interface SelectTemplate extends IACele.UI.SelectOptions {
            trigger: React.JSX.Element; // Componente para desplegar el Select
            selectionMode: 'single' | 'multiple'; // Tipo de selección de opciones
        };

        interface Group extends IACele.UI.GenericInvolverComponent {
            label?: string; // Título del grupo.
        }

        interface Field<K extends API.Database.TableName> {
            name: keyof API.DataTypes.TableFieldsProps<K>;
            label?: string;
            readonly?: boolean;
        };
    };

    declare namespace API {

        // Tablas de la base de datos
        declare namespace Database {

            // Tablas
            interface Table {

                'base.users': {
                    id: number;
                    user: string;
                    name: string;
                    odooId: number;
                    active: boolean;
                    password: string;
                    createDate: string;
                    writeDate: string;
                };

                'commissions.line': {
                    id: number;
                    invoiceLineId: number;
                    invoiceId: number;
                    invoiceDate: string;
                    name: string;
                    invoiceOrigin: string;

                    salespersonId: number;
                    businessModel: 'piso' | 'ce';
                    warehouse: 'a1' | 'a2';
                    originModule: 'sale' | 'pos' | 'account';

                    partnerId: number;
                    partnerName: string;
                    productId: number;
                    internalReference: string;
                    productName: string;
                    quantity: number;
                    priceUnit: number;
                    priceSubtotal: number;

                    purchaseId: number;
                    purchaseName: string;
                    vendorId: number;
                    vendorName: string;
                    purchaseDate: string;
                    productCost: number;
                    costSubtotal: number;
                    discount: number;

                    partnerCommission: number;
                    partnerCommissionCost: number;

                    utilitySubtotal: number;
                    totalUtilityPct: number;
                    margin: number;

                    costSubtotalAfterPartnerCommission: number;
                    utilitySubtotalAfterPartnerCommission: number;
                    utilitySubtotalAfterPartnerCommissionPct: number;
                    marginAfterPartnerCommissionPct: number;

                    notes: string;

                    createDate: string;
                    writeDate: string;
                };
            };

            // Nombres de tablas
            type TableName = keyof Table;
        };

        // Tipos de datos
        declare namespace DataTypes {

            // Valor de registro en la base de datos
            type _RecordValue = string | number | string | boolean | null | number[];

            // Objeto de un registro en la base de datos
            type GenericRecord = Record<string, _RecordValue>;

            // Operador de comparación para queries SQL
            type _ComparisonOperator = '=' | '!=' | '>' | '>=' | '<' | '<=' | '><' | 'in' | 'not in' | 'ilike' | 'not ilike' | '~' | '~*';

            // Operador lógico para queries SQL
            type _LogicOperator = '&' | '|';

            // Estructura de tripletas para queries SQL
            type _TripletStructure = [string, _ComparisonOperator, _RecordValue];

            type FieldType = (
                | 'char'
                | 'integer'
                | 'float'
                | 'boolean'
                | 'date'
                | 'datetime'
                | 'time'
                | 'percentage'
                | 'monetary'
            );

            interface FieldProps {
                name: string;
                type: FieldType;
            };

            type TableFieldsProps<T extends IACele.API.Database.TableName> = Record<keyof IACele.API.Database.Table[T], IACele.API.DataTypes.FieldProps>;
        };

        // Peticiones comunes al backend
        declare namespace Request {

            // Petición base
            interface _Base {
                tableName: IACele.API.Database.TableName;
            };

            interface Read extends _Base {
                id: number;
            }

            // Petición de búsqueda y lectura base
            interface _BaseSearchRead extends _Base {
                searchCriteria?: IACele.API.Data.CriteriaStructure;
                fields?: string[];
                sortby?: string | string[];
                ascending?: boolean | boolean[];
            };

            // Petición de búsqueda y lectura
            interface SearchRead extends _BaseSearchRead {
                offset?: number;
                limit?: number;
            };

            // Petición de búsqueda y lectura para vista de tabla
            interface TreeSearchRead extends _BaseSearchRead {
                page?: number;
                itemsPerPage?: number;
            };

            // Petición de actualización de registro
            interface Update extends _Base {
                recordId: number;
                dataToWrite: DataTypes.GenericRecord;
            };
        };

        // Respuestas comunes del backend
        declare namespace Response {

            // Autenticación
            interface Authentication {
                accessToken: string;
                tokenType: 'bearer';
            };

            // Error
            interface Error {
                detail: string;
            };

            // Objetos de registros
            interface Records<T extends DataTypes.GenericRecord> {
                data: T[];
                count: number;
            };

        };

        // Objetos de datos
        declare namespace Data {

            // Estructura de criterio de búsqueda
            type CriteriaStructure = (IACele.API.DataTypes._LogicOperator | IACele.API.DataTypes._TripletStructure)[];
        };
    };

    declare namespace Browser {

        // Valores del almacenamiento local del navegador
        declare namespace LocalStorage {

            // Modo oscuro
            type DarkModeValue = 'false' | 'true' | null;
        };
    };

    declare namespace Core {

        declare namespace Security {

            interface AuthenticationHeaders {
                headers: {
                    accept: string;
                    "Content-Type"?: string;
                    "Authorization"?: string;
                };
            };

            type AuthenticationAction = (
                username: string,
                password: string,
                setError: React.Dispatch<React.SetStateAction<string>>,
            ) => (Promise<void>);
        };

        // Sección de widgets de vista
        declare namespace Widget {

            // Declaración de widget de vista
            interface WidgetDeclaration {
                value: API.DataTypes._RecordValue;
                key: string;
                tableName: IACele.API.Database.TableName;
                record: IACele.View.GenericRecord;
                color: IACele.UI.DecorationColor;
            };

            // Función que recibe declaración widget de vista
            type WidgetConstructor = (config: WidgetDeclaration) => (React.JSX.Element);

            // Destructuración dinámica de la llave de un objeto de registro de base de datos
            interface _KeyDynamicDestructuration {
                [ key: string ]: API.DataTypes._RecordValue;
            };

            // Componente de widget
            type _Widget = React.FC<_KeyDynamicDestructuration>;

            // Función receptora de atributos para ser usados en widget a renderizar
            type PropsReceiverForWidget = (
                (
                    key: string,
                    options: Options,
                    tableName: IACele.API.Database.TableName,
                    id: API.DataTypes.GenericRecord,
                ) => (_Widget)
            );

            interface WidgetPreset {
                chip: PropsReceiverForWidget;
                toggle: PropsReceiverForWidget;
                codeline: PropsReceiverForWidget;
            };

            type WidgetPresetKey = keyof WidgetPreset;

                // Opciones de decoración de valor
            type _DecorationOption = (record: API.DataTypes.GenericRecord) => (boolean);

            // Interfaz de opciones de decoración
            interface Options {
                info?: _DecorationOption;
                success?: _DecorationOption;
                warning?: _DecorationOption;
                danger?: _DecorationOption;
            };

        };

        declare namespace UI {

            interface Form<T extends API.Database.TableName> {
                children: (children: Field.FormChildren<T>) => (React.ReactNode); // Función que renderiza la vista de formulario.
                id: number; // ID del registro a visualizar.
                table: API.Database.TableName; // Nombre de la tabla del registro a visualizar.
                readonly?: boolean; // Vista de solo lectura.
            };

            declare namespace Field {

                // Tipo de dato en campo editable por teclado
                type KeyboardType = 'integer' | 'float' | 'monetary' | 'char' | 'date' | 'percentage';

                // Tipo de dato en todos los campos
                type GenericType = KeyboardType | 'boolean' | 'time' | 'datetime';

                interface Props {
                    name: string;
                    type: IACele.Core.UI.Field.GenericType;
                };

                type FieldNames<T extends IACele.API.Database.TableName> = Record<keyof API.Database.Table[T], Props>;

                type TableFieldNames = {
                    [ K in API.Database.TableName ]: FieldNames<K>
                };

                interface _BaseInput {
                    defaultValue: string; // Valor inicial del campo
                    valueValidation?: (value: string) => (true | null); // Función para validar la entrada de datos en el campo.
                    errorMessage: string; // Mensaje de error a renderizar si la validación no pasa.
                    isInvalid: boolean; // Estado de si el campo contiene datos inválidos.
                    setValue: React.Dispatch<React.SetStateAction<string | null>>; // Manejo de estado para uso en envío de datos en formulario.
                };

                interface KeyboardInput extends _BaseInput {
                    type: KeyboardType; // Tipo de dato a renderizar (solo de tipo de teclado).
                };

                interface GenericInput extends _BaseInput {
                    type: IACele.API.DataTypes.FieldType; // Tipo de dato a renderizar.
                };

                type KeyboardTypeToInput = Record<IACele.Core.UI.Field.KeyboardType, React.InputHTMLAttributes<HTMLInputElement>['type']>

                interface Params<T extends IACele.API.Database.TableName> {
                    name: keyof IACele.API.Database.Table[T]
                    readonly?: boolean;
                };

                interface FormChildren<T extends API.Database.TableName> {
                    Page: React.FC<{ children: React.ReactNode }>;
                    Header: React.FC<{ children: React.ReactNode }>;
                    Sheet: React.FC<{ children: React.ReactNode }>;
                    Field: React.FC<Params<T>>;
                    Group: React.FC<UI.Group>;
                };

            };

        };

    };

    // Vista de datos
    declare namespace View {

        type SortingDirectionValue = 'asc' | 'desc';

        // Interfaz dinámica que usa los atributos de un registro individual
        type ComponentProps<T extends API.DataTypes.GenericRecord> = Partial<Record<keyof T, API.DataTypes._RecordValue>>;

        // Vista de tabla
        declare namespace List {
            // Componente que renderiza uno o más atributos de un registro en una vista de tabla o kanban
            type _ColumnComponent<T extends API.DataTypes.GenericRecord> = ( (config: ComponentProps<T>) => (React.JSX.Element | undefined) );

            // Configuración de renderización de una columna y sus valores en la vista
            interface _TableColumnConfig<T extends API.DataTypes.GenericRecord> {
                key: keyof T;
                label: string;
                component?: _ColumnComponent<T> | keyof WidgetPreset;
                options?: Core.Widget.Options;
                visible?: boolean;
                canSort?: boolean;
            };

            // Configuración de vista de tabla
            type ViewConfig<T extends API.DataTypes.GenericRecord> = _TableColumnConfig<T>[];

            // Interfaz de componente de vista de tabla
            interface _DynamicParams<T extends API.DataTypes.GenericRecord> {
                tableName: IACele.API.Database.TableName;
                viewConfig: ViewConfig<T>;
                emptyContent: string;
            };

            // Componente de vista de tabla
            type Params = <T extends API.DataTypes.GenericRecord>(config: _DynamicParams<T>) => (React.JSX.Element);

            interface TableCell {
                columns: ViewConfig<API.DataTypes.GenericRecord>; // Configuración de columnas.
                columnKey: string; // Llave de columna actual.
                record: API.DataTypes.GenericRecord; // Objeto que contiene los datos de un registro de la base de datos.
                tableName: API.Database.TableName; // Nombre de la tabla de donde se obtienen los datos.
            };

            interface InteractiveColumn {
                viewConfig: IACele.View.List.ViewConfig<IACele.API.DataTypes.GenericRecord>; // Configuración de columnas.
                columnKey: string; // Llave de columna actual.
                label: string; // Nombre visible de la columna.
                ascendingDirection: Set<SortingDirectionValue>; // Conjunto que contiene la dirección de ordenamiento.
            };

            interface SortingIndicator {
                direction: Set<SortingDirectionValue>; // Conjunto que contiene la dirección de ordenamiento.
            };
        };
    };
};
