// import { SharedSelection } from "@heroui/react";

declare namespace IACele {

    declare namespace Common {

        interface _TableUse<K extends API.Database.TableName> {
            /** 
             *  ### Tabla de base de datos
             *  Nombre de tabla de base de datos.
             */ 
            table: K;
        }
    }

    declare namespace Application {

        interface _SupportsOpen {
            /** 
             *  ### Abierto
             *  Parámetro que indica que el botón está abierto.
             */ 
            isOpen;
        };

        interface _SupportsOnClick {
            /** 
             *  ### Función de clic
             *  Función que se ejecuta cuando se da clic en el componente que la
             *  recibe.
             */ 
            onClick: () => void;
        }

        interface CurrentUserData {
            id: number | undefined;
            user: string;
            name: string;
            odooId: number | undefined;
            createDate: string;
            writeDate: string;
        };

        interface Route {
            /** 
             *  ### Ruta
             *  Dirección de ruta.
             */ 
            path: string;
            /** 
             *  ### Nombre de ruta
             *  Nombre de la ruta, que renderizará en la aplicación.
             */ 
            name: string;
        };

        interface RouteGroup {
            /** 
             *  ### Nombre
             *  Nombre de grupo de rutas.
             */ 
            name: string;
            /** 
             *  ### Ícono de ruta
             *  Ícono descriptivo para representar la ruta.
             */ 
            icon: React.ElementType;
            /** 
             *  ### Rutas de grupo
             *  Matriz de rutas o ruta sencilla que lleva a alguna parte de la
             *  aplicación.
             */ 
            routes: string | Route[];
        };

        interface RouteSection {
            /** 
             *  ### Nombre de sección
             *  Nombre de la sección de grupo de rutas. Este nombre se renderiza como
             *  encabezado de los botones de grupos de rutas de la sección.
             */ 
            name: string;
            /** 
             *  ### Grupos de rutas
             *  Matriz de grupos de rutas o rutas sencillas que se renderizan como un
             *  botón que despliega la rutas contenidas o redirección a la ruta
             *  individual.
             */ 
            groups: RouteGroup[];
        };

        /** 
         *  ### Menú de barra lateral
         *  Colección de datos que describe la estructura del menú de la barra lateral
         *  de la aplicación.
         */ 
        type SidebarMenu = RouteSection[];

        type _RouteGroupButton = _SupportsOpen & _SupportsOnClick & RouteGroup;
        interface RouteGroupButton extends _RouteGroupButton {
            /** 
             *  ### La ubicación es activa
             *  Este parámetro indica si la ubicación actual en la aplicación es la
             *  misma a la que el componente apunta.
             */ 
            isActiveLocation: boolean;
        };

        interface Routes extends _SupportsOpen {
            /** 
             *  ### Altura de lista
             *  Altura computada para la lista de rutas cuando ésta se despliega.
             */ 
            height: number;
            /** 
             *  ### Referencia de lista
             *  Referencia usada para calcular la altura de la lista de rutas.
             */ 
            listRef: React.RefObject<HTMLDivElement | null>;
            /** 
             *  ### Rutas
             *  Lista de rutas.
             */ 
            routes: Route[];
            /** 
             *  ### Función de clic
             *  Función que se ejecuta cuando el componente un clic.
             */ 
            routeOnClick: (route: string) => (void);
        };

        interface RouteComponent extends _SupportsOnClick {
            /** 
             *  ### Ruta
             *  Objeto que contiene una ruta de URL y el nombre de ésta.
             */ 
            route: Route;
        };

        interface RecentRoute {
            /** 
             *  ### Nombre de ruta
             *  Nombre a mostrar en breadcrump de la aplicación.
             */ 
            name: string;
            /** 
             *  ### Ruta
             *  Ruta de URL a la que se navega para llegar a esta ruta.
             */ 
            to: string;
        };

        interface Breadcrumbs {
            /** 
             *  ### Rutas recientes
             *  Arreglo de las últimas rutas visitadas.
             */ 
            recentRoutes: RecentRoute[];
            /** 
             *  ### Añadir ruta
             *  Función para añadir una ruta al arreglo de rutas recientes.
             */ 
            addRoute: (route: RecentRoute) => void;
            /** 
             *  ### Truncar rutas recientes
             *  Esta función se usa para cortar las últimas rutas recientes en base a un
             *  índice, esto sirve cuando el usuario ha dado clic en alguna de las rutas
             *  mostradas por los breadcrumbs y ya no hay necesidad de mostrar la ruta
             *  cliqueada ni sus respectivas rutas siguientes en éstos.
             */ 
            cutRecent: (index: number) => void;
        };

        interface BreadcrumbRoute extends RecentRoute {
            /** 
             *  ### Índice de ruta
             *  Valor utilizado para realizar modificaciones al arreglo de rutas recientes.
             */ 
            index: number;
        };

    };

