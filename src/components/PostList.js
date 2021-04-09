import { useContext, useState } from "react";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, Paper, TableFooter, TablePagination } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import classes from './PostList.module.css';
import { useHistory } from "react-router-dom";
import { PostsContext } from "../contexts/PostsContext";
import { formatDate } from "../shared/utilities";
import { getCategoryById } from "../shared/categoryOptions";


export default function PostList(props) {
    const { posts, deletePost } = useContext(PostsContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    let content = null;
    if (posts) {
        content = (
            <Paper className={classes.Paper} >
                <Toolbar className={classes.Toolbar}>
                    <Typography variant="h6" color="textSecondary">
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
                            {(rowsPerPage > 0
                                ? posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : posts
                            ).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell >{row.description}</TableCell>
                                    <TableCell >{formatDate(row.date)}</TableCell>
                                    <TableCell>{getCategoryById(row.category)}</TableCell>
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
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[3, 5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={posts.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
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