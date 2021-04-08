import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { LoadingContext } from "./LoadingContext";

export const PostsContext = createContext({});

export function PostsProvider({ children}) {

    const { setLoading, setMessage } = useContext(LoadingContext);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        setLoading(true);
        setMessage("Loading...")
        axios.get("https://api.mocki.io/v1/82519cc7")
            .then(res => {
                setLoading(false);
                setMessage("")
                const data = res.data;
                data.forEach(el => {
                    let date = new Date(el.date);
                    el.date = `${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
                })
                setPosts(data);
            })
            .catch(err => {
                setLoading(false);
                setMessage("")
                console.log(err)
            })
    }, [setLoading, setMessage])

    const deletePost = (id) => {
        setLoading(true);
        setMessage("Deleting...")
        axios.delete("https://api.mocki.io/v1/8cc89003", { data: { id } })
            .then(res => {
                setLoading(false);
                setMessage("")
                setPosts(posts.filter(post => post.id !== id));
            })
            .catch(err => console.log(err));
    }

    const addPost = (data) => {
        setLoading(true);
        setMessage("Sending...");
        axios.post("", data)
            .then(res => {
                setLoading(false);
                setMessage("");
                setPosts([...posts, data]);
            })
            .catch(err => console.log(err));
    }

    const getPost = (id) => {
        const filter = posts.filter(post => post.id === id);
        if(filter) {
            return filter[0];
        }
        return null;
    }

    return (
        <PostsContext.Provider value={{
            posts,
            deletePost,
            addPost,
            getPost
        }}>
            {children}
        </PostsContext.Provider>
    )
}
