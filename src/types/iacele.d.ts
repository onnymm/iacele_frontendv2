type ModelName = keyof Backend.Models;

declare namespace IACele {

    declare namespace _Base {

        /** 
         *  ### `[Interfaz base]` Nombres de clase
         *  Nombres de clase CSS
         *  ```ts
         *  interface _SupportsClassName {
         *      // Nombres de clase
         *      className?: string;
         *  };
         *  ```
         */ 
        interface _SupportsClassName {
            /** 
             *  ### Nombres de clase
             *  Nombres de clase CSS.
             */ 
            className?: string;
        };

        /** 
         *  ### `[Interfaz base]` Componentes hijos
         *  Componentes hijos que se ingresan entre las etiquetas del componente que
         *  los renderizará.
         *  ```ts
         *  interface _SupportsChildren {
         *      // Componentes hijos
         *      children: React.ReactNode;
         *  };
         *  ```
         */ 
        interface _SupportsChildren {
            /**
             *  ### Componentes hijos
             *  Componentes hijos que se ingresan entre las etiquetas del componente que
             *  los renderizará.
             */ 
            children: React.ReactNode;
        };

        /** 
         *  ### `[Interfaz base]` Componentes hijos
         *  Componentes hijos que se ingresan entre las etiquetas del componente que
         *  los renderizará.
         *  ```ts
         *  interface _SupportsOptionalChildren {
         *      // Componentes hijos
         *      children?: React.ReactNode;
         *  };
         *  ```
         */ 
        interface _SupportsOptionalChildren {
            /**
             *  ### Componentes hijos
             *  Componentes hijos que se ingresan entre las etiquetas del componente que
             *  los renderizará.
             */ 
            children?: React.ReactNode;
        };

        type _DirectOrBuiltValue<I, O> = ( (ctx: I) => (O) ) | O;

        declare namespace _State {

            interface _IsFocused {
                /** 
                 *  ### Está enfocado
                 *  Estado que indica que el componente está enfocado.
                 */ 
                isFocused: boolean;
            };

            interface _IsIconOnly {
                /** 
                 *  ### Es solo ícono
                 *  Valor que el botón solo renderiza un ícono.
                 */ 
                isIconOnly?: boolean | undefined;
            };

            interface _StartContent {
                /** 
                 *  ### Contenido inicial
                 *  Componente que se renderizará al inicio.
                 */ 
                startContent?: React.ReactNode;
            };
            
            interface _EndContent {
                /** 
                 *  ### Contenido final
                 *  Componente que se renderizará al final.
                 */ 
                endContent?: React.ReactNode;
            };

            interface _IsDisabled {
                /** 
                 *  ### Está deshabilitado
                 *  Estado que indica que el componente está deshabilitado para interactuar con él.
                 */ 
                isDisabled?: boolean;
            };

            interface _HasTTypeName {
                /** 
                 *  #### Tipo de dato de campo
                 *  Nombre de tipo de dato de campo.
                 */ 
                ttype: IACele.Data.Models.TTypeName;
            };

            interface _HasRelatedModelName<M extends ModelName>{
                /** 
                 *  ### Nombre de modelo relacionado
                 *  Nombre de modelo relacionado de un campo.
                 */ 
                relatedModelName: M;
            };

            interface IsOpen {
                /** 
                 *  ### Modal abierto
                 *  Estado que indica si el modal está abierto.
                 */ 
                isOpen: boolean;
            };

        };

        declare namespace _EventCallback {

            interface _OnFocus {
                /** 
                 *  ### Cuando se enfoca
                 *  Función a ejecutar cuando el componente se enfoca.
                 */ 
                onFocus: () => void;
            };

            interface _OnBlur {
                /**
                 *  ### Cuando se desenfoca
                 *  Función a ejecutar cuando el componente se desenfoca.
                 */
                onBlur: () => void;
            };

            interface OnClick<E, T> {
                /** 
                 *  ### Cuando se cliquea
                 *  Función a ejecutar cuando el componente es cliqueado.
                 */ 
                onClick?: (event: React.MouseEvent<E, T>) => void;
            };

            interface _OnPress {
                /** 
                 *  ### Cuando se termina de presionar
                 *  Función a ejecutar cuando el componente termina de ser presionado.
                 */ 
                onPress: () => void;
            };

            interface _OnValueChange <T>{
                /** 
                 *  ### Cambio de estado de valor
                 *  Función de cambio de estado de valor de campo.
                 */ 
                onValueChange: (value: T) => void;
            };

        };

        declare namespace _Callback {

            /** 
             *  ### `[Interfaz base]` Función de recarga
             *  Valor de función de recarga de datos.
             *  ```ts
             *  interface _Reload {
             *      // Función de recarga
             *      reload: () => void;
             *  };
             *  ```
             */ 
            interface _Reload {
                /** 
                 *  #### Función de recarga
                 *  Esta función, cuando se ejecuta, desencadena una nueva llamada a la API
                 *  para actualizar los datos del registro en la vista del formulario.
                 */ 
                reload: () => void;
            };

            /** 
             *  ### Crear registro
             *  Valor de función de cambio de modo de formulario para creación de registro.
             *  
             *  ```ts
             *  interface NewRecord {
             *      // Crear registro
             *      newRecord: () => void;
             *  };
             *  ```
             */ 
            interface _NewRecord {
                /** 
                 *  #### Crear registro
                 *  Esta función cambia el modo de formulario a creación y vacía los datos del
                 *  registro del formulario para ser escritos desde cero.
                 *  
                 *  ```ts
                 *  const newRecord = () => {...};
                 *  ```
                 */ 
                newRecord: () => void;
            };

            /** 
            *  ### Deshacer cambios
            *  Función para deshacer los cambios de un formulario.
            *  ```ts
            *  interface Undo {
            *      // Deshacer cambios
            *      undoChanges: () => void;
            *  };
            *  ```
            */ 
            interface _UndoChanges {
                /** 
                *  #### Deshacer cambios
                *  Función que revierte los cambios realizados en los datos del formulario en
                *  un registro o retrocede de modo de creación a modo de lectura en función
                *  del modo actual del formulario.
                *  ```ts
                *  const undoChanges = async () => {...};
                *  ```
                */ 
                undoChanges: () => void;
            };

            /** 
            *  ### Actualización de registro
            *  Valor de función de actualización de registro.
            *  ```ts
            *  interface UpdateRecord {
            *      // Función de actualización de registro
            *      updateRecord: () => Promise<void>;
            *  };
            *  ```
            */ 
            interface UpdateRecord {
                /** 
                *  #### Función de actualización de registro
                *  Esta función ejecuta la actualización de datos de un registro utilizando
                *  los datos del registro en formulario.
                *  ```ts
                *  const updateRecord = async () => {...};
                *  ```
                */ 
                updateRecord: () => Promise<void>;
            };

            /** 
             *  ### Creación de registro
             *  Valor de función de creación de registro.
             *  ```ts
             *  interface CreateRecord {
             *      // Función de creación de registro
             *      createRecord: () => Promise<void>;
             *  };
             *  ```
            */ 
            interface CreateRecord {
                /** 
                *  #### Función de creación de registro
                *  Esta función ejecuta la creación de un registro en la base de datos usando
                *  una función del módulo de comunicación con la API del servidor usando los
                *  datos del registro en el formulario.
                *  
                *  ```ts
                *  const createRecord = async () => {...};
                *  ```
                */ 
                createRecord: () => Promise<void>;
            };

            /** 
            *  ### Guardar cambios
            *  Función que guarda cambios en un registro nuevo existente.
            *  ```ts
            *  interface SaveRecord {
            *      // Guardar cambios
            *      saveChanges: () => void;
            *  };
            *  ```
            */ 
            interface _SaveRecord {
                /** 
                *  #### Guardar cambios
                *  Esta función ejecuta la creacíón o modificación de un registro en la base
                *  de datos.
                *  ```ts
                *  const saveChanges = async () => {...};
                *  ```
                */ 
                saveChanges: () => void;
            };

            /** 
            *  ### Eliminar registro
            *  Función que elimina un registro de la base de datos.
            *  ```ts
            *  interface Delete {
            *      // Eliminar registro
            *      deleteRecord: () => Promise<void>;
            *  };
            *  ```
            */ 
            interface _DeleteRecord {
                /** 
                *  #### Eliminar registro
                *  Función que ejecuta la eliminación del registro que se está mostrando en el
                *  formulario.
                *  ```ts
                *  const deleteRecord = async () => {...};
                *  ```
                */ 
                deleteRecord: () => Promise<void>;
            };

            interface _OnClick {
                /** 
                 *  ### Al ser cliqueado
                 *  Función que se ejecuta cuando un evento de clic se dispara.
                 */ 
                onClick: () => (void);
            }

        };

    };

    declare namespace Common {

        type VoidCallback = () => (void);

    };

    declare namespace Data {

        declare namespace _Base {

            /** 
             *  ### Llave de nulidad
             *  Valor que indica que el tipo de dato es nulo o no.
             */ 
            type _NullabilityKey = 'null_' | 'not_null';

            /** 
             *  ### Es nulo o no
             *  Interfaz para definición de un dato posiblemente o no nulo.
             */ 
            interface _WithNullOption<T>{
                'null_': T | null;
                'not_null': T;
            };

            declare namespace _Type {

                // Tipo de dato simple
                type Single<T, N extends _NullabilityKey = 'null_'> = _WithNullOption<T>[N];

                // Tipo de dato relacionado
                type Relational<M extends ModelName> = Models.Record<M>[];

            };

            /** 
             *  ### Selección de campo
             *  Tipo de dato de selección de campo.
             */ 
            interface _FieldSelection {
                /** 
                 *  ### ID
                 *  ID del campo de modelo.
                 */ 
                id: TType.Integer<'not_null'>;
                /** 
                 *  ### Nombre
                 *  Nombre del campo de modelo.
                 */ 
                name: TType.Char<'not_null'>;
                /** 
                 *  ### Etiqueta
                 *  Etiqueta del campo de modelo.
                 */ 
                label: TType.Char<'not_null'>;
            };

        };

        declare namespace _Filtering {

            /** 
             *  ### Operador de comparación
             *  Operador de comparación entre el nombre de un campo de modelo y un valor.
             *  
             *  Los operadores de comparación disponibles son:
             *  - `'='`: Igual a
             *  - `'!='`: Diferente de
             *  - `'>'`: Mayor a
             *  - `'>='`: Mayor o igual a
             *  - `'<'`: Menor que
             *  - `'<='`: Menor o igual que
             *  - `'><'`: Entre
             *  - `'in'`: Está en
             *  - `'not in'`: No está en
             *  - `'ilike'`: Contiene
             *  - `'not ilike'`: No contiene
             *  - `'~'`: Coincide con expresión regular (sensible a mayúsculas y minúsculas)
             *  - `'~*'`: Coincide con expresión regular (no sensible a mayúsculas y minúsculas)
             */ 
            type ComparisonOperator = (
                | '=' 
                | '!=' 
                | '>' 
                | '>=' 
                | '<' 
                | '<=' 
                | '><' 
                | 'in' 
                | 'not in' 
                | 'ilike' 
                | 'not ilike' 
                | '~' 
                | '~*'
            );

            /** 
             *  ### Operador lógico
             *  Operador lógico para unir múltiples filtros
             *  
             *  Los operadores lógicos disponibles son:
             *  - `'&'`: AND
             *  - `'|'`: OR
             */ 
            type LogicOperator = '&' | '|';

            /** 
             *  ### Valor de tripleta
             *  Valor válido en declaraciones de filtros.
             */ 
            type TripletValue = string | number | boolean | (string | number | boolean | null)[] | null;

            /** 
             *  ### Tripleta base
             *  Estructura base de tripleta.
             */ 
            type _BaseTriplet<T> = [T, ComparisonOperator, TripletValue];

            /** 
             *  ### Estructura de tripleta
             *  Estructura dinámica de tripleta que usa nombres de campo dinámicos en base
             *  al nombre de modelo usado.
             */ 
            type _TripletStructure<M extends ModelName> = _BaseTriplet<string> | _BaseTriplet<FieldName<M>>;

            /** 
             *  La estructura de criterio de búsqueda permite construir filtros tan
             *  complejos y específicos como sea necesario.
             *  
             *  Primeramente, cada filtro de búsqueda se forma de tres elementos dentro de un array:
             *  - Nombre del campo en el modelo
             *  - Operador de comparación
             *  - Valor
             *  
             *  ```ts
             *  ["active", "=", true]
             *  ```
             *  
             *  Sea uno o muchos filtros, se envuelven dentro de un array padre:
             *  ```ts
             *  [["active", "=", true]]
             *  ```
             *  
             *  Para usarse más de un filtro se unen por medio de operadores lógicos `'&'` (AND)
             *  y `'|'` (OR) seguidos de los filtros como segundo y tercer lugar:
             *  ```ts
             *  [
             *      "&",
             *          ["active", "=", true],
             *          ["create_date", ">", "2025-08-29"]
             *  ]
             *  ```
             */ 
            type _CriteriaStructure<M extends ModelName> = (LogicOperator | _TripletStructure<M>)[];

        };

