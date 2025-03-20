import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Root from "./Root.tsx";
import AuthProvider from './security/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <Root />
    </AuthProvider>
);
