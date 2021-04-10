import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Logo } from "./Logo";
import NavigationItems from "./NavigationItems";
import {useTranslation} from "react-i18next";

export function Header() {
    const {t} = useTranslation('common');
    return (
        <AppBar color="secondary" position="static">
            <Toolbar style={{ justifyContent: 'space-between' }} >
                <div style={{display: 'flex'}}>
                    <Logo />
                    <Typography style={{marginLeft: '10px'}} variant="h6">
                        {t('header.title')}
                    </Typography>
                </div>
                <NavigationItems />
            </Toolbar>
        </AppBar>
    )
}