    /** 
     *  ### UI
     *  Tipos de dato relacionados a la interfaz de usuario de iaCele.
     */ 
    declare namespace UI {

        interface _SupportsId {
            /** 
             *  ### ID
             *  ID del componente.
             */ 
            id: string;
        };

        interface _SupportsClassName {
            /** 
             *  ### Nombres de clase
             *  Nombres de clase CSS.
             */ 
            className?: string;
        };

        interface _Colorizable {
            /** 
             *  ### Color de componente
             *  Color utilizado para colorear componentes de HeroUI.
             */ 
            color?: DecorationColor;
        };

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
            children?: React.ReactNode;
        };

        /** 
         *  ### Color de decoración
         *  Color de decoración de de componente/widget en base a su valor.
         */ 
        type DecorationColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;

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

        interface SelectOption<K> {
            /** 
             *  ### Llave de opción
             *  Llave única de la opción actual
             */ 
            name: K;
            /** 
             *  ### Leyenda de opción
             *  Esta leyenda muestra el nombre o descripción de la opción actual.
             */ 
            label: string;
        };

        interface SelectOptions<K> {
            /** 
             *  ### Opciones disponibles
             *  Arreglo que contiene todas las opciones disponibles y que renderiza en la
             *  lista de opciones.
             */ 
            toggleableKeys: SelectOption<K>[];
            /** 
             *  ### Opciones seleccionadas
             *  Arreglo que contiene todas las opciones seleccionadas/activas.
             */ 
            selectedKeys: Set<K>;
            /** 
             *  ### Manejo de estado de opciones seleccionadas
             *  Esta función realiza la activación o desactivación decolumnas.
             */ 
            setSelectedKeys: (keys: _SharedSelection) => void;
        };

        interface SelectTemplate<T> extends IACele.UI.SelectOptions<T> {
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

        declare namespace Input {

            type _File = _SupportsId & _Colorizable;
            interface FileType extends _File {
                /** 
                 *  ### Archivo
                 *  Archivo ingresado al input.
                 */ 
                file: File | null;
                /** 
                 *  ### Establecer archivo
                 *  Función de cambio de estado para colocar el archivo cuando éste se ingresa
                 *  al componente.
                 */ 
                setFile: React.Dispatch<React.SetStateAction<File | null>>;
                /** 
                 *  ### Formatos aceptados
                 *  Formatos de archivo aceptados, separados por espacio. Por ejemplo `".png
                 *  .jpeg .svg"`
                 */ 
                accept: string;
            };

        };

        declare namespace Sizeable {

            type _View = 'mobile' | 'desktop';
            type _ComponentSize = 'sm' | 'md';
            type _TextSize = 'text-medium' | 'text-sm';

            interface _ComponentCallbackParams {
                /** 
                 *  ### Modo de vista
                 *  Este valor indica el modo actual de vista para el componente, ya sea
                 *  móvil o escritorio.
                 */ 
                view: _View;
                /** 
                 *  ### Tamaño del componente
                 *  Valor computado de tamaño de componente para uso en componentes de HeroUI.
                 */ 
                componentSize: _ComponentSize;
                /** 
                 *  ### Tamaño de fuente
                 *  Valor computado a usar en tamaño de fuente, en base al tipo de vista y
                 *  ajuste del tamaño de elementos entre vista móvil y escritorio.
                 */ 
                textSize: _TextSize;
            };

            type _ComponentCallback = ({ view, componentSize }: _ComponentCallbackParams) => (React.ReactNode);

            interface SizeableParams {
                children: _ComponentCallback;
            };

        };

        declare namespace Modal {

            interface Generic {
                /** 
                 *  ### Está abierto
                 *  Estado que indica que el modal está abierto.
                 */ 
                isOpen: boolean;
                /** 
                 *  ### No sé
                 *  Sepa qué hace esta función, proviene de la librería de HeroUI.
                 */ 
                onOpenChange: () => void;
                /** 
                 *  ### Mensaje a mostrar
                 *  Mensaje a mostrar en el modal.
                 */ 
                message: string;
            };

            interface Confirm extends Generic {
                /** 
                 *  ### Función a ejecutar
                 *  Función a ejecutar en un botón dentro del modal.
                 */ 
                execute: () => void;
                /** 
                 *  ### Color UI
                 *  Color UI de componentes dentro del modal.
                 */ 
                color: IACele.UI.DecorationColor;
            };

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

            type TableFieldsProps<K extends IACele.API.Database.TableName> = Record<keyof IACele.API.Database.Table[K], IACele.API.DataTypes.FieldProps>;
        };

        /** 
         *  ### Tipos de datos de estructuras de datos
         *  En este nombre de espacio se centralizan todos los tipos de datos que
         *  describen estructuras de colecciones de datos enviadas al backend y
         *  recibidas del mismo.
         */ 
        declare namespace Data {

