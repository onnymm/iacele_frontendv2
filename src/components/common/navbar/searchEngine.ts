import { tableProperties } from "../../../constants/views/names";

class SearchEngine<K extends IACele.API.Database.TableName> {

    /** 
     *  ### Tabla
     *  Nombre de la tabla de base de datos.
     */ 
    private table: K;
    /** 
     *  ### Criterios de búsqueda legibles
     *  Este arreglo de objetos es usado para visualizar y controlar uno o varios
     *  bloques de búsqueda para la barra de búsqueda en la interfaz visual.
     */ 
    private setSearchItems: React.Dispatch<React.SetStateAction<IACele.View.Search.TranslatedFilter<K>[]>>;
    /** 
     *  ### Comparación
     *  Mapa de traduccoón de operador de comparación a lenguaje humano.
     */ 
    private readableComparisonOperator: Record<IACele.View.Search.ComparisonOperator, string> = {
        '=': '=',
        '!=': 'no es igual a',
        '<': 'es menor a',
        '<=': 'es menor o igual a',
        '>': 'es mayor a',
        '>=': 'es mayor o igual a',
        '><': 'es diferente de',
        'ilike': 'contiene',
        'not ilike': 'no contiene',
        'in': 'está en',
        'not in': 'no está en',
        '~': 'puede contener',
        '~*': 'puede contener',
    };
    /** 
     *  Operador lógico legible
     *  Mapa de traducción de operador lógico a lenguaje humano
     */ 
    private readableLogicOperator: Record<IACele.View.Search.LogicOperator, string> = {
        '&': 'y',
        '|': 'o',
    };

    /** 
     *  ### Filtros de búsqueda
     *  Filtros de búsqueda a ser utilizados para manipular y filtrar datos desde
     *  el backend.
     */ 
    searchItems: IACele.View.Search.TranslatedFilter<K>[];

    constructor (
        table: K,
        initialValue: IACele.View.Search.CriteriaStructure<K>,
        setSearchItems: React.Dispatch<React.SetStateAction<IACele.View.Search.TranslatedFilter<K>[]>>,
    ) {

        // Asignación de valores a los atributos de la instancia
        this.table = table;
        this.setSearchItems = setSearchItems;

        // Inicialización de datos
        this.searchItems = this.initialize(initialValue);
        this.setSearchItems(this.searchItems);
    };

    /** 
     *  ### Remover filtro de búsqueda
     *  Este método remueve un filtro de búsqueda en base a su llave
     *  correspondiente provista.
     */ 
    removeSearchItem = (key: number) => {

        // Se filtran los datos y se conservan los que no contienen la llave a remover
        this.searchItems = (
            this.searchItems.filter(
                (item) => (item.key !== key)
            )
        );

        // Se establece el nuevo valor del estado
        this.setSearchItems( [...this.searchItems] );
    };

    /** 
     *  ### A estructura de criterio de búsqueda
     *  Este método convierte la información de filtros proporcionada en una estructura que
     *  se añade como criterio de búsqueda al cuerpo de las solicitudes de datos al backend.
     */ 
    toSearchCriteria = (): IACele.View.Search.CriteriaStructure<K> => {

        // Si el criterio de búsqueda está vacío...
        if ( this.searchItems.length === 0 ) {
            // Se retorna un arreglo vacío
            return ([]);

        // Si el criterio de búsqueda sólo contiene una tripleta...
        } else if ( this.searchItems.length === 1 ) {
            // Se obtiene y se retorna ésta
            const [ item ] = this.searchItems;
            return ( item.criteria );

        // Si el criterio de búsqueda es una estructura compleja...
        } else {

            // Se obtiene el primer filtro individual
            const [ firstItem ] = this.searchItems;
            // Inicialización de arreglo a retornar
            const baseCriteria: IACele.View.Search.CriteriaStructure<K> = [];
            // Se añade el operador lógico `&` para separar los filtros concatenados
            baseCriteria.push('&');
            // Se añade el primer filtro individual
            baseCriteria.push( ...firstItem.criteria );

            // Se inicia un ciclo comenzando en 1 para añadir el resto de los filtros individuales
            for ( let i = 1; i < this.searchItems.length; i++ ) {

                // Si la iteración aún no está a un paso de terminar se continúan añadiendo operadores `&`
                if ( i < this.searchItems.length - 1 ) baseCriteria.push('&');
                // Se añade el filtro individual destructurado
                baseCriteria.push( ...this.searchItems[i].criteria );
            };

            // Se retorna la estructura generada
            return ( baseCriteria );
        };
    };

