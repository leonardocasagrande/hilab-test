import { Container } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../contexts/PostsContext";
import { PostData } from "./PostData";

export default function UpdateContainer() {
    const { posts, getPost } = useContext(PostsContext);
    const [ post, setPost ] = useState(null);
    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get('id');
        if (id && posts) {
            const auxPost = getPost(id);
            if (auxPost) {
                setPost(auxPost);
            } else {
                console.log("Post not found")
            }
        }
    }, [getPost, post, posts, setPost])
    return (
        <main>
            <Container maxWidth="lg">
                <PostData post={post} isEdit={true} />
            </Container>
        </main>
    )
}