            /** 
             *  ### Registro en base de datos
             *  Tipo de dato genérico que describe la estructura de un registro de
             *  una tabla de base de datos de manera dinámica.
             */ 
            type RecordInDatabase<K extends Database.TableName> = Database.Table[K]

            /** ### Atributo de registro en base de datos
             *  Atributo de registro dinámico de una tabla de base de datos.
             */ 
            type RecordAttribute<K extends Database.TableName> = keyof RecordInDatabase<K>
        }

        /** 
         *  ### Estructuras de información enviadas al backend
         *  En este nombre de espacio se centralizan los tipos de dato que se
         *  envían al backend.
         */ 
        declare namespace Request {

            interface _RequiresID {
                /** 
                 *  ### ID
                 *  ID de registro de base de datos.
                 */ 
                recordIds: number;
            }

            // Lectura de datos
            type Read = Common._TableUse<K> & _RequiresID

            // Petición de búsqueda y lectura base
            interface _BaseSearchRead <K extends IACele.API.Database.TableName> extends Common._TableUse<K> {
                /** 
                 *  ### Criterio de búsqueda
                 *  Estructura que define una búsqueda en la base de datos del backend.
                 */ 
                searchCriteria?: IACele.API.Data.CriteriaStructure;
                /** 
                 *  ### Campos
                 *  Arreglo de nombres de campos a obtener desde el backend.
                 */ 
                fields?: Data.RecordAttribute<K>[];
                /** 
                 *  ### Ordenar por
                 *  Nombre o arreglo de nombres de campo de base de datos para usar como
                 *  criterio de ordenamiento de datos.
                 */ 
                sortby?: Data.RecordAttribute<K> | Data.RecordAttribute<K>[];
                /** 
                 *  ### Dirección de ordenamiento
                 *  Valor booleano o arreglo de valores booleanos que definen si el sentido
                 *  de ordenamiento es ascendente o no. Este valor debe tener la misma
                 *  longitud de datos que el valor `sortby` ya que define la dirección de
                 *  ordenamiento con respecto a un campo del parámetro mencionado.
                 */ 
                ascending?: boolean | boolean[];
            };

            // Petición de búsqueda y lectura
            interface SearchRead <K extends IACele.API.Database.TableName> extends _BaseSearchRead<K> {
                /** 
                 *  ### Desfase inicial
                 *  Este valor define desde qué indice de registro retornará el backend.
                 */ 
                offset?: number;
                /** 
                 *  ### Límite de registros
                 *  Cantidad máxima de registros a retornar por el backend.
                 */ 
                limit?: number;
            };

            // Petición de búsqueda y lectura para vista de tabla
            interface TreeSearchRead <K extends IACele.API.Database.TableName> extends _BaseSearchRead<K> {
                /** 
                 *  ### Página de datos
                 *  Este parámetro se utiliza para paginación de datos. Se obtiene uno de
                 *  los segmentos de datos divididos por página.
                 */ 
                page?: number;
                /** 
                 *  ### Cantidad de registros por página. Este parámetro también define el
                 *  tamaño de cada página a retornar desde el backend.
                 */ 
                itemsPerPage?: number;
            };

            // Petición de actualización de registro
            interface Update extends Common._TableUse<K> {
                /** 
                 *  ### ID
                 *  ID del registro a modificar en la base de datos.
                 */ 
                recordId: number;
                /** 
                 *  ### Datos a modificar
                 *  Objeto que contiene los nombres de los campos y valores de la tabla de
                 *  base de datos a la cual pertenece el registro a modificar.
                 */ 
                dataToWrite: Partial<Data.RecordInDatabase<K>>;
            };

            type _ExecuteAction = Common._TableUse<K> & _RequiresID
            interface ExecuteAction extends _ExecuteAction {
                /** 
                 *  ### Acción a ejecutar
                 *  Nombre de la acción a ejecutar en el backend.
                 */ 
                action: string;
            }
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
            interface Records<K extends Data.RecordInDatabase<any>> {
                data: K[];
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

            interface Form<K extends API.Database.TableName> {
                children: (children: Field.FormChildren<K>) => (React.ReactNode); // Función que renderiza la vista de formulario.
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

                type FieldNames<K extends IACele.API.Database.TableName> = Record<keyof API.Database.Table[K], Props>;

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

                interface Params<K extends IACele.API.Database.TableName> {
                    name: keyof IACele.API.Database.Table[K]
                    readonly?: boolean;
                };

                interface KanbanParams<K extends IACele.API.Database.TableName> extends Params<K>  {
                    widget?: IACele.Core.Widget.WidgetPresetKey;
                    label?: string | boolean;
                }

                interface FormChildren<K extends API.Database.TableName> {
                    Page: React.FC<{ children: React.ReactNode }>;
                    Header: React.FC<{ children: React.ReactNode }>;
                    Sheet: React.FC<{ children: React.ReactNode }>;
                    Field: React.FC<Params<K>>;
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