        declare namespace Models {

            declare namespace TType {
                /** 
                 *  ### Tipo de dato `[entero]`
                 *  Tipo de dato numérico sin decimales.
                 *  ```ts
                 *  const value: Integer = ...;
                 *  // number | null
                 *  const value: Integer<'not_null'> = ...;
                 *  // number
                 *  
                 *  // Ejemplo 1
                 *  5
                 *  // Ejemplo 2
                 *  10
                 *  // Nulo
                 *  null
                 *  ```
                 */ 
                type Integer<N extends Data._Base._NullabilityKey = 'null_'> = Data._Base._Type.Single<number, N>;
                /** 
                 *  ### Tipo de dato `[caracter]`
                 *  Tipo de dato de cadena de texto.
                 *  ```ts
                 *  const value: Char = ...;
                 *  // string | null
                 *  const value: Char<'not_null'> = ...;
                 *  // string
                 *  
                 *  // Ejemplo 1
                 *  'onnymm'
                 *  // Ejemplo 2
                 *  'lumii'
                 *  // Nulo
                 *  null
                 *  ```
                 */ 
                type Char<N extends Data._Base._NullabilityKey = 'null_'> = Data._Base._Type.Single<string, N>;
                /** 
                 *  ### Tipo de dato `[flotante]`
                 *  Tipo de dato numérico con punto decimal.
                 *  ```ts
                 *  const value: Float = ...;
                 *  // number | null
                 *  const value: Float<'not_null'> = ...;
                 *  // number
                 *  
                 *  // Ejemplo 1
                 *  5.0
                 *  // Ejemplo 2
                 *  2.5
                 *  // Nulo
                 *  null
                 *  ```
                 */ 
                type Float<N extends Data._Base._NullabilityKey = 'null_'> = Data._Base._Type.Single<number, N>;
                /** 
                 *  ### Tipo de dato `[booleano]`
                 *  ```ts
                 *  const value: Boolean = ...;
                 *  // boolean | null
                 *  const value: Boolean<'not_null'> = ...;
                 *  // boolean
                 *  
                 *  // Ejemplo 1
                 *  true
                 *  // Ejemplo 2
                 *  false
                 *  // Nulo
                 *  null
                 *  ```
                 */ 
                type Boolean<N extends Data._Base._NullabilityKey = 'null_'> = Data._Base._Type.Single<boolean, N>;
                /** 
                 *  ### Tipo de dato `[fecha]`
                 *  Tipo de dato de fecha en formado `AAAA-MM-DD`.
                 *  ```ts
                 *  const value: Date = ...;
                 *  // string | null
                 *  const value: Date<'not_null'> = ...;
                 *  // string
                 *  
                 *  // Ejemplo 1
                 *  '2025-09-04'
                 *  // Ejemplo 2
                 *  '1998-07-28'
                 *  // Nulo
                 *  null
                 *  ```
                 */ 
                type Date<N extends Data._Base._NullabilityKey = 'null_'> = Data._Base._Type.Single<string, N>;
                /** 
                 *  ### Tipo de dato `[fecha y hora]`
                 *  Tipo de dato de fecha y hora en formato `AAAA-MM-DD hh-mm-ss`. El formato de hora es de 24 horas.
                 *  ```ts
                 *  const value: Datetime = ...;
                 *  // string | null
                 *  const value: Datetime<'not_null'> = ...;
                 *  // string
                 *  
                 *  // Ejemplo 1
                 *  '2025-09-04 11:54:30'
                 *  // Ejemplo 2
                 *  '1998-07-28 22:45:15'
                 *  // Nulo
                 *  null
                 *  ```
                 */ 
                type Datetime<N extends Data._Base._NullabilityKey = 'null_'> = Data._Base._Type.Single<string, N>;
                /** 
                 *  ### Tipo de dato `[hora]`
                 *  Tipo de dato de hora en formato `hh-mm-ss` en en formato de 24 horas.
                 *  ```ts
                 *  const value: Time = ...;
                 *  // string | null
                 *  const value: Time<'not_null'> = ...;
                 *  // string
                 *  
                 *  // Ejemplo 1
                 *  '11:54:30'
                 *  // Ejemplo 2
                 *  '22:45:15'
                 *  // Nulo
                 *  null
                 *  ```
                 */ 
                type Time<N extends Data._Base._NullabilityKey = 'null_'> = Data._Base._Type.Single<string, N>;
                /** 
                 *  ### Tipo de dato `[duration]`
                 *  Tipo de dato de duración en formato `hh-mm-ss`.
                 *  ```ts
                 *  const value: Duration = ...;
                 *  // string | null
                 *  const value: Duration<'not_null'> = ...;
                 *  // string
                 *  
                 *  // Ejemplo 1
                 *  '00:30:00'
                 *  // Ejemplo 2
                 *  '36:00:00'
                 *  // Nulo
                 *  null
                 *  ```
                 */ 
                type Duration<N extends Data._Base._NullabilityKey = 'null_'> = Data._Base._Type.Single<string, N>;
                /** 
                 *  ### Tipo de dato `[texto]`
                 *  Tipo de dato de texto largo.
                 *  ```ts
                 *  const value: Text = ...;
                 *  // string | null
                 *  const value: Text<'not_null'> = ...;
                 *  // string
                 *  
                 *  // Ejemplo 1
                 *  'Esto es la descripción del campo de un modelo en la base de datos que...'
                 *  // Ejemplo 2
                 *  'Esto es la descripción de un modelo personalidado el cual sirve para...'
                 *  // Nulo
                 *  null
                 *  ```
                 */ 
                type Text<N extends Data._Base._NullabilityKey = 'null_'> = Data._Base._Type.Single<string, N>;
                /** 
                 *  ### Tipo de dato `[selección]`
                 *  Tipo de dato de selección.
                 *  ```ts
                 *  const value: Selection<'a' | 'b'> = ...;
                 *  // 'a' | 'b' | null
                 *  const value: Selection<'a' | 'b', 'not_null'> = ...;
                 *  // 'a' | 'b'
                 *  
                 *  // Ejemplo 1
                 *  'a'
                 *  // Ejemplo 2
                 *  'b'
                 *  // Nulo
                 *  null
                 *  ```
                 */ 
                type Selection<O extends string, N extends Data._Base._NullabilityKey = 'null_'> = Data._Base._Type.Single<O, N>;
                /** 
                 *  ### Tipo de dato `[archivo]`
                 *  Tipo de dato de archivo binario.
                 *  ```ts
                 *  const value: File = ...;
                 *  // string | null;
                 *  const value: File<'not_null'> = ...;
                 *  // string;
                 *  
                 *  // Ejemplo 1
                 *  '/9j/4AAQSkZJRgABAQAAAQABAAD/4QBgRXhpZgAASUkqAAgAAAACADEBAgAHAAAAJgAAAGmHBAABA...'
                 *  // Ejemplo 2
                 *  '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAcJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJC...'
                 *  // Nulo
                 *  null
                 *  ```
                 */ 
                type File<N extends Data._Base._NullabilityKey = 'null_'> = Data._Base._Type.Single<string, N>;
                /** 
                 *  ### Tipo de dato `[many2one]`
                 *  Tipo de dato de muchos a uno. Tupla que contiene la ID del registro y su
                 *  nombre.
                 *  ```ts
                 *  const value: Many2One = ...;
                 *  // [number, string] | null;
                 *  const value: Many2One<'not_null'> = ...;
                 *  // [number, string];
                 *  
                 *  // Ejemplo 1
                 *  [2, 'onnymm']
                 *  // Ejemplo 2
                 *  [1, 'base_model']
                 *  // Nulo
                 *  null
                 *  ```
                 */ 
                type Many2One<N extends Data._Base._NullabilityKey = 'null_'> = Data._Base._Type.Single<[number, string], N>;
                /** 
                 *  ### Tipo de dato `[one2many]`
                 *  Tipo de dato de uno a muchos. Array de registros del tipo que se
                 *  especifique en el genérico.
                 *  ```ts
                 *  const value: One2Many<'base.users'> = ...;
                 *  // {id: number, name: string, login: string...}[];
                 *  const value: One2Many<'base.model.field'> = ...;
                 *  // {id: number, name: string, model_id: [number, string]...}[];
                 *  
                 *  // Ejemplo 1
                 *  [{id: 1, name: 'iaCele', ...}, {...}, ...]
                 *  // Ejemplo 2
                 *  [{id: 1, name: 'base_model', ...}, {...}, ...]
                 *  // Nulo
                 *  []
                 *  ```
                 */ 
                type One2Many<M extends ModelName> = Data._Base._Type.Relational<M>;
                /** 
                 *  ### Tipo de dato `[many2many]`
                 *  Tipo de dato de muchos a muchos. Array de registros del tipo que se
                 *  especifique en el genérico.
                 *  ```ts
                 *  const value: Many2Many<'base.users'> = ...;
                 *  // {id: number, name: string, login: string...}[];
                 *  const value: Many2Many<'base.model.field'> = ...;
                 *  // {id: number, name: string, model_id: [number, string]...}[];
                 *  
                 *  // Ejemplo 1
                 *  [{id: 1, name: 'iaCele', ...}, {...}, ...]
                 *  // Ejemplo 2
                 *  [{id: 1, name: 'base_model', ...}, {...}, ...]
                 *  // Nulo
                 *  []
                 *  ```
                 */ 
                type Many2Many<M extends ModelName> = Data._Base._Type.Relational<M>;
            };

            /** 
             *  ### Modelo base
             *  Campos base de modelos de base de datos.
             */ 
            interface _BaseModel {
                id: TType.Integer<'not_null'>;
                name: TType.Char<'not_null'>;
                create_date: TType.Datetime<'not_null'>;
                write_date: TType.Datetime<'not_null'>;
                create_uid: TType.Many2One<'not_null'>;
                write_uid: TType.Many2One<'not_null'>;
            };

            /** 
             *  ### Registro de base de datos
             *  Tipo de dato de registro de base de datos.
             *  
             *  ```ts
             *  Record<'base.users'>
             *  {
             *      id: TType.Integer<'not_null'>;
             *      name: TType.Char<'not_null'>;
             *      create_date: TType.Datetime<'not_null'>;
             *      write_date: TType.Datetime<'not_null'>;
             *      create_uid: TType.Many2One<'not_null'>;
             *      write_uid: TType.Many2One<'not_null'>;
             *      login: BackendV2.TType.Char<"not_null">;
             *      password: BackendV2.TType.Char<"not_null">;
             *      active: BackendV2.TType.Boolean<"not_null">;
             *      sync: BackendV2.TType.Boolean<"not_null">;
             *      role_ids: BackendV2.TType.Many2Many<"base.users.role">;
             *      odoo_id: BackendV2.TType.Integer;
             *      birthday_date: BackendV2.TType.Date;
             *  }
             *  ```
             */ 
            type Record<M extends ModelName> = (
                & _BaseModel
                & Backend.Models[M]
            );

            /** 
             *  ### Nombre de campo
             *  Nombre de campo de un modelo `M`
             *  
             *  ```ts
             *  const f: FieldName<'base.model'>
             *  // "model" | "label" | "description" | ...
             *  ```
             */ 
            type FieldName<M extends ModelName> = keyof Record<M>;

            /** 
             *  ### Valor de campo de modelo
             *  Tipo de dato del valor de un campo especificado.
             *  ```ts
             *  const v: FieldValue<'base.model', 'id'>
             *  // number
             *  ```
             */ 
            type FieldValue<M extends ModelName, F extends FieldName<M>> = Record<M>[F];

            /** 
             *  ### Nombre de tipo de dato
             *  Nombre de tipo de dato de campo de modelo de base de datos.
             */ 
            type TTypeName = (
                | 'integer'
                | 'char'
                | 'float'
                | 'boolean'
                | 'date'
                | 'datetime'
                | 'time'
                | 'duration'
                | 'text'
                | 'selection'
                | 'file'
                | 'many2one'
                | 'one2many'
                | 'many2many'
            );

            /** 
             *  ### Metadatos de campo
             *  Metadatos para renderizar un campo en vista de tabla o formulario de manera
             *  dinámica.
             */ 
            interface Field<M extends ModelName> {
                id: TType.Integer<'not_null'>;
                name: FieldName<M>;
                label: TType.Char<'not_null'>;
                ttype: TType.Selection<TTypeName, 'not_null'>;
                help_info: TType.Text;
                model: ModelName;
                readonly: TType.Boolean<'not_null'>;
                selection_ids: _Base._FieldSelection[];
                is_required: TType.Boolean<'not_null'>;
                is_computed: TType.Boolean<'not_null'>;
            };

