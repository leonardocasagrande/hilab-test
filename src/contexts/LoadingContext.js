import { createContext, useState } from "react";

export const LoadingContext = createContext({});

export function LoadingProvider({children, ...rest}) {
    const [loading, setLoading] = useState(rest.loading ?? false);
    const [message, setMessage] = useState(rest.message ?? '');

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
