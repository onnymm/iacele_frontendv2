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

    /** 
     *  ### UI
     *  Tipos de dato relacionados a la interfaz de usuario de iaCele.
     */ 
    declare namespace UI {

        // Valor para uso de funciones de cambio de estado que usan conjuntos
        type _SharedSelection = ('all' | Set<string | number>) & {
            anchorKey?: string;
            currentKey?: string;
        };

        /** 
         *  ### Componente genérico con componentes hijos
         *  En este tipo de componente se incluyen componentes hijos entre sus
         *  etiquetas TSX de apertura y cierre.
         */ 
        interface GenericInvolverComponent {
            /** 
             *  ### Componentes hijos
             *  Componentes hijos que se ingresan entre las etiquetas del componente que
             *  los renderizará.
             */ 
            children: React.ReactNode;
        };

        /** 
         *  ### Color de decoración
         *  Color de decoración de de componente/widget en base a su valor.
         */ 
        type DecorationColor = "default" | "secondary" | "success" | "warning" | "danger" | undefined;

        interface Input {
            value?: string;
            onValueChange?: React.Dispatch<React.SetStateAction<string>>;
        }

        // Uso para componentes de input en inicio de sesión
        interface CoreInput extends Input {
            name: string; // Nombre del campo en el formulario.
            label: string; // Nombre descriptivo del campo, visible en la interfaz.
            type?: React.InputHTMLAttributes<HTMLInputElement>['type']; // Tipo de campo.
            icon?: React.FC<React.SVGProps<SVGSVGElement>> | SvgIconComponent; // Ícono a renderizar en el campo.
            endContent?: React.ReactNode; // Componente a renderizar en la parte final del campo.
        };

        interface SelectOption {
            /** 
             *  ### Llave de opción
             *  Llave única de la opción actual
             */ 
            name: string;
            /** 
             *  ### Leyenda de opción
             *  Esta leyenda muestra el nombre o descripción de la opción actual.
             */ 
            label: string;
        };

        interface SelectOptions {
            /** 
             *  ### Opciones disponibles
             *  Arreglo que contiene todas las opciones disponibles y que renderiza en la
             *  lista de opciones.
             */ 
            toggleableKeys: SelectOption[];
            /** ### Opciones seleccionadas
             *  Arreglo que contiene todas las opciones seleccionadas/activas.
             */ 
            selectedKeys: Set<string>;
            /** 
             *  ### Manejo de estado de opciones seleccionadas
             *  Esta función realiza la activación o desactivación decolumnas.
             */ 
            setSelectedKeys: (keys: _SharedSelection) => void;
        };

        interface SelectTemplate extends IACele.UI.SelectOptions {
            /** 
             *  ### Trigger
             *  Componente que renderizará las opciones.
             */ 
            trigger: React.JSX.Element; // Componente para desplegar el Select
            /** 
             *  ### Modo de selección
             *  Modo de selección de opciones: Sencillo o múltiple.
             */ 
            selectionMode: 'single' | 'multiple'; // Tipo de selección de opciones
        };

        interface Group extends IACele.UI.GenericInvolverComponent {
            /** 
             *  ### Título
             *  Título o encabezado que aparece como nombre del grupo.
             */ 
            label?: string;
        }

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
            interface _BaseSearchRead <T extends IACele.API.Database.TableName> extends _Base {
                searchCriteria?: IACele.API.Data.CriteriaStructure;
                fields?: (keyof IACele.API.Database.Table[T])[];
                sortby?: keyof IACele.API.Database.Table[T] | (keyof IACele.API.Database.Table[T])[];
                ascending?: boolean | boolean[];
            };

            // Petición de búsqueda y lectura
            interface SearchRead <T extends IACele.API.Database.TableName> extends _BaseSearchRead<T> {
                offset?: number;
                limit?: number;
            };

            // Petición de búsqueda y lectura para vista de tabla
            interface TreeSearchRead <T extends IACele.API.Database.TableName> extends _BaseSearchRead<T> {
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

                interface KanbanParams<T extends IACele.API.Database.TableName> extends Params<T>  {
                    widget?: IACele.Core.Widget.WidgetPresetKey;
                    label?: string | boolean;
                }

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

    // Vistas de datos
    declare namespace View {

        // Valores de dirección de ordenamiento
        type _SortingDirectionValue = 'asc' | 'desc';

        // Tipo de dato de dirección de ordenamiento
        type _SortingDirection = Set<_SortingDirectionValue>

        // Interfaz de uso de tabla de base de datos
        interface _TableUse <T extends API.Database.TableName> {
            /** 
             *  ### Tabla de base de datos
             *  Nombre de tabla de base de datos.
             */ 
            table: T; // Nombre de la tabla de base de datos para extraer los nombres de los campos.
        };

        // Interfaz de componente que usa muchos registros
        interface _ManyRecordsUse {
            /** 
             *  ### Leyenda de contenido vacío
             *  Aquí se declara una leyenda que se muestra en las vistas de árbol y kanban
             *  cuando no existen registros a mostrar.
             */ 
            emptyContent: string; // Leyenda para mostrar cuando no existan datos a mostrar.
        };

        interface _Open {
            /** 
             *  ### Abrir en
             *  Path de redirección para mostrar el detalle del registro.
             */ 
            open?: string;
        }

        // Unión de interfaces que usan tabla de base de datos y usan muchos registros.
        type _TableUseAndManyRecordsRenderer<T extends API.Database.TableName> = _TableUse<T> & _ManyRecordsUse & _Open;

        /** 
         *  ### Registro en base de datos
         *  Este objeto es la declaración de propiedades de un registro de una tabla
         *  dinámica de base de datos.
         */ 
        type RecordInDatabase<T extends API.Database.TableName> = API.Database.Table[T]

        interface _ViewField <T extends API.Database.TableName>{
            /** 
             *  ### Nombre de campo
             *  Nombre en base de datos del campo de la tabla de base de datos a mostrar.
             */ 
            name: keyof RecordInDatabase<T>;
        }

        interface RecordUse<T extends API.Database.TableName> {
            /** 
             *  ### Registro de tabla de base de datos
             *  Registro de la base de datos del que se tomarán valores para renderizar
             *  un componente.
             */ 
            record: RecordInDatabase<T>;
        };

        // Variación del tipo _TableUse para permitir valores nulos
        interface _OptionalTableUse <T extends API.Database.TableName> extends _TableUse<T>{
            table?: T;
        }

        // Tipo de dato para renderizar
        type DataType = (
            | 'char'
            | 'date'
            | 'float'
            | 'integer'
            | 'monetary'
            | 'percentage'
        )

        // TIPOS E INTERFACES USADOS POR COMPONENTES
        // --------------------------------------------------------------------

        interface SortingIndicator {
            /** 
             *  ### Dirección de ordenamiento de datos
             *  Conjunto que contiene la dirección de ordenamiento.
             */ 
            direction: _SortingDirection; // Conjunto que contiene la dirección de ordenamiento.
        };

        // Parámetros comunes de campo
        interface FieldCommon {
            /** 
             *  ### Nombre personalizado de campo
             *  Nombre explícito de la columna en caso de querer reemplazar su nombre
             *  prestablecido.
             */ 
            label?: string; // Nombre explícito de la columna en caso de querer reemplazar su nombre prestablecido.
        };

        declare namespace Data {

            // Tipo de dato modificable por medio de teclado
            type KeyboardType = (
                | 'char'
                | 'date'
                | 'float'
                | 'integer'
                | 'monetary'
                | 'percentage'
            );

            // Tipo de dato genérico
            type GenericType = (
                | KeyboardType
                | 'boolean'
                | 'time'
                | 'datetime'
            );

            // Mapa de tipos de dato de la aplicación a input de HeroUI
            type KeyboardTypeToInput = Record<IACele.Core.UI.Field.KeyboardType, React.InputHTMLAttributes<HTMLInputElement>['type']>
        };

        // Vista de árbol, interfaces y tipos relacionados
        declare namespace Tree {

            // Configuración de columnas de tabla
            type ViewConfig <T extends API.Database.TableName> = Field<T>[];

            // Unión de interfaces de uso de nombre y de título de campo
            type _FieldDeclaration<T extends API.Database.TableName> = _ViewField<T> & FieldCommon

            // Parámetros columnes de columna individual
            interface _IndividualColumnCommon <T extends API.Database.TableName>{
                /** 
                 *  ### Llave de campo
                 *  Llave del campo de la tabla de base de datos a renderizar como columna.
                 */ 
                columnKey: keyof RecordInDatabase<T>;
            };

            // Parámetros comunes en interfaces
            interface _Common <T extends API.Database.TableName> extends _TableUse<T> {
                /** 
                 *  ### Configuración de vista de tabla
                 *  Objeto que define las propiedades de cada una de las columnas. Los
                 *  atributos aquí declarados se encuentran en la interfaz {@link Tree.Field Field}.
                 */ 
                viewConfig: ViewConfig<T>; // Configuración de vista de columnas de la tabla.
            };

            // Unión de parámetros comunes y de columna individual
            type _IndividualColumnAndCommonParams<T extends API.Database.TableName> = RecordUse<T> & _IndividualColumnCommon<T> & _Common<T>;

            // Componentes hijos de la vista
            interface _Children <T extends API.Database.TableName>{
                /** 
                 *  ### Columna de árbol
                 *  Este componente declara las propiedades de una columna de la vista de
                 *  árbol del componente {@link Component Tree}.
                 */ 
                Field: React.FC<Field<T>>;
                /** 
                 *  ### Página de árbol
                 *  Este componente no renderiza nada por sí solo pero ayuda a contener las
                 *  declaraciones de propiedades de columna del componente {@link Field}
                 *  dentro de éste y mantener la sintáxis TSX válida.
                 */ 
                Page: React.FC<UI.GenericInvolverComponent>;
            };

            interface _SortingFields <T extends API.Database.TableName>{
                /** 
                 *  ### Dirección de ordenamiento de datos
                 *  Conjunto que contiene el valor de dirección de ordenamiento de datos.
                 */ 
                selectedSortingDirection: _SortingDirection;
                /** 
                 *  ### Columna de ordenamiento de datos
                 *  Llave que indica el campo por el cual los datos están siendo ordenados
                 *  actualmente.
                 */ 
                sortingFieldKey: keyof RecordInDatabase<T> | null;
                /** 
                 *  ### Selección de columna para ordenar datos
                 *  Función para establecer el campo de ordenamiento.
                 */ 
                toggleSortingColumn: (key: keyof RecordInDatabase<T>) => (void);
            }

            // TIPOS E INTERFACES USADOS POR COMPONENTES
            // ----------------------------------------------------------------

            // Parámetros de componente que obtiene datos de registros desde el backend
            type ListRendererAndCommon<T extends API.Database.TableName> = _Common<T> & _ManyRecordsUse;

            // Unión de parámetros de componente que obtiene datos de registros desde el backend y ordena datos
            type _DataSorter<T extends API.Database.TableName> = ListRendererAndCommon<T> & _SortingFields<T>

            // Parámetros de entrada de columna de tabla
            type InteractiveColumn<T extends API.Database.TableName> = _Common<T> & FieldCommon & _IndividualColumnCommon<T>;

            // Parámetros de campo de tabla
            interface Field <T extends API.Database.TableName> extends _FieldDeclaration<T> {
                /** 
                 *  ### Widget para renderización de celda
                 *  Widget prestablecido o personalizado a usar para renderizar el valor
                 *  del registro en una tabla de base de datos.
                 */ 
                widget?: keyof Widget.Presets<T> | ((props: RecordInDatabase<T>) => (boolean));
                /** 
                 *  ### Opciones de color
                 *  Objeto de funciones que colorean un widget en base a los valores de un
                 *  registro de base de datos
                 */ 
                colorDecoration?: Widget.Decoration<T>;
                /** 
                 *  ### Visibilidad inicial de columna
                 *  Propiedad que indica la visibilidad inicial de la columna Si este valor
                 *  es diferente de `undefined` la columna podrá mostrarse y ocultarse.
                 */ 
                visible?: boolean;
                /** 
                 *  ### Puede ordenar datos
                 *  Esta propiedad indica si la columna puede o no ordenar datos en base a
                 *  sus valores.
                 */ 
                canSort?: boolean;
            };

            // Parámetros de renderizador de celda de tabla
            type CellRender <T extends API.Database.TableName> = _IndividualColumnAndCommonParams<T>;

            // Parámetros de vista de tabla
            interface Component <T extends API.Database.TableName> extends _DataSorter<T> {
                /** 
                 *  ### Estado de carga
                 *  Estado que indica que los datos se están cargando.
                 */ 
                loading: boolean; // Estado de carga.
                /** 
                 *  ### Registros de base de datos
                 *  En este estado se almacena la información obtenida desde el servidor.
                 */ 
                records: RecordInDatabase<T>[]; // Datos a mostrar.
            };

            // Función que renderiza los componentes hijos
            interface ChildrenRender <T extends API.Database.TableName>{
                /** 
                 *  ### Declaración de vista de árbol
                 *  Función utilizada para el encapsulamiento de componentes que se
                 *  utilizan en la construcción de la vista de árbol.
                 */ 
                children: ({ Field, Page }: _Children<T>) => React.ReactNode;
            };

        };

        // Vista de lista, interfaces y tipos relacionados
        declare namespace List {

            // Componentes hijos de la vista
            interface _Children<T extends IACele.API.Database.TableName>{
                /** 
                 *  ### Vista de árbol
                 *  Este componente se utiliza para declarar la estructura de una vista de
                 *  árbol usando una función flecha como `children`.
                 */ 
                Tree: React.FC<Tree.ChildrenRender<T>>;
            };

            // TIPOS E INTERFACES USADOS POR COMPONENTES
            // ----------------------------------------------------------------

            // Parámetros de la vista de lista
            interface Component <T extends API.Database.TableName> extends _TableUseAndManyRecordsRenderer<T> {
                /** 
                 *  ### Declaración de vistas de árbol y kanban
                 *  Función utilizada para el encapsulamiento de componentes que se
                 *  utilizan en la construcción de las vistas de árbol y kanban
                 */ 
                children: ({ Tree }: _Children<T>) => (React.ReactNode);
            };

        };

        declare namespace Kanban {

            interface Children <T extends IACele.API.Database.TableName>{
                Card: React.FC<UI.GenericInvolverComponent>;
                Section: React.FC<UI.GenericInvolverComponent>;
                Field: React.FC<IACele.Core.UI.Field.KanbanParams<T>>;
            };

            type RenderChildren<T extends IACele.API.Database.TableName> = (children: Kanban.Children<T>) => React.ReactNode;
        };

        declare namespace Form {

            // Solo lectura
            interface _ReadOnly {
                /** 
                 *  ### Estado de solo lectura
                 *  Propiedad que restringe el documento a ser de solo lectura.
                 */ 
                readonly?: boolean;
            };

            // Interfaz del componente de campo de formulario
            type Field<T extends IACele.API.Database.TableName> = View._ViewField<T> & FieldCommon & _ReadOnly;

            // Atributos base de componente de formulario
            type _BaseComponent<T extends IACele.API.Database.TableName> = View._TableUse<T> & _ReadOnly;

            // Componentes hijos de la vista de formulario
            interface _Children<T extends IACele.API.Database.TableName> {
                /** 
                 *  ### Página de vista
                 *  Este componente envuelve los componentes {@link Header} {@link Sheet}
                 *  conforman el esqueleto principal de la vista de formulario.
                 */ 
                Page: React.FC<UI.GenericInvolverComponent>;
                /** 
                 *  ### Encabezado de formulario
                 *  En este componente se renderizan botones de acciones que varían en base
                 *  a la tabla del registro mostrado en la vista de formulario.
                 */ 
                Header: React.FC<UI.GenericInvolverComponent>;
                /** 
                 *  ### Hoja de formulario
                 *  En este componente se renderiza la vista de los atributos del registro
                 *  a mostrar en el formulario, usando los componentes {@link Group} y
                 *  {@link FieldParams}.
                 */ 
                Sheet: React.FC<UI.GenericInvolverComponent>;
                /** 
                 *  ### Grupo de campos en formulario
                 *  Este componente renderiza un grupo para reunir campos de la vista.
                 */ 
                Group: React.FC<UI.Group>;
                /** 
                 *  ### Campo de formulario
                 *  Este componente renderiza un campo que muestra el valor de un campo de
                 *  un registro de tabla de base de datos.
                 */ 
                Field: React.FC<Field<T>>;
            };

            interface Component<T extends IACele.API.Database.TableName> extends _BaseComponent<T> {
                /** 
                 *  ## Declaración de vista de formulario
                 *  Función utilizada para el encapsulamiento de componentes que se
                 *  utilizan en la construcción de la vista de formulario.
                 */ 
                children: ({ Page, Header, Sheet, Group, Field }: _Children<T>) => (React.ReactNode);
            };

            declare namespace FieldParams {

                // Unión de uso de nombre de campo y datos de registro de base de datos
                type RecordRender<T extends IACele.API.Database.TableName> = View._ViewField<T> & View.RecordUse<T>

                // Extensión de parámetros de campo de formulario
                interface Generic<T extends IACele.API.Database.TableName> extends RecordRender<T> {
                    /** 
                     *  ### Validación de valor entrante
                     *  Función que valida si el valor ingresado por el usuario es válido
                     *  para el campo.
                     */ 
                    valueValidation?: (value: string) => (true | null);
                    /** 
                     *  ### Mensaje de error
                     *  Mensaje que indica la razón del error cuando la función de
                     *  validación no acepta el valor entrante en el campo.
                     */ 
                    errorMessage: string;
                    /** 
                     *  ### Es inválido
                     *  Valor que indica el estado del campo
                     */ 
                    isInvalid: boolean;
                    /** 
                     *  ### Cambio de valor
                     *  Función de cambio de estado para manejar los cambios del valor
                     *  ingresado a un campo de teclado.
                     */ 
                    setValue: React.Dispatch<React.SetStateAction<string | null>>;
                    /** 
                     *  ### Solo lectura
                     *  Valor que indica que un campo es de solo de lectura
                     */ 
                    readonly: boolean;
                };

                // Interfaz de atributos comunes de input de formulario
                interface _BaseInput<T extends IACele.API.Database.TableName> extends Generic<T>{
                    /** 
                     *  ### Tipo de dato de valor
                     *  Propiedad que indica el tipo de dato del valor a renderizar.
                     */ 
                    type: Data.KeyboardType;
                }

                // Input genérico
                interface GenericInput<T extends IACele.API.Database.TableName> extends _BaseInput<T> {
                    type: Data.GenericType;
                };

                // Input manipulable por teclado
                interface KeyboardInput<T extends IACele.API.Database.TableName> extends _BaseInput<T> {
                    type: Data.KeyboardType;
                };
            };

        }

        declare namespace Widget {

            // Destructuración dinámica de la llave de un objeto de registro en base de datos
            interface _PropDynamicDestructuration {
                [ prop: string ]: API.DataTypes._RecordValue;
            };

            // Declaración de widget
            interface Declaration <T extends API.Database.TableName>{
                table: T;
                record: API.Database.Table[T]
                defaultValue: API.DataTypes._RecordValue;
                defaultProp: string;
                color: UI.DecorationColor;
            };

            // Componente de widget
            type Callback = React.FC<_PropDynamicDestructuration>;

            // Renderizador de widget dinámico
            type Component<T extends API.Database.TableName> = (props: Declaration<T>) => React.ReactNode;

            // Definición de color de un widget en base a una validación de un argumento o sus atributos entrantes
            type _DecorationTrigger<T> = (props: T) => (boolean);

            // Interfaz para colorear un widget en base a validaciones de un argumento o sus atributos entrantes
            interface Decoration<T extends API.Database.TableName> {
                /** 
                 *  ### Color `info`
                 *  Función que valida uno o más valores y colorea el widget de color `info`.
                 */ 
                info?: _DecorationTrigger<API.Database.Table[T]>;
                /** 
                 *  ### Color `success`
                 *  Función que valida uno o más valores y colorea el widget de color `success`.
                 */ 
                success?: _DecorationTrigger<API.Database.Table[T]>;
                /** 
                 *  ### Color `warning`
                 *  Función que valida uno o más valores y colorea el widget de color `warning`.
                 */ 
                warning?: _DecorationTrigger<API.Database.Table[T]>;
                /** 
                 *  ### Color `danger`
                 *  Función que valida uno o más valores y colorea el widget de color `danger`.
                 */ 
                danger?: _DecorationTrigger<API.Database.Table[T]>;
            };

            // Función receptora de atributos para ser usados en widget a renderizar
            type PropsReceiver = <T extends API.Database.TableName>(
                name: string,
                decoration: Decoration<T>,
                table: T,
                record: API.Database.Table[T]
            ) => (Callback)

            // Widgets predefinidos listos para ser usados
            interface Presets <T extends API.Database.TableName>{
                chip: PropsReceiver<T>;
                toggle: PropsReceiver<T>;
                codeline: PropsReceiver<T>;
            };
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
            /** 
             *  ### Controles dinámicos
             *  Este estado contiene el componente TSX que se mostrará en la barra de
             *  navegación de la aplicación.
             */ 
            dynamicControls: React.JSX.Element | null;
            /** 
             *  ### Establecer controles dinámicos
             *  Esta función establece un nuevo componente TSX que se mostrará en la barra
             *  de navegación de la aplicación.
             */ 
            setDynamicControls: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>;
        };

        interface AppContent {
            appContentRef: React.RefObject<HTMLElement | null>;
        };

        interface PageName {
            pageName: string | null;
            setPageName: React.Dispatch<React.SetStateAction<string | null>>;
        };

        type SortingField = View.Tree._SortingFields<any>

        interface AppLoading {
            appLoading: boolean;
            setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
        };

        interface RecordForm {
            tableName: API.Database.TableName;
            record: API.DataTypes.GenericRecord | null;
            formReadonly?: boolean;
        };

        interface ViewConfig <T extends IACele.API.Database.TableName>{
            /** 
             *  ### Añadir propiedades para columna de vista de árbol
             *  Esta función añade la declaración de propiedades para renderizar una
             *  columna en la vista de árbol del componente {@link View.Tree.Component Tree}
             */ 
            pushViewConfig: (config: IACele.View.Tree.Field<T>) => void;
        };

        type OpenRecordPath = View._Open;

        type FormField<T extends IACele.API.Database.TableName> = View.RecordUse<T> & View._OptionalTableUse<T> & View.Form._ReadOnly;

    };

    declare namespace Hook {

        interface PageName {

            /** 
             *  ### Nombre de la página
             *  Esta función establece el nombre de la página, el cual se mostrará en el
             *  breadcrumb y la pestaña del navegador.
             */ 
            setViewName: (name: string | null) => (void)
        }
    }

};
