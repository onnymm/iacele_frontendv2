export const isKeyboardFieldType = (type: string) => (
    type === 'integer'
    || type === 'float'
    || type === 'monetary'
    || type === 'char'
    || type === 'date'
    || type === 'percentage'
);

export const validateValue: Record<IACele.View.Data.KeyboardType, (value: string) => (true | null)> = {
    // Entero
    integer: (value) => ( /^[0-9]*$/.test(value) || value === '' ? true : null ),

    // Texto
    char: () => (true),

    // Fecha
    date: () => (true),

    // Flotante
    float: (value) => ( /^\d*(\.\d*)?$/.test(value) || value === '' || value === null ? true : null ),

    // Monetary
    monetary: (value) => ( /^\d*(\.\d*)?$/.test(value) || value === '' || value === null ? true : null ),

    // Porcentaje
    percentage: (value) => ( /^\d*(\.\d*)?$/.test(value) || value === '' || value === null ? true : null ),
};

export const fieldToInputType: IACele.View.Data.KeyboardTypeToInput = {
    integer: 'number',
    float: 'number',
    monetary: 'number',
    char: 'text',
    date: 'date',
    percentage: 'number',
};