            /** 
             *  ### Es Many2One
             *  Tipo de dato que evalúa si un genérico entrante es de tipo Many2One.
             */ 
            type IsMany2One<T> = (
                T extends TType.Many2One
                    ? true
                    : false
            );

            /** 
             *  ### Es One2Many
             *  Tipo de dato que evalúa si un genérico entrante es de tipo One2Many.
             */ 
            type IsOne2Many<T> = (
                T extends TType.One2Many<any>
                    // Las tuplas Many2One<'not_null'> pueden extender desde One2Many<any>
                    ? IsMany2One<T> extends false
                        ? true
                        : false
                    : false
            );

            /** 
             *  ### Nombre de campo relacional One2Many
             *  Literales de nombres de campos que son de tipo One2Many en un modelo
             *  específicado.
             */ 
            type One2ManyRelatedField<M extends ModelName> = {
                [ F in keyof Record<M> ]-?: IsOne2Many<Record<M>[F]> extends true
                    ? F
                    : never
            }[keyof Record<M>]

            /** 
             *  ### Nombre de campo relacionado
             *  Tipo de dato para declarar el nombre de un modelo relacionado a partir de
             *  un campo de tipo One2Many o Many2Many de un modelo especificado.
             */ 
            type RelatedModelName<M extends ModelName, F extends FieldName<M>> = (
                Record<M>[F] extends TType.One2Many<infer R>
                    ? R
                    : never
            );

            /** 
             *  La estructura de criterio de búsqueda permite construir filtros tan
             *  complejos y específicos como sea necesario.
             *  
             *  Primeramente, cada filtro de búsqueda se forma de tres elementos dentro de un array:
             *  - Nombre del campo en el modelo
             *  - Operador de comparación
             *  - Valor
             *  
             *  ```ts
             *  ["active", "=", true]
             *  ```
             *  
             *  Sea uno o muchos filtros, se envuelven dentro de un array padre:
             *  ```ts
             *  [["active", "=", true]]
             *  ```
             *  
             *  Para usarse más de un filtro se unen por medio de operadores lógicos `'&'` (AND)
             *  y `'|'` (OR) seguidos de los filtros como segundo y tercer lugar:
             *  ```ts
             *  [
             *      "&",
             *          ["active", "=", true],
             *          ["create_date", ">", "2025-08-29"]
             *  ]
             *  ```
             */ 
            type CriteriaStructure<M extends ModelName> = _Filtering._CriteriaStructure<M>;

        };

    };

    // -------------------

    declare namespace View {

        declare namespace _Base {

            /** 
             *  ### Cómputo de valor desde registro
             *  Este tipo de dato permite la declaración de un parámetro que puede ser un
             *  valor de tipo `T` o una función que toma como entrada los atributos de un
             *  registro de la base de datos y retorna un resultado de tipo `T`.
             *  
             *  ```ts
             *  interface Params <M extends ModelName>{
             *      readonly: ComputeFromRecord<M, boolean>;
             *  };
             *  
             *  // Ejemplo de función
             *  const readonly: ComputeFromRecord<'base.model', boolean> = ({ name }) => (name === 'base_model');
             *  // Ejemplo de valor
             *  const readonly: true;
             *  ```
             */ 
            type _ComputeFromRecord<M extends ModelName, T> = IACele._Base._DirectOrBuiltValue<Data.Models.Record<M>, T>

            /** 
             *  ### `[Interfaz base]` Solo lectura
             *  Valor que indica que la vista es de solo lectura.
             *  ```ts
             *  interface _OptionalReadonly {
             *      // Solo lectura
             *      readonly?: boolean;
             *  };
             *  ```
             */ 
            interface _OptionalReadonly {
                /**
                 *  ### Solo lectura
                 *  Valor que indica que la vista es de solo lectura.
                 */ 
                readonly?: boolean;
            };

            interface _HasOptionalLabel {
                /** 
                 *  ### Nombre / etiqueta
                 *  Nombre / etiqueta opcional que mostrará el componente.
                 */ 
                label?: string;
            };

            interface _RequiresModelName <M extends ModelName>{
                /** 
                 *  ### Nombre de modelo
                 *  Nombre de modelo en la base de datos.
                 */ 
                modelName: M;
            };

            interface _HasOptionalReadonly<M extends ModelName> {
                /** 
                 *  ### Es solo lectura
                 *  Valor booleano o función de validación que define si el componente y su
                 *  contenido es de solo lectura.
                 */ 
                readonly?: _ComputeFromRecord<M, boolean>;
            };

            interface _HasOptionalInvisible<M extends ModelName>{
                /** 
                 *  ### Puede ser invisible
                 *  Valor booleano o función de validación que define si el componente debe
                 *  mostrarse o no.
                 */ 
                invisible?: _ComputeFromRecord<M, boolean>;
            };

            interface _ConditionalColorDecoration<M extends ModelName> {
                /** 
                 *  ### Color de decoración
                 *  Objeto que contiene funciones de validación.
                 */ 
                decoration?: ColorDecoration<M>;
            };

            interface _HasDomain <M extends ModelName> {
                /** 
                 *  ### Dominio de búsqueda
                 *  Dominio de búsqueda para delimitar las opciones disponibles al vincular un
                 *  registro desde otro modelo de la base de datos.
                 */ 
                domain?: _ComputeFromRecord<M, Data.Models.CriteriaStructure<M>>;
            };

            interface _HasWidgetName {
                /** 
                 *  ### Nombre de widget
                 *  Nombre de widget.
                 */ 
                widget?: View.Widget.Name;
            };

            interface _HasPlaceholder {
                /** 
                 *  ### Placeholder
                 *  Placeholder para campo editable desde teclado
                 */ 
                placeholder?: string;
            };

            interface _HasMinValue {
                /** 
                 *  ### Valor mínimo
                 *  Valor mínimo oara tipo de dato numérico.
                 */ 
                min?: number;
            };

            interface _HasMaxValue {
                /** 
                 *  ### Valor máximo
                 *  Valor máximo para tipo de dato numérico.
                 */ 
                max?: number;
            };

            interface _HasNumericStep {
                /** 
                 *  ### Paso
                 *  Valor que delimita los pasos numéricos para tipo de dato numérico.
                 */ 
                step?: number;
            };

        };

        interface HasFieldName<M extends ModelName> {
            /** 
             *  ### Nombre de campo
             *  Nombre de campo.
             */ 
            name: IACele.Data.Models.FieldName<M>;
        };

        interface ExecuteFormValidation <M extends ModelName>{
            /** 
             *  ### Ejecutar validación de formulario
             *  Esta función recibe un valor booleano, indefinido o una función flecha
             *  diseñada para recibir los valores de datos del registro del formulario y
             *  que retorna un valor convertible a booleano. La función generada por este
             *  hook realiza la validación del valor o función provista para reotnar un
             *  valor booleano y definir los comportamientos de un componente en la vista
             *  del formulario.
             */ 
            executeFormValidation: (validation: _Base._ComputeFromRecord<M, boolean> | undefined) => (boolean);
        };

        type UsingRecord<M extends ModelName, T> = _Base._ComputeFromRecord<M, T>

        interface ColorDecoration <M extends ModelName>{
            /** 
             *  #### Color de decoración (Información)
             *  Función o valor de validación para indicar que un componente debe
             *  o no colorearse en el color codificado como información.
             */ 
            info?: _UsingRecord<M, boolean>;
            /** 
             *  #### Color de decoración (Éxito)
             *  Función o valor de validación para indicar que un componente debe
             *  o no colorearse en el color codificado como éxito.
             */ 
            success?: _UsingRecord<M, boolean>;
            /** 
             *  #### Color de decoración (Advertencia)
             *  Función o valor de validación para indicar que un componente debe
             *  o no colorearse en el color codificado como advertencia.
             */ 
            warning?: _UsingRecord<M, boolean>;
            /** 
             *  #### Color de decoración (Peligro)
             *  Función o valor de validación para indicar que un componente debe
             *  o no colorearse en el color codificado como peligro.
             */ 
            danger?: _UsingRecord<M, boolean>;
        };

        interface Reload {
            /** 
             *  ### Señal de recarga
             *  Estado que se usa para provocar la ejecución de una recarga.
             */ 
            reloadSignal: boolean;
            /** 
             *  ### Interruptor de recarga
             *  Función que se ejecuta para provocar la ejecución de una recarga en donde
             *  se colocó el estado de señal de recarga.
             */ 
            reload: () => void;
        };

        declare namespace Widget {

            type Name = (
                | 'char'
                | 'integer'
                | 'float'
                | 'boolean'
                | 'text'
                | 'selection'
                | 'many2one'
                | 'duration'
                | 'datetime'
                | 'date'
                | 'time'
                | 'one2many'

                // Extensiones
                | 'check'
                | 'switch'
            );

        };

        declare namespace Tree {

            declare namespace _Base {

                declare namespace Object {

                    interface Config<
                        M extends ModelName,
                        F extends Data.Models.FieldName<M>,
                        R extends Data.Models.RelatedModelName<M, F>
                    > extends IACele.View.HasFieldName<R>{
                        /** 
                         *  ### Etiqueta de campo
                         *  Etiqueta de campo.
                         */ 
                        label?: string;
                    };

                };

                declare namespace Callback {

                    interface _GetTType<M extends ModelName>{
                        /** 
                         *  ### Obtención de tipo de dato
                         *  Función de obtención de tipo de dato de campo.
                         */ 
                        getTType: (name: IACele.Data.Models.FieldName<M>) => IACele.Data.Models.TTypeName;
                    };

                    interface ComputeLabel<M extends ModelName>{
                        /** 
                         *  ### Computar etiqueta
                         *  Función de cómputo de etiqueta para campo.
                         */ 
                        computeLabel: (name: IACele.Data.Models.FieldName<M>) => string;
                    };

                    interface TreeRecordsIndex<M extends ModelName>{
                        /** 
                         *  ### Índice de registros
                         *  Objeto que contiene datos de registro y los indexa por su ID.
                         */ 
                        treeRecordsIndex: Record<number, IACele.Data.Models.Record<M>>;
                    };

                    interface CreateSetFormRecordField<M extends ModelName>{
                        /** 
                         *  ### Creación de cambio de valor de campo
                         *  Función de creación de función de cambio de estado de valor de campo de
                         *  registro de árbol.
                         */ 
                        createSetFormRecordField: (id: number) => Form.FieldValueSetter<M>;
                    };

                };

                interface _TreeConfig<M extends ModelName>{
                    /** 
                     *  ### Configuración de vista de árbol
                     *  Variable de configuración de vista de árbol.
                     */ 
                    treeConfig: IACele.View.Form.Field.Tree.Config<M>[];
                };

                interface _AddConfig<M extends ModelName>{
                    /** 
                     *  ### Añadir configuración
                     *  Añadir configuración de vista de árbol.
                     */ 
                    addConfig: (config: IACele.View.Form.Field.Tree.Config<M>) => void;
                };

                interface _DataLoaded {
                    /** 
                     *  ### Datos cargados
                     *  Estado que indica que los datos han sido cargados. 
                     */ 
                    dataLoaded: boolean;
                };

                interface _SetDataLoaded {
                    /** 
                     *  ### Cambio de datos cargados
                     *  Función de cambio de estado de datos cargados.
                     */ 
                    setDataLoaded: React.Dispatch<React.SetStateAction<boolean>>;
                };

                interface _DataFromAPI<M extends ModelName>{
                    /** 
                     *  ### Datos desde la API
                     *  Array que contiene los datos de registros obtenidos desde la API.
                     */ 
                    dataFromAPI: IACele.Data.Models.Record<M>[];
                };

                interface _SetDataFromAPI<M extends ModelName>{
                    /** 
                     *  ### Cambio de datos desde la API
                     *  Función de cambio de estado de array que contiene los datos de registros
                     *  obtenidos desde la API.
                     */ 
                    setDataFromAPI: React.Dispatch<React.SetStateAction<IACele.Data.Models.Record<M>[]>>;
                };

                interface _MetadataFromAPI<M extends ModelName>{
                    /** 
                     *  ### Metadatos desde la API
                     *  Array que contiene los metadatos de registros obtenidos desde la API.
                     */ 
                    metadataFromAPI: IACele.Data.Models.Field<M>[];
                };

                interface _SetMetadataFromAPI<M extends ModelName>{
                    /** 
                     *  ### Cambio de metadatos desde la API
                     *  Función de cambio de estado de array que contiene los metadatos de
                     *  registros obtenidos desde la API.
                     */ 
                    setMetadataFromAPI: React.Dispatch<React.SetStateAction<IACele.Data.Models.Field<M>[]>>;
                };

