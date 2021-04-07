import classes from './NavigationItems.module.css'
import {NavigationItem} from './NavigationItem'


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">
            Pesquisa
        </NavigationItem>
        <NavigationItem  link="/orders">
            Adicionar
        </NavigationItem>
    </ul>
);

export default navigationItems;
