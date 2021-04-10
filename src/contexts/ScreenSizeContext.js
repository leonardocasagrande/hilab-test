import { createContext, useEffect, useState } from "react";

export const ScreenSizeContext = createContext({});
/**
 * Provedor de informação à aplicação de tamanho de tela mobile ou desktop
 * @param {ReactChildren} children Componentes filhos 
 * @returns Provedor de tamanho de tela.
 */
export function ScreenSizeProvider({ children }) {


    //Variavel de controle de ser mobile
    const [isMobile, setIsMobile] = useState(false);

    //Quando monta, verifica o tamanho da tela e adiciona listener de alteração de tamanho.
    //Quando desmonta, retira o listener
    useEffect(() => {
        updateSize();
        window.addEventListener("resize", updateSize);
        return function cleanup() {
            window.removeEventListener("resize", updateSize);
        }
    })

    /**
     * Atualiza o tamanho da tela de acordo com o tamanho obtido.
     */
    function updateSize() {
        const result = window.innerWidth < 600;
        if (result !== isMobile) {
            setIsMobile(result);
        }
    }

    return (
        <ScreenSizeContext.Provider value={{ isMobile }}>
            {children}
        </ScreenSizeContext.Provider>
    )
}