                interface RecordIDs {
                    /** 
                     *  ### IDs de registros referenciados
                     *  Array que contiene las IDs de registros referenciados para su lectura en el
                     *  backend.
                     */ 
                    recordIds: number[];
                };

            };

            declare namespace Field {

                interface Params<
                    M extends ModelName,
                    F extends Data.Models.FieldName<M>,
                    R extends Data.Models.RelatedModelName<M, F>
                >{
                    name: IACele.Data.Models.FieldName<R>;
                    label?: string;
                };

            };

            interface Data <M extends ModelName>{
                records: IACele.Data.Models.Record<M>[];
                fields: IACele.Data.Models.Field<M>[];
            };

        };

        declare namespace Form {

            declare namespace Field {

                type _FormFieldParams<M extends ModelName> = (
                    & View.HasFieldName<M>
                    & View.ComputedLabel
                );
                interface FormFieldParams <M extends ModelName> extends _FormFieldParams<M>{
                    Widget: React.FC
                };

                declare namespace _Base {

                    type _BaseParams <M extends ModelName> = (
                        & View._Base._HasOptionalReadonly<M>
                        & View._Base._HasOptionalInvisible<M>
                        & View._Base._ConditionalColorDecoration<M>
                        & View._Base._HasDomain<M>
                        & View._Base._HasPlaceholder
                        & View._Base._HasWidgetName
                        & View._Base._HasMinValue
                        & View._Base._HasMaxValue
                        & View._Base._HasNumericStep
                    );
                    /** 
                     *  ### Parámetros base de campo de formulario
                     *  Parámetros comunes de tipos de campo de formulario.
                     */ 
                    interface _Params <M extends ModelName> extends _BaseParams<M>{
                        /** 
                         *  ### Nombre o etiqueta
                         *  Nombre do etiqueta opcional para el campo
                         */ 
                        label?: string;
                    };

                    /** 
                     *  ### Campo simple
                     *  Parámetros de campo simple de formulario.
                     */ 
                    interface _SingleFieldParams <M extends ModelName> extends _Params<M>{
                        /** 
                         *  ### Nombre de campo
                         *  Nombre de campo del registro del modelo.
                         */ 
                        name: IACele.Data.Models.FieldName<M>;
                        /** 
                         *  ### Contenido
                         *  Propiedad no disponible desde esta interfaz
                         */ 
                        children?: undefined;
                    };

                    /** 
                     *  ### Campo a árbol
                     *  Parámetros de campo para ser convertido a árbol.
                     */ 
                    interface _RelatedFieldParams <
                        M extends ModelName,
                        F extends Data.Models.FieldName<M>
                    > extends _Params<M>{
                        /** 
                         *  ### Nombre de campo relacionado
                         *  Nombre de campo relacionado del registro del modelo.
                         */ 
                        name: F;
                        /** 
                         *  ### Contenido
                         *  Contenido a renderizar dentro del contexto del campo.
                         */ 
                        children: Tree.Children.Callback<Data.Models.RelatedModelName<M, F>>;
                    };

                };

                /** 
                 *  ### Parámetros de campo de formulario
                 *  Parámetros de campo de formulario.
                 */ 
                type Params <
                    M extends ModelName,
                    F extends Data.Models.FieldName<M>
                > = (
                    F extends Data.Models.One2ManyRelatedField<M>
                        ? _Base._RelatedFieldParams<M, F>
                        : _Base._SingleFieldParams<M>
                );

                declare namespace Tree {

                    declare namespace Wrapper {

                        interface Params <
                            M extends ModelName,
                            F extends IACele.Data.Models.FieldName<M>,
                            R extends IACele.Data.Models.RelatedModelName<M, F>,
                        >{
                            config: IACele.View.Form.Field.Tree.Children.Callback<R>;
                        };

                    };

                    /** 
                     *  ### Parámetros de árbol
                     *  Interfaz para componente de campo.
                     */ 
                    type Params = GenericWrapperComponent;

                    declare namespace Children {

                        /** 
                         *  ### Vista de árbol
                         *  Interfaz para parámetros de función render de vista de árbol.
                         */ 
                        interface Params <M extends ModelName>{
                            /** 
                             *  ### Árbol
                             *  Componente de árbol.
                             */ 
                            Tree: React.FC<Tree.Params>;
                            /** 
                             *  ### Campo de árbol
                             *  Componente de campo para contenido de componente de árbol.
                             */ 
                            Field: React.FC<Field._Base._SingleFieldParams<M>>;
                        };

                        /** 
                         *  ### Función render
                         *  Función para renderizar vista declarativa de árbol dentro de campo de formulario.
                         */ 
                        type Callback<M extends ModelName> = (components: Params<M>) => (React.ReactNode);

                    };

                    interface Config<M extends ModelName> extends IACele.View.HasFieldName<M>{
                        /** 
                         *  ### Etiqueta de campo
                         *  Etiqueta de campo.
                         */ 
                        label?: string;
                    };

                    type __Base<
                        M extends ModelName,
                        F extends Data.Models.One2ManyRelatedField<M>,
                        R extends Data.Models.RelatedModelName<M, F>
                    > = (
                        & IACele.View.HasFieldName<M>
                        & IACele._Base._State._HasRelatedModelName<R>
                        & IACele.View.Tree._Base._TreeConfig<R>
                        & IACele.View.Tree._Base._AddConfig<R>
                        & IACele.View.Tree._Base._DataLoaded
                        & IACele.View.Tree._Base._SetDataLoaded
                        & IACele.View.Tree._Base._DataFromAPI<R>
                        & IACele.View.Tree._Base._MetadataFromAPI<R>
                    );
                    interface Hook<
                        M extends ModelName,
                        F extends Data.Models.FieldName<M>,
                        R extends Data.Models.RelatedModelName<M, F>
                    > extends __Base<M, F, R>{
                        /** 
                         *  ### Configuración de vista de árbol
                         *  Variable de configuración de vista de árbol.
                         */ 
                        treeConfig: IACele.View.Form.Field.Tree.Config<M, F, R>[];
                        /** 
                         *  ### Añadir configuración
                         *  Añadir configuración de vista de árbol.
                         */ 
                        addConfig: (config: Config<M, F, R>) => void;
                        /** 
                         *  ### Datos cargados
                         *  Estado que indica que los datos han sido cargados. 
                         */ 
                        dataLoaded: boolean;
                        /** 
                         *  ### Cambio de datos cargados
                         *  Función de cambio de estado de datos cargados.
                         */ 
                        setDataLoaded: React.Dispatch<React.SetStateAction<boolean>>;
                        /** 
                         *  ### Datos desde la API
                         *  Array que contiene los datos de registros obtenidos desde la API.
                         */ 
                        dataFromAPI: IACele.Data.Models.Record<R>[];
                        /** 
                         *  ### Metadatos desde la API
                         *  Array que contiene los metadatos de registros obtenidos desde la API.
                         */ 
                        metadataFromAPI: IACele.Data.Models.Field<R>[];
                    };

                };

            };

            /** 
             *  #### Modo de formulario
             *  Modo de transacción que ejecutará el formulario.
             *  
             *  Modos disponibles:
             *  - `'create'`: Creación de registro.
             *  - `'read'`: Lectura de registro (Esto puede incluir posibilidad de
             *  modificación y eliminación).
             *  ----
             *  ```ts
             *  type Mode = 'create' | 'read';
             *  ```
             */ 
            type Mode = 'create' | 'read';

            /** 
             *  #### Función de cambio de valor de campo
             *  Esta función cambia el valor de un campo en los datos del registro en el
             *  formulario.
             *  
             *  Uso:
             *  ```ts
             *  const setFormFieldValue: IACele.View.Form.FieldValueSetter<M> = ...;
             *  setFormFieldValue('name', 'onnymm');
             *  ```
             *  
             *  Parámetros de entrada:
             *  - `name`: Nombre del campo a modificar.
             *  - `value`: Valor a actualizar (El tipo de dato del valor debe coincidir con
             *  el tipo de dato del campo).
             *  
             *  ----
             *  
             *  ```ts
             *  type FieldValueSetter<M extends ModelName> = <F extends FieldName<M>>(
             *      name: F,
             *      value: Record<M>[F],
             *  ) => void;
             *  ```
             */ 
            type FieldValueSetter<M extends ModelName> = <F extends Data.Models.FieldName<M>>(
                name: F,
                value: Data.Models.Record<M>[F],
            ) => void;

            /** 
             *  ### `[Interfaz base]` Metadatos de campos
             *  Arreglo de objetos que contienen los metadatos de los campos del modelo del
             *  registro leído.
             *  
             *  ```ts
             *  interface _FieldsMetadata <M extends ModelName>{
             *      // Metadatos de campos
             *      fieldsMetadata: Field<M>[];
             *  };
             *  ```
             */ 
            interface _FieldsMetadata <M extends ModelName>{
                /** 
                 *  #### Metadatos de campos
                 *  Arreglo de objetos que contienen los metadatos de los campos del modelo del
                 *  registro leído.
                 *  
                 *  ```ts
                 *  const fieldsMetadata = [
                 *      {
                 *          name: 'create_date',
                 *          label: 'Fecha de creación',
                 *          ttype: 'datetime',
                 *          ...
                 *      },
                 *      {...},
                 *  ]
                 *  ```
                 */ 
                fieldsMetadata: Data.Models.Field<M>[];
            };

            /** 
             *  ### `[Interfaz base]` Modo de formulario
             *  Modo de transacción que ejecutará el formulario.
             *  
             *  ```ts
             *  interface _FormMode {
             *      // Modo de formulario
             *      formMode: Mode;
             *  };
             *  ```
             */ 
            interface _FormMode {
                /** 
                 *  #### Modo de formulario
                 *  Modo de transacción que ejecutará el formulario.
                 *  
                 *  Modos disponibles:
                 *  - `'create'`: Creación de registro.
                 *  - `'read'`: Lectura de registro (Esto puede incluir posibilidad de
                 *  modificación y eliminación).
                 *  ----
                 *  ```ts
                 *  type FormMode = "read" | "create";
                 *  ```
                 */ 
                formMode: Mode;
            };

            /** 
             *  ### `[Interfaz base]` Registro del formulario
             *  Valores de datos de registro en formulario y función de cambio de valor de
             *  campo de datos de registro en formulario.
             *  
             *  ```ts
             *  interface _FormRecord <M extends ModelName>{
             *      // Datos del registro en formulario
             *      formRecord: Partial<Record<M>>;
             *  };
             *  ```
             */ 
            interface _FormRecord <M extends ModelName>{
                /** 
                 *  #### Datos del registro en formulario
                 *  Este objeto contiene los datos del registro modificados u originales
                 *  provenientes del registro de la base de datos. Este registro siempre se
                 *  origina como una copia del objeto de datos del registro en la base de datos
                 *  o como un objeto totalmente vacío cuando el formulario está en estado de
                 *  creación.
                 *  
                 *  ```ts
                 *  // Datos de ejemplo
                 *  const formRecord: Partial<Record<'base.users'>> = {
                 *      login: 'onnymm',
                 *      name: 'Onnymm Azzur',
                 *      create_date: '2025-08-11 15:52:38',
                 *  };
                 *  ```
                 */ 
                formRecord: Partial<Data.Models.Record<M>>;
            };

            /** 
             *  ### `[Interfaz base]` Función de cambio de estado
             *  Función de cambio de estado de objeto de datos del registro que se muestran
             *  en la vista de formulario.
             *  ```ts
             *  interface _SetFormRecord<M extends ModelName>{
             *      // Función de cambio de estado de datos del registro en formulario
             *      setFormRecord: Dispatch<SetStateAction<Partial<Record<M>>>>;
             *  };
             *  ```
             */ 
            interface _SetFormRecord <M extends ModelName>{
                /** 
                 *  #### Función de cambio de estado de datos del registro en formulario
                 *  Función de cambio de estado de objeto de datos del registro que se muestran
                 *  en la vista de formulario.
                 *  
                 *  ```ts
                 *  const setFormRecord = (value: Partial<Record<K, "form">>) => {...};
                 *  ```
                 */ 
                setFormRecord: React.Dispatch<React.SetStateAction<Partial<Data.Models.Record<M>>>>;
            };

            /** 
             *  #### Función de cambio de valor de campo
             *  Esta función cambia el valor de un campo en los datos del registro en el
             *  formulario.
             */ 
            interface _SetFormRecordField <M extends ModelName>{
                /** 
                 *  #### Función de cambio de valor de campo
                 *  Esta función cambia el valor de un campo en los datos del registro en el
                 *  formulario.
                 *  
                 *  Uso:
                 *  ```ts
                 *  const setFormFieldValue: FieldValueSetter<K> = ...;
                 *  setFormFieldValue('name', 'onnymm');
                 *  ```
                 *  
                 *  Parámetros de entrada:
                 *  - `name`: Nombre del campo a modificar.
                 *  - `value`: Valor a actualizar (El tipo de dato del valor debe coincidir con
                 *  el tipo de dato del campo).
                 *  
                 *  ----
                 *  
                 *  ```ts
                 *  type FieldValueSetter<M extends ModelName> = <F extends FieldName<M>>(
                 *      name: F,
                 *      value: Record<M>[F],
                 *  ) => void;
                 *  ``` void;
                 *  ```
                 */ 
                setFormRecordField: FieldValueSetter<M>;
            };

