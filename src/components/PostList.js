import { useContext } from "react";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, Paper } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import classes from './PostList.module.css';
import { useHistory } from "react-router-dom";
import { PostsContext } from "../contexts/PostsContext";


export default function PostList(props) {
    const { posts, deletePost } = useContext(PostsContext);
    const history = useHistory();

    const deletePostHandler = (id) => {
        deletePost(id);
    }

    const editPostHandler = (id) => {
        history.push({
            pathname: '/post',
            search: `?id=${id}`
        })
    }


    let content = null;
    if (posts) {
        content = (
            <Paper className={classes.Paper} >
                <Toolbar className={classes.Toolbar}>
                    <Typography variant="h6">
                        Post Listing
                    </Typography>
                </Toolbar>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Título</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Categoria</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell >{row.description}</TableCell>
                                    <TableCell >{row.date}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => deletePostHandler(row.id)} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={() => editPostHandler(row.id)} aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }
    return (
        <>
            {content}
        </>
    )
}