import Form from "../../../components/views/form/Form"

const Sale = () => {

    return (
        <Form table='commissions.line' readonly >
            {({ Field, Page, Sheet, Group }) => (
                <Page>
                    <Sheet>
                        <Group label="General">
                            <Group>
                                <Field name="invoiceLineId" />
                                <Field name="invoiceId" />
                            </Group>
                            <Field name="invoiceDate" />
                            <Field name="name" />
                        </Group>

                        <Group label="Producto">
                            <Group>
                                <Field name="productId" />
                                <Field name="internalReference" />
                            </Group>
                            <Field name="productName" />
                            <Group>
                                <Field name="quantity" />
                                <Field name="priceUnit" />
                            </Group>
                        </Group>

                        <Group label="Responsable">
                            <Group>
                                <Field name="salespersonId" />
                                <Field name="invoiceOrigin" />
                                <Field name="warehouse" />
                                <Field name="businessModel" />
                            </Group>
                        </Group>

                        <Group label="Cliente">
                            <Field name="partnerId" />
                            <Field name="partnerName" />
                            <Field name="partnerCommission" />
                            <Field name="partnerCommissionCost" />
                        </Group>
                    </Sheet>
                </Page>
            )}
        </Form>
    );
};

export default Sale;
