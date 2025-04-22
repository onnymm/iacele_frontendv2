import Sizeable from "../../common/Sizeable";
import Pagination from "./Pagination";
import SelectVisibleColumns from "./SelectVisibleColumns";
import SortFields from "./SortFields";

const Controls = <K extends IACele.API.Database.TableName>({
    count,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    visibleColumnsKeys,
    toggleableColumns,
    setVisibleColumnsKeys,
    selectedSortingDirection,
    sorteableFields,
    kanbanSortingField,
    setKanbanSortingField,
    setSelectedSortingDirection,
}: (
    & IACele.View.Pagination.Navigation
    & IACele.Hook._ColumnsVisibilityHandling<K>
    & IACele.View.Tree._HasSortingDirection
    & IACele.Hook._SortingFieldHandling<K>
    & IACele.Hook._SortingDirectionHandling
)) => {

    return (
        <div className="flex flex-row gap-1">
            <Pagination
                count={count}
                currentPage={currentPage}
                totalPages={totalPages}
                prevPage={prevPage}
                nextPage={nextPage}
            />

            {/* Control de ordenamiento de datos */}
            <Sizeable>
                {({ view }) => {
                    if ( view === 'desktop' ) {
                        return (
                            <SelectVisibleColumns
                                visibleColumnsKeys={visibleColumnsKeys}
                                toggleableColumns={toggleableColumns}
                                setVisibleColumnsKeys={setVisibleColumnsKeys}
                            />
                        );
                    } else {
                        return (
                            <SortFields
                                selectedSortingDirection={selectedSortingDirection}
                                sorteableFields={sorteableFields}
                                kanbanSortingField={kanbanSortingField}
                                setKanbanSortingField={setKanbanSortingField}
                                setSelectedSortingDirection={setSelectedSortingDirection}
                            />
                        );
                    };
                }}
            </Sizeable>
        </div>
    );
};

export default Controls;
