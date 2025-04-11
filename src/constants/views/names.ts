export const TABLE_NAME: Record<IACele.API.Database.TableName, string> = {
    "base.users": "Usuarios",
    "commissions.line": "Ventas",
};

export const tableProperties: IACele.Core.UI.Field.TableFieldNames = {
    "base.users": {
        id: {
            name: 'ID',
            type: 'integer',
        },
        name: {
            name: 'Nombre',
            type: 'char',
        },
        active: {
            name: 'Activo',
            type: 'boolean',
        },
        user: {
            name: 'Correo',
            type: 'char',
        },
        odooId: {
            name: 'ID en Odoo',
            type: 'integer',
        },
        password: {
            name: 'Contraseña',
            type: 'char',
        },
        createDate: {
            name: 'Fecha de creación',
            type: 'datetime',
        },
        writeDate: {
            name: 'Fecha de modificación',
            type: 'datetime',
        },
    },
    "commissions.line": {
        id: {
            name: 'ID',
            type: 'integer',
        },
        invoiceLineId: {
            name: 'ID de línea de factura',
            type: 'integer',
        },
        invoiceId: {
            name: 'ID de factura',
            type: 'integer',
        },
        invoiceDate: {
            name: 'Fecha de facturación',
            type: 'date',
        },
        name: {
            name: 'Folio',
            type: 'char',
        },
        invoiceOrigin: {
            name: 'Origen de de factura',
            type: 'char',
        },
        salespersonId: {
            name: 'ID de vendedor',
            type: 'integer',
        },
        businessModel: {
            name: 'Modelo de negocio',
            type: 'char',
        },
        warehouse: {
            name: 'Almacén',
            type: 'char',
        },
        originModule: {
            name: 'Módulo de origen',
            type: 'char',
        },
        partnerId: {
            name: 'ID de cliente',
            type: 'integer',
        },
        partnerName: {
            name: 'Nombre del cliente',
            type: 'char'
        },
        productId: {
            name: 'ID de producto',
            type: 'integer',
        },
        internalReference: {
            name: 'Código',
            type: 'char',
        },
        productName: {
            name: 'Descripción',
            type: 'char',
        },
        quantity: {
            name: 'Cantidad',
            type: 'float',
        },
        priceUnit: {
            name: 'Precio unitario',
            type: 'monetary',
        },
        priceSubtotal: {
            name: 'Subtotal',
            type: 'monetary',
        },
        purchaseId: {
            name: 'ID de compra',
            type: 'integer',
        },
        purchaseName: {
            name: 'Folio de compra',
            type: 'char',
        },
        vendorId: {
            name: 'ID de proveedor',
            type: 'integer',
        },
        vendorName: {
            name: 'Proveedor',
            type: 'char',
        },
        purchaseDate: {
            name: 'Fecha de compra',
            type: 'date',
        },
        productCost: {
            name: 'Costo del producto',
            type: 'monetary',
        },
        costSubtotal: {
            name: 'Costo subtotal',
            type: 'monetary',
        },
        discount: {
            name: 'Descuento',
            type: 'percentage',
        },
        partnerCommission: {
            name: 'Porcentaje de comisión del cliente',
            type: 'percentage',
        },
        partnerCommissionCost: {
            name: 'Comisión del cliente',
            type: 'monetary',
        },
        utilitySubtotal: {
            name: 'Utilidad',
            type: 'monetary',
        },
        totalUtilityPct: {
            name: 'Porcentaje de utilidad',
            type: 'percentage',
        },
        margin: {
            name: 'Margen',
            type: 'percentage',
        },
        costSubtotalAfterPartnerCommission: {
            name: 'Costo subtotal después de comisión del cliente',
            type: 'monetary',
        },
        utilitySubtotalAfterPartnerCommission: {
            name: 'Utilidad después de comisión del cliente',
            type: 'monetary',
        },
        utilitySubtotalAfterPartnerCommissionPct: {
            name: 'Porcentaje de utilidad después de comisión del cliente',
            type: 'percentage',
        },
        marginAfterPartnerCommissionPct: {
            name: 'Margen de contribución después de comisión del cliente',
            type: 'percentage',
        },
        notes: {
            name: 'Observaciones',
            type: 'char',
        },

        createDate: {
            name: 'Fecha de creación',
            type: 'datetime',
        },
        writeDate: {
            name: 'Fecha de modificación',
            type: 'datetime',
        },
    },
};
