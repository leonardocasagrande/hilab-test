import { Container } from "@material-ui/core";
import PostList from "./PostList";

export default function SearchContainer() {
    return (
        <main>
            <Container maxWidth="md">
                <PostList />
            </Container>
        </main>
    )
}