import { Container, Fade } from "@material-ui/core";
import { PostData } from "./PostData";

export default function CreateContainer() {
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