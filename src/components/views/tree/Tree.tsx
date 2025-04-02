import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import RenderCell from "./components/RenderCell";
import SortingFieldContext from "../../../contexts/sortingFieldContext";
import InteractiveColumn from "./components/InteractiveColumn";

interface TreeParams {
    tableName: IACele.API.Database.TableName,
    tableColumns: IACele.View.List._TableColumnConfig<IACele.API.DataTypes.GenericRecord>[];
    selectedSortingDirection: Set<IACele.View.SortingDirectionValue>;
    sortingFieldKey: string | null;
    toggleSortingColumn: (key: string) => void;
    emptyContent: string;
    loading: boolean;
    records: IACele.API.DataTypes.GenericRecord[];
};

const Tree: React.FC<TreeParams> = ({
    tableName,
    tableColumns,
    selectedSortingDirection,
    sortingFieldKey,
    toggleSortingColumn,
    emptyContent,
    loading,
    records,
}) => {

    return (
        <div className="flex flex-col gap-2 h-full overflow-hidden">
            <div className="bg-white dark:bg-[#1f2f3f] p-2 rounded-2xl h-full">
                <SortingFieldContext.Provider value={{ sortingFieldKey, selectedSortingDirection, toggleSortingColumn }}>
                    <Table
                        isHeaderSticky
                        hideHeader={!records}
                        aria-label="Tabla"
                        classNames={{
                            table: 'h-full overflow-y-scroll',
                            base: 'h-full',
                            wrapper: 'p-0 bg-transparent h-full',
                            th: 'shadow-sm p-0 bg-transparent',
                            tr: 'transition-transform-colors hover:bg-primary-500',
                            thead: '*:hover:bg-transparent',
                        }}
                    >
                        <TableHeader columns={tableColumns}>
                            {
                                (column) => (
                                    <TableColumn>
                                        <InteractiveColumn viewConfig={tableColumns} columnKey={column.key} label={column.label} ascendingDirection={selectedSortingDirection} />
                                    </TableColumn>
                                )
                            }
                        </TableHeader>
                        <TableBody isLoading={loading} loadingContent={<Spinner />} items={records} emptyContent={emptyContent}>
                            {
                                (record) => (
                                    <TableRow className="hover:cursor-pointer">
                                        {
                                            (columnKey) => (
                                                <TableCell>
                                                    <RenderCell
                                                        columns={tableColumns as IACele.View.List.ViewConfig<IACele.API.DataTypes.GenericRecord>}
                                                        columnKey={columnKey}
                                                        record={record}
                                                        tableName={tableName}
                                                        />
                                                </TableCell>
                                            )
                                        }
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </SortingFieldContext.Provider>
            </div>
        </div>
    );
};

export default Tree;