            /** 
            *  ### Hay cambios
            *  Valor que contiene indicador de si hay cambios en el objeto de datos del
            *  registro del formulario y el objeto de datos en la base de datos.
            *  ```ts
            *  interface HasChanges {
            *      // Tiene cambios
            *      hasChanges: boolean;
            *  };
            *  ```
            */ 
            interface _HasChanges {
                /** 
                *  #### Tiene cambios
                *  Valor que indica si el objeto de datos del registro tiene cambios en base a
                *  los datos del registro de la base de datos.
                */ 
                hasChanges: boolean;
            };

            /** 
             *  ### `[Interfaz]` Modo de formulario
             *  Valores de modo de formulario.
             *  ```ts
             *  interface ViewMode {
             *      // Modo de formulario
             *      formMode: Mode;
             *      // Función de cambio de estado de modo de formulario
             *      setFormMode: Dispatch<SetStateAction<Mode>>;
             *  };
             *  ```
             */ 
            interface _ViewMode extends _FormMode {
                /** 
                 *  #### Función de cambio de estado de modo de formulario
                 *  Función de cambio de estado de modo de transacción que ejecutará el
                 *  formulario.
                 *  
                 *  Modos disponibles:
                 *  - `'create'`: Creación de registro.
                 *  - `'read'`: Lectura de registro (Esto puede incluir posibilidad de
                 *  modificación y eliminación).
                 *  ----
                 *  ```ts
                 *  const setFormMode = (value: FormMode) => (...);
                 *  ```
                 */ 
                setFormMode: React.Dispatch<React.SetStateAction<Mode>>;
            };

            interface Data <M extends ModelName>{
                record: IACele.Data.Models.Record<M>;
                fields: IACele.Data.Models.Field<M>[];
            };

            interface FieldInfo {
                /** 
                 *  ### Información de campo
                 *  Información de ayuda sobre un campo de modelo de base de datos.
                 */ 
                fieldInfo: string | null;
            };

            interface FieldMetadata <M extends ModelName>{
                /** 
                 *  #### Metadatos de campo
                 *  Objeto que contiene los metadatos de un campo del modelo del registro
                 *  leído.
                 *  
                 *  ```ts
                 *  const fieldMetadata = {
                 *      name: 'create_date',
                 *      label: 'Fecha de creación',
                 *      ttype: 'datetime',
                 *      ...
                 *  }
                 *  ```
                 */ 
                fieldMetadata: IACele.Data.Models.Field<M>;
            };

            declare namespace Controls {

                type NewRecord = (
                    & IACele.View.Form._FormMode
                    & IACele._Base._Callback._NewRecord
                );

                type SaveRecord = (
                    & IACele.View.Form._HasChanges
                    & IACele._Base._Callback._SaveRecord
                );

                type UndoChanges = (
                    & IACele.View.Form._FormMode
                    & IACele.View.Form._HasChanges
                    & IACele._Base._Callback._UndoChanges
                );

                type Hub = (
                    & NewRecord
                    & SaveRecord
                    & UndoChanges
                );

            };

            declare namespace Page {

                /** 
                 *  Página
                 *  Interfaz para componente.
                 */ 
                type Params = GenericWrapperComponent;

            };

            declare namespace Group {

                type Params<M extends ModelName> = (
                    & IACele.View._Base._HasOptionalLabel
                    & IACele.View._Base._HasOptionalInvisible<M>
                    & GenericWrapperComponent
                );

            };

            declare namespace Action {

                type _Params<M extends ModelName> = (
                    & IACele.View._Base._HasOptionalInvisible<M>
                    & IACele.UI._Base._Colorizable
                );
                interface Params<M extends ModelName> extends _Params<M>{
                    /** 
                     *  ### Nombre
                     *  Nombre de la acción en el backend.
                     */ 
                    name: string;
                    /** 
                     *  ### Etiqueta / Nombre visible
                     *  Etiquerta o nombre visible que se reflejará en el botón de la acción.
                     */ 
                    label: string;
                    /** 
                     *  ### Mensaje de confirmación
                     *  Mensaje de confirmación que se mostrará en modal antes de ejecutar la
                     *  acción. En caso de dejarse vacío no se muestra ningún modal de confirmación
                     *  de acción y la acción se ejecuta directamente.
                     */ 
                    confirm?: string;
                    /** 
                     *  ### Mensaje de notificación
                     *  Mensaje de notificación que se mostrará en modal después de haberse
                     *  ejecutado la acción.
                     */ 
                    notify?: string;
                };

            };

            declare namespace Notebook {

                declare namespace _Base {

                    declare namespace Callback {

                        type SetPageContent = (
                            label: string,
                            content: React.ReactNode,
                            invisible: boolean,
                        ) => void;

                    };

                    declare namespace Object {

                        interface _PageData {
                            /** 
                             *  ### Etiqueta de página
                             *  Etiqueta de la página de notebook.
                             */ 
                            label: string;
                            /** 
                             *  ### Es invisible
                             *  Valor booleano que define si la página es invisible o no.
                             */ 
                            invisible: boolean;
                        };

                    };

                    interface _ReadyToDisplay {
                        /** 
                         *  ### Listo para ser mostrado
                         *  Estado que indica que el componente está listo para ser mostrado.
                         */ 
                        readyToDisplay: boolean;
                    };

                    interface _PageContent {
                        /** 
                         *  ### Contenido de página
                         *  Contenido a mostrar en la página que se visualiza.
                         */ 
                        pageContent: React.ReactNode;
                    };

                    interface _AddPageContent {
                        /** 
                         *  ### Establecer contenido de página
                         *  Función que establece contenido TSX en una página del componente Notebook.
                         */ 
                        addPageContent: Callback.SetPageContent;
                    };

                    interface _ReloadNotebook {
                        /** 
                         *  ### Recargar Notebook
                         *  Función para recargar Notebook junto con sus datos más actualizados.
                         */ 
                        reloadNotebook: () => void;
                    };

                    interface _PagesData {
                        /** 
                         *  ### Datos de páginas
                         *  Array que contiene los metadatos de las páginas del notebook como su
                         *  etiqueta y si son visibles.
                         */ 
                        pagesData: Object._PageData[];
                    };

                    interface _DisplayedPage {
                        /** 
                         *  ### Página mostrada
                         *  Índice de página que se muestra en el Notebook
                         */ 
                        displayedPage: number;
                    };

                    interface _SetDisplayedPage {
                        /** 
                         *  ### Cambio de página mostrada
                         *  Función de cambio de estado de página mostrada.
                         */ 
                        setDisplayedPage: React.Dispatch<React.SetStateAction<number>>;
                    };

                    interface _IsSelected {
                        /** 
                         *  ### Está seleccionada
                         *  Valor booleano que indica si la página está seleccionada.
                         */ 
                        isSelected: boolean;
                    };

                    interface _SelectPage {
                        /** 
                         *  ### Selección de página
                         *  Función que selecciona una página del notebook a ser mostrada.
                         */ 
                        selectPage: () => void;
                    };

                };

                declare namespace Callback {

                    type SetPageContent = _Base.Callback.SetPageContent;

                };

                declare namespace Object {

                    type PageData = _Base.Object._PageData;

                    interface PageContent extends PageData {
                        /** 
                         *  ### Contenido de página
                         *  Contenido de la página de notebook.
                         */ 
                        content: React.ReactNode;
                    };

                    interface PageSelector extends PageData {
                        /** 
                         *  ### Índice
                         *  Índice de página de notebook.
                         */ 
                        index: number;
                    };

                };

                declare namespace Pages {

                    type Params = GenericWrapperComponent;

                };

                declare namespace Page {

                    type _Params<M extends ModelName> = (
                        & GenericWrapperComponent
                        & IACele.View._Base._HasOptionalInvisible<M>
                    );
                    interface Params<M extends ModelName> extends _Params<M>{
                        /** 
                         *  ### Nombre / Etiqueta
                         *  Nombre visible de la pestaña del componente Notebook.
                         */ 
                        label: string;
                    };

                };

                declare namespace Children {

                    interface _Params<M extends ModelName>{
                        /** 
                         *  ### Páginas de formulario
                         *  Componente que envuelve las páginas del componente Notebook.
                         */ 
                        Pages: React.FC<Pages.Params>;
                        /** 
                         *  ### Página de formulario
                         *  Página o pestaña a mostrar dentro del componente Notebook.
                         */ 
                        Page: React.FC<Page.Params<M>>;
                    };

                    type Callback<M extends ModelName> = (components: _Params<M>) => (React.ReactNode);

                };

                interface Params<M extends ModelName> {
                    children: Children.Callback<M>;
                };

            };

            declare namespace Alert {

                declare namespace _Base {

                    interface _Show {
                        /** 
                         *  ### Mostrar
                         *  Estaod que indica que el componente debe mostrarse.
                         */ 
                        show: boolean;
                    };

                    interface _Close {
                        /** 
                         *  ### Cerrar componente
                         *  Función que cierra el componente.
                         */ 
                        close: () => (void);
                    };

                };

                type _Params<M extends ModelName> = (
                    & IACele.View._Base._HasOptionalInvisible<M>
                    & IACele.UI._Base._Colorizable
                );
                interface Params<M extends ModelName> extends _Params<M>{
                    /** 
                     *  ### Contenido
                     *  Mensaje que se mostrará en el componente.
                     */ 
                    children: string;
                };

            };

            declare namespace Children {

                interface Params<M extends ModelName> {
                    /** 
                     *  ### Página
                     *  Componente que envuelve todo el formulario y sus componentes que lo
                     *  conforman.
                     */ 
                    Page: React.FC<Page.Params>;
                    /** 
                     *  ### Encabezado de formulario
                     *  Encabezado de formulario que envuelve componentes de estado y botones de acción.
                     */ 
                    Header: React.FC<GenericWrapperComponent>;
                    /** 
                     *  ### Hoja de formulario
                     *  Componente que envuelve los componentes de información del formulario.
                     */ 
                    Sheet: React.FC<GenericWrapperComponent>;
                    /** 
                     *  ### Grupo
                     *  Grupo de campos de formulario.
                     */ 
                    Group: React.FC<IACele.View.Form.Group.Params<M>>;
                    /** 
                     *  ### Ación de servidor
                     *  Botón que ejecuta una acción sobre el registro que se visualiza.
                     */ 
                    Action: React.FC<IACele.View.Form.Action.Params<M>>;
                    /** 
                     *  ### Notebook
                     *  Componente que secciona contenido del formulario en pestañas.
                     */ 
                    Notebook: React.FC<IACele.View.Form.Notebook.Params<M>>;
                    /** 
                     *  ### Alerta
                     *  Componente que muestra un mensaje importante en el formulario.
                     */ 
                    Alert: React.FC<IACele.View.Form.Alert.Params<M>>;
                    /** 
                     *  ### Campo de formulario
                     *  Componente que renderiza un campo en función del tipo de dato que
                     *  renderizará.
                     */ 
                    Field: React.FC<Field.Params<M, Data.Models.FieldName<M>>>;
                };

                type Callback<M extends ModelName> = (components: Params<M>) => React.ReactNode;

            };

            type _Params<M extends ModelName> = (
                & View._Base._RequiresModelName<M>
                & View._Base._OptionalReadonly
            );
            interface Params<M extends ModelName> extends _Params<M>{
                children: IACele.View.Form.Children.Callback<M>;
            };

        };

        declare namespace Modal {

            interface _ConfirmOpen {
                /** 
                 *  ### Modal de confirmación abierto
                 *  Estado que indica si el modal de confirmación está abierto.
                 */ 
                isConfirmOpen: boolean;
                /** 
                 *  ### Al abrir modal de confirmación
                 *  Función que se ejecuta cuando el modal de confirmación se abre.
                 */ 
                onConfirmOpen: () => void;
                /** 
                 *  ### Cambio de mensaje de confirmación
                 *  Función de cambio de estado de mensaje que se muestra en el modal de
                 *  confirmación.
                 */ 
                setConfirmMessage: React.Dispatch<React.SetStateAction<string>>;
            };

