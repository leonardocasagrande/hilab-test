import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useContext, useEffect } from 'react';
import { AlertTitle } from '@material-ui/lab';
import { PostsContext } from '../contexts/PostsContext';

import classes from './AlertContainer.module.css';

export default function AlertContainer() {
    const { openAlert,
        alertTitle,
        alertMessage,
        alertSeverity,
        setOpenAlert } = useContext(PostsContext);

    //Efeito para fechar automaticamente após 3 segundos.
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpenAlert(false);
        }, 3000)
        return () => {
            clearTimeout(timer);
        }
    }, [setOpenAlert, openAlert])
    return (
        <Collapse className={classes.Alert} in={openAlert}>
            <Alert action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpenAlert(false);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
                severity={alertSeverity}>
                <AlertTitle>{alertTitle}</AlertTitle>
                {alertMessage}
            </Alert>
        </Collapse>
    )
}