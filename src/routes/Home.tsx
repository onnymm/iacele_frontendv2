import React, { useEffect } from "react";
import useViewName from "../hooks/app/usePageName";

const Home = (): (React.JSX.Element) => {

    const { setViewName } = useViewName();

    useEffect(
        () => {
            setViewName('Inicio');
        }, [setViewName]
    );

    return (
        <span>Inicio</span>
    );
};

export default Home;
