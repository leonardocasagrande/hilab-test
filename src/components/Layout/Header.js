import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { NavLink } from 'react-router-dom';
import { Logo } from "./Logo";
import NavigationItems from "./NavigationItems";


export function Header() {
    return (
        <AppBar position="static">
            <Toolbar style={{ justifyContent: 'space-between' }} >
                <div style={{display: 'flex'}}>
                    <Logo />
                    <Typography style={{marginLeft: '10px'}} variant="h6">
                        Teste de Front-End da Hilab
                    </Typography>
                </div>
                <NavigationItems />
            </Toolbar>
        </AppBar>
    )
}