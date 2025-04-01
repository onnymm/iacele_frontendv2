import { createContext } from "react";

const PageNameContext = createContext<IACele.Context.PageName>({
    pageName: 'iaCele',
    setPageName: () => null,
});

export default PageNameContext;
