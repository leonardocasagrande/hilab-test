import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

/**
 * Componente de item de navegação.
 * @param {Object} props Propriedades contendo link a redirecionar e se considera link exato
 * @returns Item de navegação.
 */
export const NavigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link} 
        activeClassName={classes.active} 
        exact={props.exact}>
            {props.children}
        </NavLink>
    </li>
);