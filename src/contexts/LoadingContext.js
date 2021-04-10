import { createContext, useState } from "react";

export const LoadingContext = createContext({});

/**
 * Provedor de informações de carregamento da aplicação.
 * @param {ReactChildren} children Componentes filhos
 * @returns Provedor de carregamento.
 */
export function LoadingProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    return(
        <LoadingContext.Provider value={{
            loading,
            message,
            setLoading,
            setMessage
        }}>
            {children}
        </LoadingContext.Provider>
    )
}
