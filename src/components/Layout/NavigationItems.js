import classes from './NavigationItems.module.css'
import {NavigationItem} from './NavigationItem'


const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">
            Pesquisa
        </NavigationItem>
        <NavigationItem exact link="/post/new">
            Adicionar
        </NavigationItem>
    </ul>
);

export default navigationItems;