    /** 
     *  ### Inicialización de datos
     *  Este método privado ejecuta los métodos en el orden correcto para
     *  inicializar los datos de filtros de búsqueda de la instancia.
     */ 
    private initialize = (
        initialValue: IACele.View.Search.CriteriaStructure<K>
    ) => {

        // Si no hay valor de criterio de búsqueda se retorna un arreglo vacío
        if ( initialValue.length === 0 ) return [];

        // Transformación de datos
        const mainFilters = this.getMainFilters([ ...initialValue ].reverse());
        const searchBlocks = this.buildSearchBlocks(mainFilters);
        return this.getReadableItems(searchBlocks);
    };

    /** 
     *  ### Obtención de objetos legibles
     *  Este método mapea la estructura de los bloques de búsqueda para ser
     *  convertidos a fomato legible.
     */ 
    private getReadableItems = (
        searchBlocks: IACele.View.Search.SearchBar.SearchBlock<K>[],
    ): IACele.View.Search.TranslatedFilter<K>[] => {

        return (
            searchBlocks.map(
                (filter) => ({
                    criteria: filter.criteria,
                    key: filter.key,
                    readable: this.toReadable(filter.hierarchy),
                })
            )
        );
    };

    /** 
     *  ### A formato legible
     *  Este método privado construye una estructura recursivamente anidada que
     *  transforma los datos del criterio de búsqueda a expresiones legibles por un
     *  humano.
     */ 
    private toReadable = (
        structure: IACele.View.Search.Triplet<K> | IACele.View.Search.SearchBar.CombinedSearchStructure<K>,
    ): IACele.View.Search.TranslatedTriplet | IACele.View.Search.TranslatedTripletsCombination => {

        // Si la estructura entrante es una tripleta...
        if ( this.isTriplet(structure) ) {
            // Se destructura ésta
            const [ field, op, value ] = structure as IACele.View.Search.Triplet<K>;

            // Retorno de traducción
            return {
                // Traducción de campo
                field: tableProperties[this.table][field].name,
                // Traducción operador de comparación
                op: this.readableComparisonOperator[op],
                // Valor de tripleta
                value,
            };

        // Si la estructura entrante es una combinación de objetos de búsqueda
        } else {
            // Destructuración de los valores
            const { op, item2, item3 } = structure as IACele.View.Search.SearchBar.CombinedSearchStructure<K>;

            // Retorno de objeto de búsqueda combinado
            return {
                // Traducción del operador lógico
                op: this.readableLogicOperator[op],
                // Se traducen los dos objetos contenidos de manera recursiva
                items: [
                    this.toReadable(item2),
                    this.toReadable(item3),
                ],
            };
        };
    };