            interface _DoneModal {
                /** 
                 *  ### Modal de realizado abierto
                 *  Estado que indica si el modal de realizado está abierto.
                 */ 
                isDoneOpen: boolean;
                /** 
                 *  ### Al abrir modal de realizado
                 *  Función que se ejecuta cuando el modal de realizado se abre.
                 */ 
                onDoneOpen: () => void;
                /** 
                 *  ### Cambio de mensaje de realizado
                 *  Función de cambio de estado de mensaje que se muestra en el modal de
                 *  realizado.
                 */ 
                setDoneMessage: React.Dispatch<React.SetStateAction<string>>;
            };

            interface _Execute {
                /** 
                 *  ### Función a ejecutar
                 *  Función creada para ser ejecutada. No recibe parámetros ni retorna ningún
                 *  valor.
                 */ 
                execute: IACele.Common.VoidCallback;
            };

            interface _Generic extends IACele._Base._State.IsOpen {
                /** 
                 *  ### Al cambiar el estado de apertura
                 *  Función que se ejecuta cuando el estado de apertura del modal cambia.
                 */ 
                onOpenChange: () => void;
                /** 
                 *  ### Mensaje de modal
                 *  Mensaje que se muestra en el modal.
                 */ 
                message: string;
            };

            interface _SetExecute {
                /** 
                 *  ### Cambio de función a ejecutar
                 *  Función de cambio de estado de función creada para ser ejecutada.
                 */ 
                setExecute: React.Dispatch<React.SetStateAction<IACele.Common.VoidCallback>>;
            };

            interface _SetModalColor {
                /** 
                 *  ### Cambio de modal
                 *  Función de cambio de estado de color de modal.
                 */ 
                setColor: React.Dispatch<React.SetStateAction<IACele.UI.UIColor | undefined>>;
            };

            interface ConfirmationModal extends _ConfirmOpen {
                /** 
                 *  ### Al cambiar el estado de apertura
                 *  Función que se ejecuta cuando el estado de apertura del modal de
                 *  confirmación cambia.
                 */ 
                onConfirmOpenChange: () => void;
                /** 
                 *  ### Mensaje de confirmación
                 *  Mensaje que se muestra en el modal de confirmación.
                 */ 
                confirmMessage: string;
            };

            declare namespace Component {

                type _Confirm = (
                    & _Generic
                    & _Execute
                );
                interface Confirm extends _Confirm {
                    color: UI.HeroUI | undefined;

                };

                type Done = _Generic;

            };

            interface DoneModal extends _DoneModal {
                /** 
                 *  ### Al cambiar el estado de apertura
                 *  Función que se ejecuta cuando el estado de apertura del modal de
                 *  realizado cambia.
                 */ 
                onDoneOpenChange: () => void;
                /** 
                 *  ### Mensaje de realizado
                 *  Mensaje que se muestra en el modal de realizado.
                 */ 
                doneMessage: string;
            };

            type Callback = (
                & _Execute
                & _SetExecute
            );

            interface _ModalColor extends _SetModalColor{
                /** 
                 *  ### Color de modal
                 *  Valor de color de modal.
                 */ 
                color: IACele.UI.UIColor | undefined;
            };

        };

        interface ComputedReadonly {
            /** 
             *  ### Solo lectura (computado)
             *  Valor de solo lectura computado para campo.
             */ 
            computedReadonly: boolean;
        };

        interface ComputedLabel {
            /** 
             *  ### Etiqueta computada
             *  Valor de etiqueta computada para campo.
             */ 
            computedLabel: string;
        };

        interface ComputedIsInvisible {
            /** 
             *  ### Invisible (computado)
             *  Valor que indicia que el componente no debe renderizarse.
             */ 
            computedIsInvisible: boolean;
        };

        interface ComputedDecorationColor {
            /** 
             *  ### Color de componente
             *  Color computado para colorear un componente.
             */ 
            computedDecorationColor: IACele.UI.HeroUIColor;
        };

        type _FieldMainProps = (
            & IACele._Base._State._HasTTypeName
            & IACele.View.ComputedLabel
            & IACele.View.ComputedReadonly
            & IACele.View.ComputedDecorationColor
        );
        type ComputedFieldProps = (
            & _FieldMainProps
            & IACele.View.ComputedIsInvisible
        );

    };

    declare namespace API {

        declare namespace Request {

            declare namespace _Base {

                interface _RequiresActionName {
                    'action': string;
                };

                interface _SupportFieldsSpecification<K extends ModelName> {
                    'fields'?: Data.Models.FieldName<K>[];
                };

                interface _RequiresModelName <M extends ModelName>{
                    'model_name': M;
                };

                interface _RequiresRecordData <M extends ModelName>{
                    'data': Partial<IACele.Data.Models.Record<M>>;
                };

                interface _RequiresRecordID {
                    'record_id': number;
                };

                interface _RequiresRecordIDs {
                    'record_ids': number | number[];
                };

                interface _SupportsSearchCriteria<M extends ModelName> {
                    'search_criteria': IACele.Data.Models.CriteriaStructure<M>;
                };

                interface _SupportSlicing {
                    'offset'?: number;
                    'limit'?: number;
                };

                interface _SupportSorting {
                    'sortby'?: boolean;
                    'ascending'?: boolean;
                };

            };

            interface Authentication {
                /** 
                 *  ### Token de acceso
                 *  Token hasheado provisto por el backend al iniciar sesión y almacenado en el
                 *  navegador.
                 */ 
                'access_token': string;
                /** 
                 *  ### Tipo de token
                 *  Tipo del token a usar.
                 */ 
                'token_type': 'bearer';
            };

            declare namespace Crud {

                type Read<M extends ModelName> = (
                    & _Base._RequiresModelName<M>
                    & _Base._RequiresRecordIDs
                );

            };

            declare namespace Form {

                type Create<M extends ModelName> = (
                    & _Base._RequiresModelName<M>
                    & _Base._RequiresRecordData<M>
                );

                type Delete<M extends ModelName> = (
                    & _Base._RequiresModelName<M>
                    & _Base._RequiresRecordIDs
                );

                type Read<M extends ModelName> = (
                    & _Base._RequiresModelName<M>
                    & _Base._RequiresRecordID
                );

                type SearchRead<M extends ModelName> = (
                    & _Base._RequiresModelName<M>
                    & _Base._SupportFieldsSpecification<M>
                    & _Base._SupportSlicing
                    & _Base._SupportsSearchCriteria<M>
                    & _Base._SupportSorting
                );

                type Update<M extends ModelName> = (
                    & _Base._RequiresModelName<M>
                    & _Base._RequiresRecordData<M>
                    & _Base._RequiresRecordIDs
                );

            };

            declare namespace Server {

                type Action<M extends ModelName> = (
                    & _Base._RequiresActionName
                    & _Base._RequiresModelName<M>
                    & _Base._RequiresRecordID
                );

            };

        };

        declare namespace Response {

            declare namespace _Authentication {

                interface _Headers {
                    /** 
                     *  ### Encabezados
                     *  Estructura de datos recibida por `Axios` para incluir en encabezados de
                     *  autenticación.
                     *  ```ts
                     *  interface headers {
                     *      accept: string;
                     *      "Content-Type"?: string;
                     *      "Authorization"?: string;
                     *  };
                     *  ```
                     */ 
                    headers: {
                        accept: 'application/json';
                        "Content-Type"?: 'application/x-www-form-urlencoded';
                        "Authorization"?: string;
                    };
                };

            };

            interface Error {
                /** 
                 *  ### Detalle
                 *  Detalle del error.
                 */ 
                detail: string;
            };

        };

    };

    declare namespace Browser {

        declare namespace localStorage {

            type DarkMode = 'false' | 'true'

        };

    };

    declare namespace Application {

        type Provider = IACele._Base._SupportsChildren;

        interface CurrentUserData {
            /** 
             *  ### ID
             *  ID del usuario.
             */ 
            'id': number | undefined;
            /** 
             *  ### Correo
             *  Correo del usuario.
             */ 
            'login': string;
            /** 
             *  ### Nombre
             *  Nombre del usuario.
             */ 
            'name': string;
            /** 
             *  ### ID de Odoo
             *  ID de usuario en Odoo del usuario.
             */ 
            'odoo_id'?: number;
            /** 
             *  ### Fecha de creación
             *  Fecha de creación del registro del usuario.
             */ 
            'create_date': string;
            /** 
             *  ### Fecha de última modificación
             *  Fecha de última modificación del registro del usuario.
             */ 
            'write_date': string;
        };

        type _Breadcrumbs = (
            & Routing._RecentRoutes
            & _PageNameValue
        );

        declare namespace Navigation {

            /** 
             *  ### `[Interfaz base]` Ruta
             *  Ruta dentro de la aplicación
             *  ```ts
             *  interface Route {
             *      // Nombre
             *      name: string;
             *      // Dirección de ruta
             *      path: string;
             *  };
             *  ```
             */ 
            interface Route {
                /** 
                 *  ### Dirección de ruta
                 *  Dirección de la ruta.
                 */ 
                path: string;
                /** 
                 *  ### Nombre
                 *  Nombre de la ruta.
                 */ 
                name: string;
            };

            /** 
             *  ### `[Interfaz base]` Grupo de rutas
             *  Grupo de rutas dentro de la aplicación.
             *  ```ts
             *  interface RouteGroup {
             *      // Nombre
             *      name: string;
             *      // Ícono
             *      icon: React.ElementType;
             *      // Rutas
             *      routes: string | Route[];
             *  };
             *  ```
             */ 
            interface RouteGroup {
                /** 
                 *  ### Nombre
                 *  Nombre del gripo de rutas.
                 */ 
                name: string;
                /** 
                 *  ### Ícono
                 *  Ícono representativo del grupo de rutas
                 */ 
                icon: React.ElementType;
                /** 
                 *  ### Rutas
                 *  Array de rutas o ruta sencilla que lleva a alguna parte de la aplicación.
                 */ 
                routes: string | Route[];
            };

            interface RouteSection {
                /** 
                 *  ### Nombre
                 *  Nombre de la sección de grupo de rutas. Este nombre se renderiza como
                 *  encabezado de los botones de grupos de rutas de la sección.
                 */ 
                name: string;
                /** 
                 *  ### Grupos de rutas
                 *  Array de grupos de rutas o rutas sencillas que se renderizan como un botón
                 *  que se despliega para mostrar las rutas contenidas o redirecciona a la ruta
                 *  individual.
                 */ 
                groups: RouteGroup[];
            };

        };

        interface _LocalToken {
            /** 
             *  #### Guardar token
             *  Función que guarda el token de usuario en el almacenamiento local del
             *  navegador.
             */ 
            saveToken: (token: string) => void;
            /** 
             *  #### Cargar token
             *  Función que carga el token de usuario desde el almacenamiento local del
             *  navegador.
             */ 
            loadToken: () => string | null;
            /** 
             *  #### Remover token
             *  Función que remueve el token de usuario en el almacenamiento local del
             *  navegador.
             */ 
            removeToken: () => void;
        };

        declare namespace _Navbar {

            declare namespace _Slot {

                interface _DynamicControls {
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

                interface _MainControls {
                    /** 
                     *  ### Controles principales
                     *  Componente de controles principales de la barra de navegación.
                     */ 
                    mainControls: React.ReactNode | null;
                    /** 
                     *  ### Establecer controles principales
                     *  Función de cambio de estado para establecer el componente de controles
                     *  principales de la barra de navegación.
                     */ 
                    setMainControls: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
                };

                interface _SuperiorControls {
                    /** 
                     *  ### Controles superiores
                     *  Componente de controles superiores de la navegación.
                     */ 
                    superiorControls: React.ReactNode | null;
                    /** 
                     *  ### Establecer controles superiores
                     *  Función de cambio de estado para establecer el componente de controles
                     *  superiores de la barra de navegación.
                     */ 
                    setSuperiorControls: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
                };

            };

        };

        interface _PageNameValue {
            /** 
             *  ### Nombre de página
             *  Nombre de la página actual en la aplicación
             */ 
            pageName: string | null;
        };

        interface _SetViewName {
            /** 
             *  ### Cambio de nombre de vista
             *  Función de cambio de estado de nombre de vista.
             */ 
            setViewName: (name: string | null) => void;
        };

        declare namespace _Sidebar {

            interface _Params {
                /** 
                 *  ### La barra lateral está abierta
                 *  Estado que indica que la barra lateral de la interfaz principal de la
                 *  aplicación se encuentra abierta.
                 */ 
                isSidebarOpen: boolean;
                /** 
                 *  ### Cambio de estado de barra lateral abierta
                 *  Función de cambio de estado de barra lateral abierta.
                 */ 
                setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
                /** 
                 *  ### La barra lateral está bloqueada
                 *  Estado que indica que la barra lateral está bloqueada.
                 */ 
                isSidebarLocked: boolean;
                /** 
                 *  ### Cambio de estado de barra lateral bloqueada
                 *  Función de cambio de estado de barra lateral bloqueada.
                 */ 
                setIsSidebarLocked: React.Dispatch<React.SetStateAction<boolean>>;
                /** 
                 *  ### Interruptor de barra lateral abierta
                 *  Función que abre lateral si se encuentra cerrada o la cierra si se
                 *  encuentra abierta.
                 */ 
                toggleSidebar: () => void;
                /** 
                 *  ### Referencia de Sidebar
                 *  Referencia para uso en componente de barra lateral.
                 */ 
                sidebarRef: React.RefObject<HTMLElement | null>;
            };

