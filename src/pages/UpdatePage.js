import { Container, Fade } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { PostsContext } from "../contexts/PostsContext";
import { PostData } from "../components/PostData/PostData";

/**
 * Página de atualização de post.
 * @returns Componente react para página de atualização de post.
 */
export default function UpdatePage() {
    const { posts, getPost, sendErrorMessage } = useContext(PostsContext);
    const [post, setPost] = useState(null);
    const history = useHistory();
    const {t} = useTranslation('common');
    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get('id');
        if (id && posts) {
            const auxPost = getPost(id);
            if (auxPost) {
                setPost(auxPost);
            } else {
                sendErrorMessage(t('post.load.error'));
                history.push('/');
            }
        }
    }, [getPost, history, post, posts, sendErrorMessage, setPost, t])
    return (
        <main>
            <Fade in={true}>
                <Container maxWidth="lg">
                    <PostData post={post} isEdit={true} />
                </Container>
            </Fade>
        </main>
    )
}