    /** 
     *  ### Construcción de bloques de búsqueda
     *  Este método privado construye la estructura a usar en la renderización de
     *  los bloques individuales de búsqueda para la barra de búsqueda de la
     *  interfaz visual.
     */ 
    private buildSearchBlocks = (
        filters: IACele.View.Search.CriteriaStructure<K>[],
    ): IACele.View.Search.SearchBar.SearchBlock<K>[] => {

        return (
            filters.map(
                (filter, key) => {
                    // Destructuración del criterio de búsqueda
                    const criteria = [ ...filter ];
                    // Destructuración del criterio de búsqueda invertido para extracción de valores
                    const reversedFilter = [ ...filter ].reverse();

                    // Creación de función para extracción de valores
                    const getItem = (
                        () => reversedFilter.pop() as (
                            IACele.View.Search.LogicOperator
                            | IACele.View.Search.Triplet<K>
                        )
                    );

                    // Retorno del objeto a ser leído por bloque de filtro de búsqueda
                    return {
                        criteria,
                        key,
                        hierarchy: this.buildStructure(getItem),
                    };
                }
            )
        );
    };

    /** 
     *  ### Obtener los filtros principales
     *  Este método privado ejecuta los métodos privados necesarios en el orden
     *  correcto para construir y retornar los filtros princiapales de búsqueda.
     */ 
    private getMainFilters = (
        initialValue: IACele.View.Search.CriteriaStructure<K>,
    ) => {

        const mainFilters: IACele.View.Search.CriteriaStructure<K>[] = [];
        // Obtención de la estructura principal de filtros
        const mainStructure = this.buildStructure(
            () => initialValue.pop() as IACele.View.Search.LogicOperator | IACele.View.Search.Triplet<K>
        );

        // Si la estructura es una simple tripleta, se retorna ésta.
        if ( (mainStructure as IACele.View.Search.Triplet<K>).length ) {
            mainFilters.push([mainStructure] as IACele.View.Search.CriteriaStructure<K>);

        // Si es una estructura compleja se crean las concatenaciones
        } else {
            this.concatenateFilters(mainStructure as IACele.View.Search.SearchBar.CombinedSearchStructure<K>, mainFilters);
        };

        return mainFilters;
    };

    /** 
     *  ### Concatenación de filtros principales
     *  Este método privado une las tripletas o filtros combinados unidos por medio
     *  del operador lógico `&` en un arreglo para ser usado para renderizar
     *  bloques de búsqueda individuales en la barra de búsqueda de la interfaz
     *  visual.
     */ 
    private concatenateFilters = (
        structure:  IACele.View.Search.SearchBar.CombinedSearchStructure<K>,
        mainFilters: IACele.View.Search.CriteriaStructure<K>[],
    ) => {

        // Destructuración de elementos de una estructura sencilla o anidada
        const { op, item2, item3 } = structure;

        // Si la concatenación es un `Y`
        if ( op === "&" ) {
            // Si el segundo elemento es una tripleta de búsqueda
            if ( this.isTriplet(item2) ) {
                // Se concatena ésta a los filtros principales
                mainFilters.push( [item2 as IACele.View.Search.Triplet<K>,] );
            } else {
                // De no serlo así se vuelve a evaluar la estructura llamando a la función misma
                this.concatenateFilters(item2 as  IACele.View.Search.SearchBar.CombinedSearchStructure<K>, mainFilters);
            };

            // Si el tercer elemento es una tripleta de búsqueda
            if ( this.isTriplet(item3) ) {
                // Se concatena ésta a los filtros principales
                mainFilters.push( [item3 as IACele.View.Search.Triplet<K>,] );
            } else {
                // De no serlo así se vuelve a evaluar la estructura llamando a la función misma
                this.concatenateFilters(item3 as  IACele.View.Search.SearchBar.CombinedSearchStructure<K>, mainFilters);
            };

        // De ser un operador lógico `O`
        } else {
            // Se añade un fragmento de criterio individual de búsqueda
            mainFilters.push( this.buildSingleCriteriaStructure(structure) );
        };
    };

