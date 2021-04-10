/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { formatDateToSave } from "../shared/utilities";
import { LoadingContext } from "./LoadingContext";

export const PostsContext = createContext({});

export function PostsProvider({ children }) {

    const { setLoading, setMessage } = useContext(LoadingContext);
    const [posts, setPosts] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    const history = useHistory();

    const {t} = useTranslation('common');


    const loadError = (err) => {
        setLoading(false);
        setMessage("");
        sendErrorMessage(err)
    }

    const sendErrorMessage = (message) => {
        setOpenAlert(true);
        setAlertTitle(t('alert.error'));
        setAlertMessage(message);
        setAlertSeverity("error");
    }

    const sendInfoMessage = (message) => {
        setOpenAlert(true);
        setAlertTitle(t('alert.info'));
        setAlertMessage(message);
        setAlertSeverity('info');
    }


    useEffect(() => {
        setLoading(true);
        setMessage(t('spinner.loading'))
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
                loadError(err.message);
            })
    }, [setLoading, setMessage])

    const deletePost = (id) => {
        setLoading(true);
        setMessage(t('spinner.deleting'))
        axios.delete("https://api.mocki.io/v1/8cc89003", { data: { id } })
            .then(res => {
                setLoading(false);
                setMessage("")
                setPosts(posts.filter(post => post.id !== id));
                sendInfoMessage(t('post.success.delete'))
            })
            .catch(err => loadError(err));
    }

    const addPost = (data) => {
        let savedData = { ...data, date: formatDateToSave(data.date) };
        console.log(savedData);
        setLoading(true);
        setMessage(t('spinner.sending'));
        axios.post("https://api.mocki.io/v1/7144e671", savedData)
            .then(res => {
                setLoading(false);
                setMessage("");
                setPosts([...posts, data]);
                history.push('/');
                sendInfoMessage(t('post.success.add'))
            })
            .catch(err => loadError(err));
    }

    const editPost = (data) => {
        let savedData = { ...data, date: formatDateToSave(data.date) };
        console.log(savedData);
        setLoading(true);
        setMessage(t('spinner.editing'));
        axios.put("https://api.mocki.io/v1/43c8de16", savedData)
            .then(res => {
                setLoading(false);
                setMessage("");
                const updatedPosts = posts.filter(el => el.id !== data.id);
                console.log(updatedPosts)
                setPosts([...updatedPosts, data]);
                history.push('/');
                sendInfoMessage(t('post.success.edit'))
            })
            .catch(err => loadError(err.message))
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
            openAlert,
            alertTitle,
            alertMessage,
            alertSeverity,
            deletePost,
            addPost,
            getPost,
            editPost,
            setOpenAlert,
            sendErrorMessage
        }}>
            {children}
        </PostsContext.Provider>
    )
}
