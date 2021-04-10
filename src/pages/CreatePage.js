import { Container, Fade } from "@material-ui/core";
import { PostData } from "../components/PostData/PostData";

/**
 * Página de criação de posts.
 * @returns Componente React de página de criação de posts.
 */
export default function CreatePage() {
    return (
        <main>
            <Fade in={true}>
                <Container maxWidth="lg">
                    <PostData />
                </Container>
            </Fade>
        </main>
    )
}