        /** 
         *  ### Registro en base de datos
         *  Este objeto es la declaración de propiedades de un registro de una tabla
         *  dinámica de base de datos.
         */ 
        type RecordInDatabase<K extends API.Database.TableName> = API.Database.Table[K]

        // Tipo de dato para renderizar
        type DataType = (
            | 'char'
            | 'date'
            | 'float'
            | 'integer'
            | 'monetary'
            | 'percentage'
        )

        // Interfaz de uso de tabla de base de datos
        interface _TableUse <K extends API.Database.TableName> {
            /** 
             *  ### Tabla de base de datos
             *  Nombre de tabla de base de datos.
             */ 
            table: K;
        };

        interface _RecordsUse<K extends API.Database.TableName> {
            /** 
             *  ### Registros de base de datos
             *  En este estado se almacena la información obtenida desde el servidor.
             */ 
            records: RecordInDatabase<K>[];
        }

        // Interfaz de componente que usa muchos registros
        interface _SupportsEmptyContent {
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

        interface _FieldName <K extends API.Database.TableName>{
            /** 
             *  ### Nombre de campo
             *  Nombre en base de datos del campo de la tabla de base de datos a mostrar.
             */ 
            name: keyof RecordInDatabase<K>;
        }

        interface RecordUse<K extends API.Database.TableName> {
            /** 
             *  ### Registro de tabla de base de datos
             *  Registro de la base de datos del que se tomarán valores para renderizar
             *  un componente.
             */ 
            record: RecordInDatabase<K>;
        };

        // Variación del tipo _TableUse para permitir valores nulos
        interface _OptionalTableUse <K extends API.Database.TableName> extends _TableUse<K>{
            table?: K;
        }

        interface _SupportsWidget<K extends API.Database.TableName>{
            /** 
             *  ### Widget para renderización de celda
             *  Widget prestablecido o personalizado a usar para renderizar el valor
             *  del registro en una tabla de base de datos.
            */ 
            widget?: keyof Widget.Presets<K> | ((props: RecordInDatabase<K>) => (React.ReactNode));
            /** 
             *  ### Opciones de color
             *  Objeto de funciones que colorean un widget en base a los valores de un
             *  registro de base de datos.
             */ 
            colorDecoration?: Widget.Decoration<K>;
        };

        interface _SupportsVisibility<K extends API.Database.TableName> {
            /** 
             *  ### Es invisible cuando...
             *  Función que valida el valor de uno o más atributos del
             *  registro para validar si el componente debe mostrarse o no.
             */ 
            invisible?: ((props: RecordInDatabase<K>) => (boolean));
        }

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
        interface HasOptionalLabel {
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

        interface _SupportsLoading {
            /** 
             *  ### Estado de carga
             *  Estado que indica que los datos se están cargando.
             */ 
            loading: boolean;
        }

        // Vista de árbol, interfaces y tipos relacionados
        declare namespace Tree {

            // Configuración de columnas de tabla
            type ViewConfig <K extends API.Database.TableName> = Field<K>[];

            // Parámetros columnes de columna individual
            interface _IndividualColumnCommon <K extends API.Database.TableName>{
                /** 
                 *  ### Llave de campo
                 *  Llave del campo de la tabla de base de datos a renderizar como columna.
                 */ 
                columnKey: keyof RecordInDatabase<K>;
            };

            // Parámetros comunes en interfaces
            interface _Common <K extends API.Database.TableName> extends _TableUse<K> {
                /** 
                 *  ### Configuración de vista de tabla
                 *  Objeto que define las propiedades de cada una de las columnas. Los
                 *  atributos aquí declarados se encuentran en la interfaz {@link Tree.Field Field}.
                 */ 
                viewConfig: ViewConfig<K>; // Configuración de vista de columnas de la tabla.
            };

            // Unión de parámetros comunes y de columna individual
            type _IndividualColumnAndCommonParams<K extends API.Database.TableName> = RecordUse<K> & _IndividualColumnCommon<K> & _Common<K>;

            // Componentes hijos de la vista
            interface _Children <K extends API.Database.TableName>{
                /** 
                 *  ### Columna de árbol
                 *  Este componente declara las propiedades de una columna de la vista de
                 *  árbol del componente {@link Component Tree}.
                 */ 
                Field: React.FC<Field<K>>;
                /** 
                 *  ### Página de árbol
                 *  Este componente no renderiza nada por sí solo pero ayuda a contener las
                 *  declaraciones de propiedades de columna del componente {@link Field}
                 *  dentro de éste y mantener la sintáxis TSX válida.
                 */ 
                Page: React.FC<UI.GenericInvolverComponent>;
            };

            interface _HasSortingDirection {
                /** 
                 *  ### Dirección de ordenamiento de datos
                 *  Conjunto que contiene el valor de dirección de ordenamiento de datos.
                 */ 
                selectedSortingDirection: _SortingDirection;
            };

