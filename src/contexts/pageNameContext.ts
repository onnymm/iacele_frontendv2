import { createContext } from "react";

const PageNameContext = createContext<IACele.Application.PageName>({
    pageName: 'iaCele',
    setPageName: () => (null),
});

export default PageNameContext;
