import { Container, Fade } from "@material-ui/core";
import PostList from "./PostList";

export default function SearchContainer() {
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