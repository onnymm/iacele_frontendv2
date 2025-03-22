// import Sheet from "./Sheet"; // eslint-disable-line

interface GroupParams extends GenericInvolverComponent {
    title?: string; // Título del grupo de componentes.
};

const Group: React.FC<GroupParams> = ({
    children,
    title,
}) => {

    return (
        <div className="group ui-layout-group flex flex-col gap-2 group-[.ui-layout-group]:grid group-[.ui-layout-group]:grid-cols-2 pb-2 last:pb-0 group-[.ui-layout-group]:pb-0">
            {title &&
                <p className="self-center opacity-50 font-semibold text-xs uppercase select-none">{title}</p>
            }
            {children}
        </div>
    );
};

export default Group;
