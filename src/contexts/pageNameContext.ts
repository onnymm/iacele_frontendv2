import { createContext } from "react";

const PageNameContext = createContext<IACeleV2.Application.PageName>({
    pageName: 'iaCele',
    setPageName: () => (null),
});

export default PageNameContext;
