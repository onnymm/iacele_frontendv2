import usePageSelector from "../../../../hooks/views/form/notebook/usePageSelector";

const PageSelector = ({
    index,
    label,
    invisible,
}: IACele.View.Form.Notebook.Object.PageSelector) => {

    // Obtención de valores desde hook
    const { isSelected, selectPage } = usePageSelector(index);

    // Si el elemento debe ser invisible, se termina la ejecución
    if ( invisible ) return;

    return (
        <div
            className={`${isSelected ? 'z-10 border border-gray-500/30 border-b-transparent border-t-2 border-t-primary-500' : 'text-gray-500 hover:border-b-primary-500/50'} flex items-center bg-white dark:bg-[#1f2f3f] px-4 w-max h-8 font-normal text-xs cursor-pointer`}
            onClick={selectPage}
        >
            {label}
        </div>
    );
};

export default PageSelector;
