import List from "../../../components/views/list/List";

const Sales = () => {

    return (
        <List table="commissions.line" emptyContent="No hay datos" open="/view/form/sale">
            {() => null}
            {({ Tree }) => (

                <Tree>
                    {({ Page, Field }) => (

                        <Page>
                            <Field name="internalReference" widget='codeline' />
                            <Field name="productName" />
                            <Field name="quantity" />
                            <Field name="priceUnit" widget='monetary' />
                            <Field name="priceSubtotal" widget='monetary' visible={true} />

                            <Field name="purchaseName" visible={false} widget='chip' colorDecoration={{ info: ({ purchaseName }) => (/P\d{5}/.test(purchaseName)), warning: ({ purchaseName }) => (purchaseName === 'SAE') }} />
                            <Field name="vendorName" visible={true} />
                            <Field name="productCost" widget='monetary' visible={false} />
                            <Field name="costSubtotal" widget='monetary' />

                            <Field name="utilitySubtotal" widget='monetary' />
                            <Field name="totalUtilityPct" widget='percentage' visible={true} />
                            <Field name="margin" widget='percentage' visible={true} />
                        </Page>

                    )}
                </Tree>

            )}
        {({ Kanban, Section, Field }) => (
            <Kanban>
                <Section>
                    <Field name="internalReference" widget='codeline' />
                    <Field name="name" widget='chip' colorDecoration={{ success: () => true }} />
                </Section>
                <Field name="productName" />
                <Field name="vendorName" />
                <Section>
                    <Field name="quantity" label />
                    <Field name="priceUnit" label widget='monetary' colorDecoration={{danger: () => true}} />
                </Section>
                <Section>
                    <Field name="priceSubtotal" label widget='monetary' />
                    <Field name="margin" label widget='percentage' />
                </Section>
                <Field name="utilitySubtotal" widget='monetary' label colorDecoration={{ success: () => true }} />
            </Kanban>
        )}
        </List>
    );
};

export default Sales;