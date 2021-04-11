import { useContext, useEffect, useState } from "react";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, Paper, TableFooter, TablePagination, Tooltip } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import classes from './PostList.module.css';
import { useHistory } from "react-router-dom";
import { PostsContext } from "../../contexts/PostsContext";
import { formatDate } from "../../shared/utilities";
import { useTranslation } from "react-i18next";
import { ScreenSizeContext } from "../../contexts/ScreenSizeContext";
import { PostFilters } from "../PostFilters/PostFilters";

/**
 * Componente de controle de lista de posts.
 * @returns Componente de controle de lista de posts.
 */
export default function PostList() {
    const { posts, deletePost, getCategoryById } = useContext(PostsContext);
    const { isMobile } = useContext(ScreenSizeContext);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filteredPosts, setFilteredPosts] = useState(null);

    const { t } = useTranslation('common');

    const history = useHistory();

    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts])

    const deletePostHandler = (id) => {
        deletePost(id);
    }

    const filterData = (title, category) => {
        let filteredData = posts.filter
            (post => post.title.includes(title));
        if (category) {
            filteredData = filteredData.filter(post => post.category === category);
        }
        setFilteredPosts(filteredData);
        setPage(0);
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
    if (filteredPosts) {
        content = (
            <>
                <Toolbar className={classes.Toolbar}>
                    <Typography variant="h6" color="textSecondary">
                        {t('table.title')}
                    </Typography>
                </Toolbar>
                <PostFilters filterData={filterData} />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('table.header.title')}</TableCell>
                                {!isMobile && (
                                    <>
                                        <TableCell>{t('table.header.description')}</TableCell>
                                        <TableCell>{t('table.header.date')}</TableCell>
                                    </>
                                )}
                                <TableCell>{t('table.header.category')}</TableCell>
                                <TableCell>{t('table.header.actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? filteredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filteredPosts
                            ).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    {!isMobile && (
                                        <>
                                            <TableCell style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{row.description}</TableCell>
                                            <TableCell >{formatDate(row.date)}</TableCell>
                                        </>
                                    )}
                                    <TableCell>{t(getCategoryById(row.category))}</TableCell>
                                    <TableCell>
                                        <Tooltip title={t('table.tooltip.edit')} arrow>
                                            <IconButton onClick={() => editPostHandler(row.id)} aria-label="edit">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={t('table.tooltip.delete')} arrow>
                                            <IconButton onClick={() => deletePostHandler(row.id)} aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredPosts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={isMobile ? 3 : 5}>
                                        {t('table.norecords')}
                                    </TableCell>
                                </TableRow>)}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[3, 5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={isMobile ? 3 : 5}
                                    labelRowsPerPage={t('table.rows-per-page')}
                                    count={filteredPosts.length}
                                    labelDisplayedRows={({ from, to, count }) => null}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </>
        )
    }
    if (!isMobile) {
        content = (
            <Paper className={classes.Paper} >
                {content}
            </Paper>
        )
    }
    return (
        <>
            {content}
        </>
    )
}