    /** 
     *  ### Construcción de criterio individual de búsqueda
     *  Este método privado construye un criterio individual de búsqueda para ser
     *  añadido a los filtros principales usados para renderizar los bloques de
     *  búsqueda en la barra de búsqueda en la interfaz visual.
     */ 
    private buildSingleCriteriaStructure = (structure:  IACele.View.Search.SearchBar.CombinedSearchStructure<K>): IACele.View.Search.CriteriaStructure<K> => {

        // Destructuración de elementos de una estructura sencilla o anidada
        const { op, item2, item3 } = structure;

        // Inicialización de un fragmento de criterio de búsqueda para control de cómo se unirán los datos
        const newArray: IACele.View.Search.CriteriaStructure<K> = [];

        // Se añade el operador lógicos
        newArray.push(op);

        // Creación de los elementos 2 y 3
        const b = (
            this.isTriplet(item2)
                ? item2 as IACele.View.Search.Triplet<K>
                : this.buildSingleCriteriaStructure(item2 as  IACele.View.Search.SearchBar.CombinedSearchStructure<K>)
        );
        const c = (
            this.isTriplet(item3)
                ? item3 as IACele.View.Search.Triplet<K>
                : this.buildSingleCriteriaStructure(item3 as  IACele.View.Search.SearchBar.CombinedSearchStructure<K>)
        );

        // Se añaden los elementos en base a su tipo
        this.addToMainSearchCriteria(newArray, b);
        this.addToMainSearchCriteria(newArray, c);

        // Se retorna el fragmento de criterio individual de búsqueda
        return ( newArray );
    };

    /** 
     *  ### Añadir a criterio principal de búsqueda
     *  Este método añade un elemento al criterio principal de búsqueda o un fragmento
     *  de éste y lo añade destructurado si no es una tripleta de búsqueda.
     */ 
    private addToMainSearchCriteria = (
        array: IACele.View.Search.CriteriaStructure<K>,
        item: IACele.View.Search.CriteriaStructure<K> | IACele.View.Search.Triplet<K>,
    ) => {

        // Si el elemento es una tripleta de búsqueda...
        if ( this.isTriplet(item) ) {
            // Se añade el elemento tal cual
            array.push(item as IACele.View.Search.Triplet<K>);

        // Si el elemento no es una tripleta de búsqueda...
        } else {
            // Se añade el elemento destructurado
            array.push(...(item as IACele.View.Search.CriteriaStructure<K>));
        };
    };

    /** 
     *  ### Construcción de estructura de filtros
     *  Este método interno construye la estructura de filtros para separar los
     *  fragmentos del filtro principal que después serán usados para renderizar
     *  bloques de búsqueda individuales y configurables de manera separada.
     */ 
    private buildStructure = (
        getItem: () => (IACele.View.Search.LogicOperator | IACele.View.Search.Triplet<K>),
    ): IACele.View.Search.SearchBar.FilterStructure<K> => {

        // Extracción del primer elemento para su evaluación
        const item1 = getItem();

        // Si el elemento es una tripleta
        if ( this.isTriplet(item1) ) {
            // Se retorna éste y se finaliza la ejecución
            return ( item1 as IACele.View.Search.Triplet<K> );

        // De ser un operador lógico se realiza una ejecución recursiva para obtener los valores anidados
        } else {
            // Extracción del segundo y tercer elemento
            // Pueden ser una tripleta o una estructura compuesta y/o anidada
            const item2 = this.buildStructure(getItem);
            const item3 = this.buildStructure(getItem);

            // Retorno de la estructura compuesta
            return ({
                op: item1 as IACele.View.Search.LogicOperator,
                item2,
                item3,
            });
        };
    };

    /** 
     *  ### Es tripleta
     *  Este método privado valida si un elemento cualquiera es una tripleta de
     *  criterio de búsqueda.
     */ 
    private isTriplet = (
        item: any,
    ): boolean => {

        // Si el elemento es `undefined` se retorna falso
        if ( item === undefined ) return false;

        // Validación del elemento
        return (
            item !== '&'
            && item !== '|'
            && item.length === 3
            && item[0] !== '&'
            && item[0] !== '|'
        );
    };
};

export default SearchEngine;
