import { Container, Fade } from "@material-ui/core";
import PostList from "../components/PostList/PostList";

/**
 * Página de busca de posts.
 * @returns Componente React de página de busca de posts.
 */
export default function SearchPage() {
    return (
        <main>
            <Fade in={true}>
                <Container maxWidth="lg">
                    <PostList />
                </Container>
            </Fade>
        </main>
    )
}