            interface SortingFields <K extends API.Database.TableName> extends _HasSortingDirection{
                /** 
                 *  ### Columna de ordenamiento de datos
                 *  Llave que indica el campo por el cual los datos están siendo ordenados
                 *  actualmente.
                 */ 
                sortingFieldKey: keyof RecordInDatabase<K> | null;
                /** 
                 *  ### Selección de columna para ordenar datos
                 *  Función para establecer el campo de ordenamiento.
                 */ 
                toggleSortingColumn: (key: keyof RecordInDatabase<K>) => (void);
            }

            // TIPOS E INTERFACES USADOS POR COMPONENTES
            // ----------------------------------------------------------------

            // Parámetros de componente que obtiene datos de registros desde el backend
            type _ListRenderer<K extends API.Database.TableName> = _Common<K> & _SupportsEmptyContent & _SupportsWidget<K>;
            interface ListRenderer <K extends API.Database.TableName> extends _ListRenderer<K>{
                /** 
                 *  ### Declaración de vista Kanban
                 *  Esta función sirve para realizar la declaración de la vista Kanban.
                 */ 
                kanban: IACele.View.Kanban.ChildrenRenderer<K>
            };

            // Unión de parámetros de componente que obtiene datos de registros desde el backend y ordena datos
            type _DataSorter<K extends API.Database.TableName> = _ListRenderer<K> & SortingFields<K>

            // Parámetros de entrada de columna de tabla
            type InteractiveColumn<K extends API.Database.TableName> = _Common<K> & HasOptionalLabel & _IndividualColumnCommon<K>;

            // Unión de interfaces de uso de nombre y de título de campo
            type _BaseField<K extends API.Database.TableName> = _FieldName<K> & HasOptionalLabel & _SupportsWidget<K>;

            // Parámetros de campo de tabla
            interface Field <K extends API.Database.TableName> extends _BaseField<K> {
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
            type CellRender <K extends API.Database.TableName> = _IndividualColumnAndCommonParams<K>;

            // Parámetros de vista de tabla
            type Component<K extends API.Database.TableName> = _DataSorter<K> & _RecordsUse<K> & _SupportsLoading;

            // Función que renderiza los componentes hijos
            interface ChildrenRender <K extends API.Database.TableName>{
                /** 
                 *  ### Declaración de vista de árbol
                 *  Función utilizada para el encapsulamiento de componentes que se
                 *  utilizan en la construcción de la vista de árbol.
                 */ 
                children: ({ Field, Page }: _Children<K>) => React.ReactNode;
            };

        };

        // Vista de lista, interfaces y tipos relacionados
        declare namespace List {

            // Componentes hijos de la vista
            interface _Children<K extends IACele.API.Database.TableName>{
                /** 
                 *  ### Vista de árbol
                 *  Este componente se utiliza para declarar la estructura de una vista de
                 *  árbol usando una función flecha como `children`.
                 */ 
                Tree: React.FC<Tree.ChildrenRender<K>>;
            };

            // Unión de interfaces que usan tabla de base de datos y usan muchos registros.
            type _BaseComponent<K extends API.Database.TableName> = _TableUse<K> & _SupportsEmptyContent & _Open;

            // TIPOS E INTERFACES USADOS POR COMPONENTES
            // ----------------------------------------------------------------

            // Parámetros de la vista de lista
            interface Component <K extends API.Database.TableName> extends _BaseComponent<K> {
                /** 
                 *  ### Declaración de vistas de árbol y kanban
                 *  Función utilizada para el encapsulamiento de componentes que se
                 *  utilizan en la construcción de las vistas de árbol y kanban
                 */ 
                children: [
                    ({ Tree }: _Children<K>) => (React.ReactNode),
                    IACele.View.Kanban.ChildrenRenderer<K>,
                ];
            };

        };

        declare namespace Kanban {

            type _BaseField<K extends API.Database.TableName> = _FieldName<K> & _SupportsWidget<K>;
            interface Field<K extends API.Database.TableName> extends _BaseField<K>{
                /** 
                 *  ### Nombre personalizado de campo
                 *  Parámetro que indica la visibilidad del nombre del campo o que indica
                 *  un nombre explícito de la columna en caso de querer reemplazar su
                 *  nombre prestablecido.
                 */ 
                label?: boolean | string;
            };

            interface _Children<K extends API.Database.TableName>{
                /** 
                 *  ### Kanban
                 *  Componente que envuelve la declaración de campos y/o secciones para la
                 *  vista de kanban.
                 */ 
                Kanban: React.FC<UI.GenericInvolverComponent>;
                /** 
                 *  ### Sección de kanban
                 *  Este componente agrupa campos en secciones para organizar la vista.
                 */ 
                Section: React.FC<UI.GenericInvolverComponent>;
                /** 
                 *  ### Campo
                 *  Definición de las propiedades para un campo de la tarjeta de la vista.
                 */ 
                Field: React.FC<Field<K>>;
            };

