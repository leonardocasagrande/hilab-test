/**
 * Componente de construção de logo a partir de imagem.
 * @param {String} height Altura da imagem da logo
 * @returns Logo
 */
export function Logo({height}) {
    return (
        <div style={{ height: height }}>
            <img src={'https://hilab.com.br/wp-content/uploads/2019/10/Grupo-87.png'} alt="hilab" />
        </div>
    )
};
