import axios from "axios";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";

export default function PostList() {
    const [rows, setRows] = useState(null);
    useEffect(() => {
        axios.get("https://api.mocki.io/v1/a397c26c")
            .then(res => {
                setRows(res.data);
            })
            .catch(err => console.log(err))
    }, [])
    let content = <div>Loading...</div>;
    if (rows) {
        content = (
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
                        {rows.map((row) => (
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell >{row.description}</TableCell>
                                <TableCell >{row.date}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    return (
        <>
            <Typography style={{ marginLeft: '10px', alignSelf: 'left' }} variant="h6">
                Pesquisa de Posts
            </Typography>
            {content}
        </>
    )
}