            type ChildrenRenderer<K extends API.Database.TableName> = ({ Kanban, Section, Field }: Kanban._Children<K>) => (React.ReactNode);

            type _BaseWrapper<K extends API.Database.TableName> = _TableUse<K> & _RecordsUse<K> & _SupportsWidget<K> & _SupportsLoading;
            interface Wrapper<K extends API.Database.TableName> extends _BaseWrapper<K> {
                /** 
                 *  ### Declaración de vista de kanban
                 *  Función utilizada para el encapsulamiento de componentes que se utilizan en
                 *  la construcción de la vista de kanban.
                 */ 
                renderer: ChildrenRenderer<K>;
            };

            type RenderedWidget<K extends IACele.API.Database.TableName> = IACele.View.Kanban._BaseField<K> & IACele.View._TableUse<K> & IACele.View.RecordUse<K>;

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
            type Field<K extends IACele.API.Database.TableName> = View._FieldName<K> & HasOptionalLabel & _ReadOnly;

            // Atributos base de componente de formulario
            type _BaseComponent<K extends IACele.API.Database.TableName> = View._TableUse<K> & _ReadOnly;

            interface Action<K extends IACele.API.Database.TableName> extends _SupportsVisibility<K> {
                /** 
                 *  ### Nombre
                 *  Nombre de la acción que se renderizará como leyenda del botón.
                 */ 
                name: string;
                /** 
                 *  ### Acción a ejecutar
                 *  Nombre de la acción a ejecutar en el backend.
                 */ 
                execute: string;
                /** 
                 *  ### Color
                 *  Color del botón
                 */ 
                color?: IACele.UI.DecorationColor;
                /** 
                 *  ### Mensaje de confirmación
                 *  Mensaje a mostrar en modal para confirmar o cancelar la acción.
                 */ 
                confirm?: string;
                /** 
                 *  ### Al realizar
                 *  Mensaje a mostrar en modal para notificar que la acción fue ejecutada
                 *  correctamente.
                 */ 
                notify?: string;
            };

            // Componentes hijos de la vista de formulario
            interface _Children<K extends IACele.API.Database.TableName> {
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
                Field: React.FC<Field<K>>;
                Action: React.FC<Action<K>>;
            };

            interface Component<K extends IACele.API.Database.TableName> extends _BaseComponent<K> {
                /** 
                 *  ## Declaración de vista de formulario
                 *  Función utilizada para el encapsulamiento de componentes que se
                 *  utilizan en la construcción de la vista de formulario.
                 */ 
                children: ({ Page, Header, Sheet, Group, Field }: _Children<K>) => (React.ReactNode);
            };

            declare namespace FieldParams {

                // Unión de uso de nombre de campo y datos de registro de base de datos
                type RecordRender<K extends IACele.API.Database.TableName> = View._FieldName<K> & View.RecordUse<K>

                // Extensión de parámetros de campo de formulario
                interface Generic<K extends IACele.API.Database.TableName> extends RecordRender<K> {
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
                interface _BaseInput<K extends IACele.API.Database.TableName> extends Generic<K>{
                    /** 
                     *  ### Tipo de dato de valor
                     *  Propiedad que indica el tipo de dato del valor a renderizar.
                     */ 
                    type: Data.KeyboardType;
                }

                // Input genérico
                interface GenericInput<K extends IACele.API.Database.TableName> extends _BaseInput<K> {
                    type: Data.GenericType;
                };

                // Input manipulable por teclado
                interface KeyboardInput<K extends IACele.API.Database.TableName> extends _BaseInput<K> {
                    type: Data.KeyboardType;
                };
            };

        }

        declare namespace Widget {

            // Destructuración dinámica de la llave de un objeto de registro en base de datos
            interface _PropDynamicDestructuration<K extends API.Database.TableName> extends RecordUse<K> {
                [ prop: string ]: API.DataTypes._RecordValue;
            };
            
            // Componente de widget
            type Callback = React.FC<_PropDynamicDestructuration>;

            // Declaración de widget
            interface Declaration <K extends API.Database.TableName>{
                table: K;
                record: API.Database.Table[K]
                defaultValue: API.DataTypes._RecordValue;
                defaultProp: string;
                color: UI.DecorationColor;
            };

            // Renderizador de widget dinámico
            type Component<K extends API.Database.TableName> = (props: Declaration<K>) => React.ReactNode;

            // Definición de color de un widget en base a una validación de un argumento o sus atributos entrantes
            type _DecorationTrigger<T> = (props: T) => (boolean);

