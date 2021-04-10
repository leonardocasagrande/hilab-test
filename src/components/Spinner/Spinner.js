import { CircularProgress, Typography } from "@material-ui/core";
import { useContext } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";
import classes from './Spinner.module.css';

/**
 * Componente informativo de carregamento da página.
 * @returns Componente de carregamento.
 */
export function Spinner() {
    const { loading, message } = useContext(LoadingContext);
    let content = null;
    if (loading) {
        content = (
            <div className={classes.Spinner}>
                <CircularProgress />
                <Typography >
                    {message}
                </Typography>
            </div>
        )
    }
    return <>{content}</>
}