            /** 
             *  ### Menú de barra lateral
             *  Colección de datos que describe la estructura del menú de la barra lateral
             *  de la aplicación.
             */ 
            type SidebarMenu = Navigation.RouteSection[];

            declare namespace UI {

                type _RouteGroupButton = (
                    & IACele._Base._State.IsOpen
                    & IACele._Base._Callback._OnClick
                    & IACele.Application.Navigation.RouteGroup
                );
                interface RouteGroupButton extends _RouteGroupButton {
                    /** 
                     *  ### La ubicación es activa
                     *  Este parámetro indica si la ubicación actual en la aplicación es la misma a
                     *  la que el componente apunta.
                     */ 
                    isActiveLocation: boolean;
                };

                interface Routes extends IACele._Base._State.IsOpen {
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
                    routes: IACele.Application.Navigation.Route[];
                    /** 
                     *  ### Función de clic
                     *  Función que se ejecuta cuando el componente recibe un clic.
                     */ 
                    routeOnClick: (route: string) => (void);
                };

                interface Route extends IACele._Base._Callback._OnClick {
                    /** 
                     *  ### Ruta
                     *  Objeto que contiene una ruta de URL y el nombre de ésta.
                     */ 
                    route: IACele.Application.Navigation.Route;
                };

            }

        };

        interface _Theme {
            /** 
             *  ### Modo oscuro
             *  Valor que indica si el tema de modo oscuro está activo.
             */ 
            darkMode: boolean;
            /** 
             *  ### Cambio de estado de modo oscuro
             *  Función de cambio de estado de modo oscuro de la aplicación.
             */ 
            setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
        };

        interface _UserData {
            /** 
             *  ### Datos de usuario
             *  Datos del usuario de la sesión actual en la aplicación.
             */ 
            userData: IACele.Application.CurrentUserData;
            /** 
             *  ### Cambio de datos de usuario
             *  Función de cambio de estado de datos de usuario.
             */ 
            setUserData: React.Dispatch<React.SetStateAction<IACele.Application.CurrentUserData>>;
            /** 
             *  ### Remover datos de usuario
             *  Función que remueve los datos del usuario de la sesión actual.
             */ 
            removeUserData: () => void;
        };

        interface Loading {
            /** 
             *  ### Estatus de carga de la app
             *  Este estado contiene el estatus de carga de la aplicación. Éste cambia
             *  cuando se realiza una solicitud de datos al backend.
             */ 
            appLoading: boolean;
            /** 
             *  ### Función de cambio de estado de carga de la app
             *  Esta función realiza el cambio de estado de carga de la aplicación.
             */ 
            setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
        };

        interface Login {
            /** 
             *  ### Mensaje de error
             *  Mensaje a mostrar en caso de un error en el inicio de sesión.
             */ 
            errorMessage: string | undefined;
            /** 
             *  ### Inicio de sesión
             *  Función a ejecutar en el formulario para iniciar sesión.
             */ 
            login: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
        };

        interface Logout {
            /** 
             *  ### Cierre de sesión
             *  Función para cerrar sesión.
             */ 
            logout: () => void;
        };

        interface PageName extends _PageNameValue {
            /** 
             *  ### Cambio de nombre de página
             *  Función de cambio de estado de nombre de la página actual en la aplicación.
             */ 
            setPageName: React.Dispatch<React.SetStateAction<string | null>>;
        };

        declare namespace Routing {

            interface _BreadcrumbCallbacks {
                /** 
                 *  ### Añadir ruta
                 *  Función para añadir una ruta al arreglo de rutas recientes.
                 */ 
                addRoute: (data: RouteLink) => void;
                /** 
                 *  ### Truncar rutas recientes
                 *  Esta función se usa para cortar las últimas rutas recientes en base a un
                 *  índice, esto sirve cuando el usuario ha dado clic en alguna de las rutas
                 *  mostradas por los breadcrumbs y ya no hay necesidad de mostrar la ruta
                 *  cliqueada ni sus respectivas rutas siguientes en éstos.
                 */ 
                cutRecent: (index: number) => void;
                /** 
                 *  ### Guardar valor de estado
                 *  Esta función permite guardar el valor más actualizado que se podrá
                 *  recuperar si se vuelve a visitar la página desde las rutas recientes.
                 */ 
                setRouteData: <T>(key: string, value: T) => void;
                /** 
                 *  ### Recuperar valor de estado
                 *  Esta función permite recuperar el último valor guardado de la página actual
                 *  cuando se visita ésta desde las rutas recientes.
                 */ 
                recoverData: <T>() => T;
            };

            interface _RecentRoutes {
                /** 
                 *  ### Vínculos de ruta
                 *  Arreglo de los vínculos de ruta de las últimas rutas visitadas en la
                 *  aplicación.
                 */ 
                recentRoutes: RouteLink<any>[];
            };

            type BreadcrumbMemory = (
                & _BreadcrumbCallbacks
                & _RecentRoutes
            );

            interface BreadcrumbValues extends _BreadcrumbCallbacks {
                /** 
                 *  ### Vínculos de ruta
                 *  Arreglo de vínculos de ruta.
                 */ 
                routes: IACele.Application.Routing.RouteLink<any>[];
                /** 
                 *  ### Cambio de estado de vínculos de ruta
                 *  Función de cambio de estado de vínculos de ruta.
                 */ 
                setRoutes: React.Dispatch<React.SetStateAction<IACele.Application.Routing.RouteLink<any>[]>>;
            };

            interface RouteLink<T> {
                /** 
                 *  ### Nombre de ruta
                 *  Nombre a mostrar en breadcrump de la aplicación.
                 */ 
                name: string;
                /** 
                 *  ### Ruta
                 *  Ruta de URL a la que se navega para llegar a esta ruta.
                 */ 
                to: string | number;
                /** 
                 *  
                 */ 
                data?: {
                    [K: string]:? T
                };
            };

        };

        interface UserToken {
            /** 
             *  ### Token de usuario
             *  Valor usado para la autenticación del usuario en las solicitudes de datos
             *  al backend.
             */ 
            userToken: string | null;
            /** 
             *  ### Cambio de token de usuario
             *  Función de cambio de estado del token de usuario.
             */ 
            setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
        };

    };

    declare namespace Adapter {

        type Color = Record<UI.UIColor, UI.HeroUIColor>;

    };

    declare namespace UI {

        declare namespace _Base {

            interface _Colorizable {
                /** 
                 *  ### Color de componente
                 *  Color utilizado para colorear componentes.
                 */ 
                color?: UIColor;
            };

            interface _HasIcon {
                /** 
                 *  ### Ícono
                 *  Ícono a renderizar en el componente.
                 */ 
                icon: React.FC<React.SVGProps<SVGSVGElement>>;
            };

        };

        /** 
         *  ### Color de HeroUI
         *  Color utilizado para colorear componentes de HeroUI.
         */ 
        type HeroUIColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";
        /** 
         *  ### Color de componente
         *  Color utilizado para colorear componentes.
         */ 
        type UIColor = "default" | "primary" | "info" | "success" | "warning" | "danger";

        declare namespace Input {

            declare namespace _Base {

                interface _HasValue<T> {
                    /** 
                     *  ### Valor
                     *  Valor del campo.
                     */ 
                    value: T;
                };

            };

            declare namespace Password {

                declare namespace Toggle {

                    type Params = (
                        & IACele._Base._EventCallback.OnClick<HTMLButtonElement, MouseEvent>
                        & UI._Base._HasIcon
                    );

                };

                type Params = (
                    & _Base._HasValue<string>
                    & IACele._Base._EventCallback._OnValueChange<string>
                );

            };

            declare namespace Text {

                type _Params = (
                    & _Base._HasValue<string>
                    & UI._Base._HasIcon
                    & IACele._Base._EventCallback._OnValueChange<string>
                    & IACele._Base._State._EndContent
                )
                interface Params extends _Params {
                    /** 
                     *  ### Nombre
                     *  Nombre del campo en el formulario.
                     */ 
                    name: string;
                    /** 
                     *  ### Valor
                     *  Valor del campo.
                     */ 
                    value: string;
                    /** 
                     *  ### Nombre visible
                     *  Nombre visible del campo.
                     */ 
                    label: string;
                    /** 
                     *  ### TIpo de campo
                     *  Tipo de dato que recibe el campo como entrada.
                     */ 
                    type?: React.InputHTMLAttributes<HTMLInputElement>['type']
                };

            };

            declare namespace User {

                type Params = (
                    & _Base._HasValue<string>
                    & IACele._Base._EventCallback._OnValueChange<string>
                );

            };

        };

        declare namespace Button {

            type Params = (
                & IACele._Base._EventCallback._OnPress
                & IACele._Base._State._EndContent
                & IACele._Base._State._IsDisabled
                & IACele._Base._State._IsIconOnly
                & IACele._Base._State._StartContent
                & IACele._Base._SupportsClassName
                & IACele._Base._SupportsOptionalChildren
                & IACele.UI._Base._Colorizable
            );

        };

        /** 
         *  ### Función de renderización
         *  FUnción flecha que destructura desde una interfaz para poder declarar la
         *  renderización de un conjunto de componentes o atributos provistos desde el
         *  componente que la ejecuta.
         */ 
        type _RenderCallback<T> = (config: T) => (React.ReactNode);

        interface _RendererProps<T>{
            /** 
             *  ### Declaración de vista
             *  Declaraciópn en forma de función flecha de cómo se mostrará la vista.
             */ 
            children: _RenderCallback<T>;
        };

        declare namespace Breadcrumbs {

            interface Ellipsis {
                /** 
                 *  ### Elementos a renderizar
                 *  Elementos a renderizar en forma de lista cuando el botón de elipse se abre.
                 */ 
                items: GenericWrapperComponent[];
                /** 
                 *  ### Separador
                 *  Componente que actúa como separador de elementos.
                 */ 
                separator: React.ReactNode;
            };

            interface Route extends Application.Routing.RouteLink<any>{
                /** 
                 *  ### Índice de ruta
                 *  Índice de ruta.
                 */ 
                index: number;
            };

            type Routes = Application.Routing._RecentRoutes;

        };

        declare namespace Sizeable {

            /** 
             *  ### Tipo de vista
             *  Valor que indica el tipo de vista actual en la interfaz.
             */ 
            type _View = 'mobile' | 'desktop';
            /** 
             *  ### Tamaño del componente
             *  Valor usado por los componentes de HeroUI.
             */ 
            type _ComponentSize = 'sm' | 'md';
            /** 
             *  ### Tamaño del texto
             *  Valor usado por los componenntes de HeroUI.
             */ 
            type _TextSize = 'text-medium' | 'text-sm';

            interface _Params {
                /** 
                 *  ### Modo de vista
                 *  Este valor indica el modo actual de vista para el componente ya sea móvil
                 *  o de escritorio.
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

            /** 
             *  ### Componente responsivo
             *  Tipado para el componente
             *  ```ts
             *  interface Component {
             *      // Declaración de vista
             *      children: ({
             *          // Modo de vista
             *          view,
             *          // Tamaño del componente
             *          componentSize,
             *          // Tamaño de fuente
             *          textSize,
             *      }: _Children) => (React.ReactNode);
             *  };
             *  ```
             */ 
            type Component = _RendererProps<_Params>;

        };

    };

    declare namespace Security {

        declare namespace Authentication {

            interface Headers {
                /** 
                 *  ### Encabezados
                 *  Estructura de datos recibida por `Axios` para incluir en encabezados de
                 *  autenticación.
                 *  ```ts
                 *  interface headers {
                 *      accept: string;
                 *      "Content-Type"?: string;
                 *      "Authorization"?: string;
                 *  };
                 *  ```
                 */ 
                headers: {
                    accept: 'application/json';
                    "Content-Type"?: 'application/x-www-form-urlencoded';
                    "Authorization"?: string;
                };
            };

        };

    };

    declare namespace Hook {

        declare namespace Application {

            type Breadcrumbs = IACele.Application._Breadcrumbs;

            type LocalToken = IACele.Application._LocalToken;

            type Sidebar = IACele.Application._Sidebar._Params;

            type SetViewName = IACele.Application._SetViewName;

            type Theme = IACele.Application._Theme;

            type UserData = IACele.Application._UserData;

            type UserToken = IACele.Application.UserToken;

        };