            // Interfaz para colorear un widget en base a validaciones de un argumento o sus atributos entrantes
            interface Decoration<K extends API.Database.TableName> {
                /** 
                 *  ### Color `info`
                 *  Función que valida uno o más valores y colorea el widget de color `info`.
                 */ 
                info?: _DecorationTrigger<API.Database.Table[K]>;
                /** 
                 *  ### Color `success`
                 *  Función que valida uno o más valores y colorea el widget de color `success`.
                 */ 
                success?: _DecorationTrigger<API.Database.Table[K]>;
                /** 
                 *  ### Color `warning`
                 *  Función que valida uno o más valores y colorea el widget de color `warning`.
                 */ 
                warning?: _DecorationTrigger<API.Database.Table[K]>;
                /** 
                 *  ### Color `danger`
                 *  Función que valida uno o más valores y colorea el widget de color `danger`.
                 */ 
                danger?: _DecorationTrigger<API.Database.Table[K]>;
            };

            // Función receptora de atributos para ser usados en widget a renderizar
            type PropsReceiver = <K extends API.Database.TableName>(
                name: keyof RecordInDatabase<K>,
                colorDecoration: Decoration<K>,
                table: K,
                bypassDefaultColor: boolean,
            ) => (Callback)

            // Widgets predefinidos listos para ser usados
            interface Presets <K extends API.Database.TableName>{
                char: PropsReceiver<K>;
                integer: PropsReceiver<K>;
                float: PropsReceiver<K>;
                chip: PropsReceiver<K>;
                toggle: PropsReceiver<K>;
                codeline: PropsReceiver<K>;
                monetary: PropsReceiver<K>;
                percentage: PropsReceiver<K>;
                check: PropsReceiver<K>;
            };

            type FieldWrapper = UI.GenericInvolverComponent & HasOptionalLabel;
        };

        declare namespace Pagination {

            interface Navigation {
                /** 
                 *  ### Conteo de registros
                 *  Este valor contiene la cantidad de registros totales de un resultado de
                 *  búsqueda.
                 */ 
                count: number;
                /** 
                 *  ### Página actual
                 *  Estado que indica la página actual de lectura de una lista de
                 *  resultados.
                 */ 
                currentPage: number;
                /** 
                 *  ### Cantidad total de páginas
                 *  Estado que indica la cantidad total de páginas que se pueden recorrer
                 *  en una lista de resultados.
                 */ 
                totalPages: number;
                /** 
                 *  ### Página anterior
                 *  Función que retrocede una página a la página actual de lctura de una
                 *  lista de resultados.
                 */ 
                prevPage: () => void;
                /** 
                 *  ### Página siguiente
                 *  Función que avanza una página a la página actual de lctura de una lista
                 *  de resultados.
                 */ 
                nextPage: () => void;
            };

            interface Setters extends Navigation {
                /** 
                 *  ### Establecer conteo
                 *  Esta función de cambio de estado manipula el valor del estado `count`.
                 */ 
                setCount: React.Dispatch<React.SetStateAction<number>>;
                /** 
                 *  ### Cantidad de registros por página
                 *  Este estado indica la cantidad máxima de registros que puede contener
                 *  una página.
                 */ 
                itemsPerPage: number;
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

        interface _DynamicControlsSetter {
            /** 
             *  ### Establecer controles dinámicos
             *  Esta función establece un nuevo componente TSX que se mostrará en la barra
             *  de navegación de la aplicación.
             */ 
            setDynamicControls: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>;
        };

        interface Navbar extends _DynamicControlsSetter {
            /** 
             *  ### Controles dinámicos
             *  Este estado contiene el componente TSX que se mostrará en la barra de
             *  navegación de la aplicación.
             */ 
            dynamicControls: React.JSX.Element | null;
        };

        interface AppContent {
            appContentRef: React.RefObject<HTMLElement | null>;
        };

        interface PageName {
            pageName: string | null;
            setPageName: React.Dispatch<React.SetStateAction<string | null>>;
        };

        type SortingField = View.Tree.SortingFields<any>

        interface API {
            appLoading: boolean;
            setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
        };

        interface RecordForm {
            tableName: API.Database.TableName;
            record: API.DataTypes.GenericRecord | null;
            formReadonly?: boolean;
        };

        interface ViewConfig <K extends IACele.API.Database.TableName>{
            /** 
             *  ### Añadir propiedades para columna de vista de árbol
             *  Esta función añade la declaración de propiedades para renderizar una
             *  columna en la vista de árbol del componente {@link View.Tree.Component Tree}
             */ 
            pushViewConfig: (config: IACele.View.Tree.Field<K>) => void;
        };

        type OpenRecordPath = View._Open;

        type _FormField<K extends IACele.API.Database.TableName> = View.RecordUse<K> & View._OptionalTableUse<K> & View.Form._ReadOnly;
        interface FormField<K extends IACele.API.Database.TableName> extends _FormField<K> {
            reload: () => void;
        }

