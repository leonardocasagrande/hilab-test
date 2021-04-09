import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { formatDateToSave } from "../shared/utilities";
import { LoadingContext } from "./LoadingContext";

export const PostsContext = createContext({});

export function PostsProvider({ children }) {

    const { setLoading, setMessage } = useContext(LoadingContext);
    const [posts, setPosts] = useState(null);
    const history = useHistory();


    useEffect(() => {
        setLoading(true);
        setMessage("Loading...")
        axios.get("https://api.mocki.io/v1/686c69d6")
            .then(res => {
                setLoading(false);
                setMessage("")
                const data = res.data;
                data.forEach(el => {
                    el.date = new Date(el.date);
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
        let savedData = {...data, date: formatDateToSave(data.date)};
        console.log(savedData);
        setLoading(true);
        setMessage("Sending...");
        axios.post("https://api.mocki.io/v1/7144e671", savedData)
            .then(res => {
                setLoading(false);
                setMessage("");
                setPosts([...posts, data]);
                history.push('/');
            })
            .catch(err => console.log(err));
    }

    const editPost = (data) => {
        let savedData = {...data, date: formatDateToSave(data.date)};
        console.log(savedData);
        setLoading(true);
        setMessage("Editing...");
        axios.put("https://api.mocki.io/v1/43c8de16", savedData)
            .then(res => {
                setLoading(false);
                setMessage("");
                const updatedPosts = posts.filter(el => el.id !== data.id);
                console.log(updatedPosts)
                setPosts([...updatedPosts, data]);
            })
    }

    const getPost = (id) => {
        const filter = posts.filter(post => post.id === id);
        if (filter) {
            return filter[0];
        }
        return null;
    }

    return (
        <PostsContext.Provider value={{
            posts,
            deletePost,
            addPost,
            getPost,
            editPost
        }}>
            {children}
        </PostsContext.Provider>
    )
}
