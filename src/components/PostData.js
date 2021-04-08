import { Button, MenuItem, Paper, TextField, Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../contexts/PostsContext";
import SaveIcon from '@material-ui/icons/Save';
import classes from './PostData.module.css';

const categoryOptions = [
    { value: 1, label: 'Categoria 1' },
    { value: 2, label: 'Categoria 2' },
    { value: 3, label: 'Categoria 3' },
    { value: 4, label: 'Categoria 4' },
    { value: 5, label: 'Categoria 5' },
]

export const PostData = () => {

    const { posts, getPost } = useContext(PostsContext);


    const [post, setPost] = useState({
        id: null,
        title: '',
        description: '',
        date: '',
        category: ''
    })

    const [isEdit, setIsEdit] = useState(false);

    const setTitle = (value) => {
        setPost({
            ...post,
            title: value
        })
    }

    const setDescription = (value) => {
        setPost({
            ...post,
            description: value
        })
    }

    const setDate = (value) => {
        console.log(value);
        setPost({
            ...post,
            date: value
        })
    }

    const setCategory = (value) => {
        setPost({
            ...post,
            category: value
        })
    }

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get('id');
        setIsEdit(false);
        if (id && posts) {
            const auxPost = getPost(id);
            if (auxPost) {
                setPost(getPost(id));
                console.log(getPost(id));
                setIsEdit(true);
            } else {
                console.log("Post not found")
            }
        }
    }, [getPost, posts])

    return (
        <Paper className={classes.Paper} >
            <Typography variant="h6" className={classes.Title}>
                {isEdit ? 'Edit Post' : 'Add Post'}
            </Typography>
            <form>
                <TextField
                    color="secondary"
                    label="Titulo"
                    fullWidth
                    value={post.title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <TextField
                    color="secondary"
                    multiline
                    label="Descrição"
                    rows={7}
                    fullWidth
                    onChange={(event) => setDescription(event.target.value)}
                    value={post.description} />
                <TextField
                    label="Data"
                    type="date"
                    value={post.date}
                    color="secondary"
                    onChange={(event) => setDate(event.target.value)}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }} />
                <TextField
                    id="standard-select-currency"
                    select
                    label="Categoria"
                    fullWidth
                    value={post.category}
                    onChange={(event) => setCategory(event.target.value)}
                    helperText="Please select your category"
                    color="secondary"
                >
                    {categoryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                style={{marginTop: '15px'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button>
            </form>
        </Paper>
    )
}