        interface RecordKanban<K extends IACele.API.Database.TableName> {
            record: IACele.View.RecordInDatabase<K> | null;
        };

        interface FormModal {
            /** 
             *  ### Está abierto
             *  Estado que indica que el modal de confirmación está abierto.
             */ 
            isConfirmOpen: boolean;
            /** 
             *  ### Está abierto
             *  Estado que indica que el modal de notificación está abierto.
             */ 
            isDoneOpen: boolean;
            /** 
             *  ### Abrir modal
             *  Función que abre modal de confirmación.
             */ 
            onConfirmOpen: () => void;
            /** 
             *  ### Abrir modal
             *  Función que abre modal de notificación.
             */ 
            onDoneOpen: () => void;
            /** 
             *  ### Establecer mensaje de confirmación
             *  Función que establece el mensaje que se muestra en el modal de
             *  conformación.
             */ 
            setConfirmMessage: React.Dispatch<React.SetStateAction<string>>;
            /** 
             *  ### Establecer mensaje de notificación
             *  Función que establece el mensaje que se muestra en el modal de
             *  notificación.
             */ 
            setDoneMessage: React.Dispatch<React.SetStateAction<string>>;
            /** 
             *  ### Establecer función a ejecutar
             *  Función de cambio de estado que establece una función a ser ejecutada
             *  como valor del estado.
             */ 
            setExecute: React.Dispatch<React.SetStateAction<() => void>>;
            /** 
             *  ### Establecer color UI
             *  Función de cambio de estado para establecer un color UI.
             */ 
            setColor: React.Dispatch<React.SetStateAction<UI.DecorationColor>>;
        };

    };

    declare namespace Hook {

        interface PageName {
            /** 
             *  ### Nombre de la página
             *  Esta función establece el nombre de la página, el cual se mostrará en el
             *  breadcrumb y la pestaña del navegador.
             */ 
            setViewName: (name: string | null) => (void);
        };

        interface _ColumnsVisibilityHandling<K extends IACele.API.Database.TableName> {
            /** 
             *  ### Columnas mostrables/ocultables
             *  Objeto {@link View.Tree.ViewConfig ViewConfig} que contiene los
             *  datos de columnas filtrados por las columnas que se pueden
             *  mostrar/ocultar, para usar en componente Select.
             */ 
            toggleableColumns: View.Tree.ViewConfig<K>;
            /** 
             *  ### Llaves de columnas visibles
             *  Conjunto de llaves que indica qué columnas están visibles actualmente.
             */ 
            visibleColumnsKeys: Set<keyof API.Database.Table[K]>;
            /** 
             *  ### Establecer columnas visibles
             *  Función de cambio de estado que establece columnas visibles.
             */ 
            setVisibleColumnsKeys: UI.SelectOptions<K>['setSelectedKeys'];
        };

        interface VisibleColumns<K extends IACele.API.Database.TableName> extends _ColumnsVisibilityHandling<K> {
            /** 
             *  ### Columnas visibles
             *  Objeto {@link View.Tree.ViewConfig ViewConfig} que contiene los
             *  datos de columnas filtrados solo por las columnas visibles.
             */ 
            visibleColumns: View.Tree.ViewConfig<K>;
        };

        // ------------------
        interface _SortingFieldHandling<K extends API.Database.TableName> {
            /** 
             *  ### Campos ordenables
             *  Objeto {@link View.Tree.ViewConfig ViewConfig} que contiene los campos que
             *  pueden ordenar datos.
             */ 
            sorteableFields: View.Tree.ViewConfig<K>;
            /** 
             *  ### Campo de ordenamiento en vista Kanban
             *  Estado que indica el campo que está ordenando datos actualmente
             */ 
            kanbanSortingField: Set<keyof View.RecordInDatabase<K>>;
            /** 
             *  ### Establecer campo de ordenamiento en vista de Kanban
             *  Función para establecer campo de ordenamiento de datos.
             */ 
            setKanbanSortingField: React.Dispatch<React.SetStateAction<Set<keyof View.RecordInDatabase<K>>>>;
        };

        interface _SortingDirectionHandling {
            /** 
             *  ### Establecer dirección de ordenamiento
             *  Función para establecer la dirección de ordenamiento de datos.
             */ 
            setSelectedSortingDirection: React.Dispatch<React.SetStateAction<Set<View._SortingDirectionValue>>>;
        };

        type SortingFields<K extends API.Database.TableName> = View.Tree.SortingFields<K> & _SortingFieldHandling<K> & _SortingDirectionHandling
        // --------------

        type ListDataFetcher<K extends API.Database.TableName> = (
            & View.Tree.SortingFields<K>
            & View.Pagination.Navigation
            & View._SupportsLoading
            & View._RecordsUse<K>
            & Context._DynamicControlsSetter
            & Hook.VisibleColumns<K>
            & Hook.SortingFields<K>
        );

    };

};
