import useIsInvisible from "../hooks/useIsInvisible";

const Group = <M extends ModelName>({
    children,
    label,
    invisible,
}: IACele.View.Form.Group.Params<M>): React.ReactNode => {

    // Obtención del valor computado de si el componente es invisible
    const { computedIsInvisible } = useIsInvisible<M>(invisible);

    // Si el valor computado de invisibilidad es verdadero, se termina la ejecución
    if ( computedIsInvisible ) return;

    return (
        <div className="flex flex-col px-4 group-[.ui-group]:px-0 py-2 group-[.ui-group]:py-0 group-[.ui-group]:pb-0">
            <p className="group-[.ui-group]:hidden opacity-50 pb-1 border-gray-500/50 border-b-1 h-5 font-semibold text-xs uppercase select-none">{label}</p>
            <div className="group ui-group flex flex-col gap-x-4 group-[.ui-group]:grid group-[.ui-group]:grid-cols-2 py-1">
                {children}
            </div>
        </div>
    );
};

export default Group;
