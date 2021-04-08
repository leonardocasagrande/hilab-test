import { Container } from "@material-ui/core";
import { PostData } from "./PostData";

export default function CreateContainer() {
    return (
        <main>
            <Container maxWidth="lg">
                <PostData />
            </Container>
        </main>
    )
}