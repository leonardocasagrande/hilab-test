import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Logo } from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import classes from './Header.module.css';
import { ScreenSizeContext } from "../../../contexts/ScreenSizeContext";

/**
 * Componente de cabeçalho da aplicação.
 * @returns Cabeçalho da aplicação.
 */
export function Header() {
    
    const { isMobile } = useContext(ScreenSizeContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { t } = useTranslation('common');
    return (
        <AppBar color="secondary" position="static">
            <Toolbar className={classes.Toolbar} >
                {isMobile &&
                    <>
                        <IconButton edge="start" color="inherit" aria-label="menu"
                            onClick={() => setDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                            <div onClick={() => setDrawerOpen(false)} className={classes.DrawerContent}>
                                <Logo />
                                <NavigationItems />
                            </div>
                        </Drawer>
                    </>
                }
                <div style={{ display: 'flex' }}>
                    <Logo />
                    <Typography className={classes.Typography} variant="h6">
                        {t('header.title')}
                    </Typography>
                </div>
                {!isMobile && <NavigationItems />}
            </Toolbar>
        </AppBar>
    )
}