        declare namespace UI {

            interface ComponentColor {
                /** 
                 *  ### Color de componente
                 *  Color utilizado para colorear componentes.
                 */ 
                adaptedColor: IACele.UI.HeroUIColor;
            };

            type InputText = (
                & _Base._EventCallback._OnBlur
                & _Base._EventCallback._OnFocus
                & _Base._State._IsFocused
            );

        };

        declare namespace View {

            declare namespace Form {

                type EditFormRecord<M extends ModelName> = (
                    & IACele.View.Form._FormRecord<M>
                    & IACele.View.Form._SetFormRecord<M>
                    & IACele.View.Form._SetFormRecordField<M>
                );

                type _FormRecord <M extends ModelName> = (
                    & IACele._Base._Callback._DeleteRecord
                    & IACele._Base._Callback._NewRecord
                    & IACele._Base._Callback._Reload
                    & IACele._Base._Callback._SaveRecord
                    & IACele._Base._Callback._UndoChanges
                    & IACele.View.Form._FieldsMetadata<M>
                    & IACele.View.Form._FormMode
                    & IACele.View.Form._FormRecord<M>
                    & IACele.View.Form._HasChanges
                    & IACele.View.Form._SetFormRecordField<M>
                );

                type FormMode = IACele.View.Form._ViewMode;

                /** 
                 *  ### Registro en vista de formulario
                 *  Valores para uso en vista de formulario.
                 *  ```ts
                 *  interface FormRecord <M extends ModelName>{
                 *      // Cargado
                 *      loaded: boolean;
                 *      // Modo de formulario
                 *      formMode: FormMode;
                 *      // Datos del registro en formulario
                 *      formRecord: Partial<Record<M>>;
                 *      // Función para cambiar valor de campo
                 *      setFormRecordField: FieldValueSetter<M>;
                 *      // Metadatos de campos
                 *      fieldsMetadata: Field<M>[];
                 *      // Función de recarga
                 *      reload: () => void;
                 *      // Crear registro
                 *      new_: () => void;
                 *      // Tiene cambios
                 *      hasChanges: boolean;
                 *      // Deshacer cambios
                 *      undo: () => void;
                 *      // Guardar cambios
                 *      save: () => void;
                 *      // Eliminar registro
                 *      delete_: () => Promise<void>;
                 *  };
                 *  ```
                 */ 
                interface FormRecord<M extends ModelName> extends _FormRecord<M>{
                    /** 
                    *  #### Cargado
                    *  Estado que indica si los datos del registro ya fueron cargados.
                    */ 
                    loaded: boolean;
                };

                type HasChanges = IACele.View.Form._HasChanges;

                type _ReadFormRecord<M extends ModelName> = (
                    & IACele._Base._Callback._Reload
                    & IACele.View.Form._FieldsMetadata<M>
                );
                interface ReadRecord<M extends ModelName> extends _ReadFormRecord<M>{
                    /** 
                     *  #### Registro en la base de datos
                     *  Este objeto contiene los datos de un registro de la base de datos, intactos
                     *  e inmutables.
                     *  
                     *  ```ts
                     *  const recordInDatabase: Record<M> | null = {
                     *      name: 
                     *      login: 'onnymm',
                     *      name: 'Onnymm Azzur',
                     *      create_date: '2025-08-11 15:52:38',
                     *      ...
                     *  };
                     *  ```
                     */ 
                    recordInDatabase: Data.Models.Record<M> | null;
                };

                declare namespace Callback {

                    type CreateRecord = IACele._Base._Callback.CreateRecord;

                    type DeleteRecord = IACele._Base._Callback._DeleteRecord;

                    type NewRecord = IACele._Base._Callback._NewRecord;

                    type SaveRecord = IACele._Base._Callback._SaveRecord

                    type UpdateRecord = IACele._Base._Callback.UpdateRecord;

                    type UndoChanges = IACele._Base._Callback._UndoChanges;

                };

                type FieldMetadata<M extends ModelName> = IACele.View.Form.FieldMetadata<M>;

                type FieldTType = IACele._Base._State._HasTTypeName;

                type ExecuteFormValidation<M extends ModelName> = IACele.View.ExecuteFormValidation<M>

                type ComputedFieldProps = IACele.View.ComputedFieldProps;

                type Notebook = (
                    & IACele.View.Form.Notebook._Base._ReadyToDisplay
                    & IACele.View.Form.Notebook._Base._PageContent
                    & IACele.View.Form.Notebook._Base._AddPageContent
                    & IACele.View.Form.Notebook._Base._ReloadNotebook
                    & IACele.View.Form.Notebook._Base._PagesData
                    & IACele.View.Form.Notebook._Base._DisplayedPage
                    & IACele.View.Form.Notebook._Base._SetDisplayedPage
                );

                type PageSelector = (
                    & IACele.View.Form.Notebook._Base._IsSelected
                    & IACele.View.Form.Notebook._Base._SelectPage
                );

                type Alert = (
                    & IACele.View.Form.Alert._Base._Show
                    & IACele.View.Form.Alert._Base._Close
                );

                type TreeAPIData<M extends ModelName> = (
                    & IACele.View.Tree._Base._DataFromAPI<M>
                    & IACele.View.Tree._Base._MetadataFromAPI<M>
                    & IACele.View.Tree._Base._SetDataFromAPI<M>
                    & IACele.View.Tree._Base._SetMetadataFromAPI<M>
                    & IACele.View.Tree._Base._DataLoaded
                    & IACele.View.Tree._Base._SetDataLoaded
                );

                type TreeRecordIDs = IACele.View.Tree._Base.RecordIDs;

                type TreeConfig<M extends ModelName> = IACele.View.Tree._Base._TreeConfig<M>;

                type AddConfig<M extends ModelName> = IACele.View.Tree._Base._AddConfig<M>;

                type Tree<
                    M extends ModelName,
                    F extends Data.Models.FieldName<M>,
                    R extends Data.Models.RelatedModelName<M, F>
                > = (
                    & IACele.View.HasFieldName<M>
                    & IACele._Base._State._HasRelatedModelName<R>
                    & IACele.View.Tree._Base._TreeConfig<R>
                    & IACele.View.Tree._Base._AddConfig<R>
                    & IACele.View.Tree._Base._DataLoaded
                    & IACele.View.Tree._Base._SetDataLoaded
                    & IACele.View.Tree._Base._DataFromAPI<R>
                    & IACele.View.Tree._Base._MetadataFromAPI<R>
                );

                type TreeRecords<
                    M extends ModelName,
                    F extends IACele.Data.Models.FieldName<M>,
                    R extends IACele.Data.Models.RelatedModelName<M, F>,
                > = (
                    & IACele.View.Tree._Base.Callback._GetTType<R>
                    & IACele.View.Tree._Base.Callback.ComputeLabel<R>
                    & IACele.View.Tree._Base.Callback.TreeRecordsIndex<R>
                    & IACele.View.Tree._Base.Callback.CreateSetFormRecordField<M>
                );

            };

            type Modal = (
                & IACele.View.Modal._ModalColor
                & IACele.View.Modal.Callback
                & IACele.View.Modal.ConfirmationModal
                & IACele.View.Modal.DoneModal
            );

        };

    };

    declare namespace Context {

        declare namespace Application {

            type Breadcrumb = IACele.Application.Routing.BreadcrumbMemory;

            interface Content {
                /** 
                 *  ### Referencia de contenido
                 *  Referencia de contenido de la aplicación.
                 */ 
                appContentRef: React.RefObject<HTMLElement | null>;
            };

            declare namespace Controls {

                type DynamicControls = IACele.Application._Navbar._Slot._DynamicControls;

                type MainControls = IACele.Application._Navbar._Slot._MainControls;

                type SuperiorControls = IACele.Application._Navbar._Slot._SuperiorControls;

            };

            type PageName = IACele.Application.PageName;

            type Sidebar = IACele.Application._Sidebar._Params;

            type Theme = IACele.Application._Theme;

            type UserData = IACele.Application._UserData;

            type UserToken = IACele.Application.UserToken;

        };

        declare namespace View {

            type _FormTree<
                M extends ModelName,
                F extends Data.Models.FieldName<M>,
                R extends Data.Models.RelatedModelName<M, F>
            > = (
                & IACele.View._Base._RequiresModelName<R>
                & IACele.View.Tree._Base._AddConfig<R>
                & IACele.View.Tree._Base._SetDataLoaded
                & IACele.View.Tree._Base._TreeConfig<R>
                & IACele.View.Tree.Data<R>
            );
            interface FormTree<
                M extends ModelName,
                F extends Data.Models.FieldName<M>,
                R extends Data.Models.RelatedModelName<M, F>
            > extends _FormTree<M, F, R>{
                /** 
                 *  ### Nombre de campo
                 *  Nombre de campo principal del árbol.
                 */ 
                name: F;
            }

            type Form<M extends ModelName> = (
                & IACele._Base._Callback._Reload
                & IACele._Base._Callback._SaveRecord
                & IACele.View._Base._RequiresModelName<M>
                & IACele.View._Base._OptionalReadonly
                & IACele.View.Form._FormMode
                & IACele.View.Form._FormRecord<M>
                & IACele.View.Form._FormRecord<M>
                & IACele.View.Form._SetFormRecordField<M>
                & IACele.View.Form._FieldsMetadata<M>
            );

            type Modal = (
                & IACele.View.Modal._ConfirmOpen
                & IACele.View.Modal._DoneModal
                & IACele.View.Modal._SetExecute
                & IACele.View.Modal._SetModalColor
            );

            type Field<M extends ModelName> = (
                & IACele.View._FieldMainProps
                & IACele.View._Base._HasDomain<M>
                & IACele.View._Base._HasPlaceholder
                & IACele.View._Base._HasWidgetName
                & IACele.View._Base._HasMinValue
                & IACele.View._Base._HasMaxValue
                & IACele.View._Base._HasNumericStep
                & IACele.View.HasFieldName<M>
            );

            type Notebook = (
                & IACele.View.Form.Notebook._Base._AddPageContent
                & IACele.View.Form.Notebook._Base._ReloadNotebook
                & IACele.View.Form.Notebook._Base._DisplayedPage
                & IACele.View.Form.Notebook._Base._SetDisplayedPage
            );

        };

    };

    declare namespace Deprecated {

        interface TTypeMap<M extends ModelName>{
            'integer': IACele.Data.Models.TType.Integer<'not_null'>;
            'char': IACele.Data.Models.TType.Char<'not_null'>;
            'float': IACele.Data.Models.TType.Float<'not_null'>;
            'boolean': IACele.Data.Models.TType.Boolean<'not_null'>;
            'date': IACele.Data.Models.TType.Date<'not_null'>;
            'datetime': IACele.Data.Models.TType.Datetime<'not_null'>;
            'time': IACele.Data.Models.TType.Time<'not_null'>;
            'duration': IACele.Data.Models.TType.Duration<'not_null'>;
            'text': IACele.Data.Models.TType.Text<'not_null'>;
            'selection': IACele.Data.Models.TType.Selection<any, 'not_null'>;
            'file': IACele.Data.Models.TType.File<'not_null'>;
            'many2one': IACele.Data.Models.TType.Many2One<'not_null'>;
            'one2many': IACele.Data.Models.TType.One2Many<M>;
            'many2many': IACele.Data.Models.TType.Many2Many<M>;
        };

        type SupportedType<M extends ModelName, T extends keyof TTypeMap<M>> = TTypeMap<M>[T];

        interface _HasDecorationColor {
            decorationColor: IACele.UI.HeroUIColor;
        };

        interface _OnValueChange<M extends ModelName, T extends keyof TTypeMap<K>>{
            onValueChange: (value: SupportedType<M, T>) => void;
        }

        type _DataWidget<M extends ModelName, T extends keyof TTypeMap<K>> = (
            & IACele.View.HasFieldName<M>
            & IACele.View._Base._HasPlaceholder
            & IACele.View._Base._HasMinValue
            & IACele.View._Base._HasMaxValue
            & IACele.View._Base._HasNumericStep
            & IACele.View._Base._HasDomain<M>
            & _HasDecorationColor
            & _OnValueChange<M, T>
        );
        interface DataWidget <M extends ModelName, T extends keyof TTypeMap<K>> extends _DataWidget<M, T>{
            recordData: Partial<Data.Models.Record<M>>;
            value: SupportedType<M, T>;
            readonly: boolean;
        };

        type _ComponentWidget<M extends ModelName, T> = (
            & IACele.View.HasFieldName<M>
            & _HasDecorationColor
            & _OnValueChange<M, T>
            & IACele.View._Base._HasPlaceholder
        );
        interface ComponentWidget<M extends ModelName, T> extends _ComponentWidget<M, T>{
            value: SupportedType<M, T>;
            type: string;
            inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal";
        };

    };

};
