const IconSun: React.FC<React.SVGProps<SVGElement>> = ({
    className
}) => {

    return (
        <svg
            className={className}
            viewBox="0 -960 960 960"
        >
            <path d="M480-332q-62 0-105-43t-43-105q0-62 43-105t105-43q62 0 105 43t43 105q0 62-43 105t-105 43ZM200-466H66v-28h134v28Zm694 0H760v-28h134v28ZM466-760v-134h28v134h-28Zm0 694v-134h28v134h-28ZM274-668l-82-80 19-21 81 81-18 20Zm475 477-81-81 18-20 82 80-19 21Zm-81-495 80-82 21 19-81 81-20-18ZM191-211l81-81 18 18-79 83-20-20Z"/>
        </svg>
    );
};

export default IconSun;
