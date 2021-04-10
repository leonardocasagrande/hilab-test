import classes from './NavigationItems.module.css'
import { NavigationItem } from './NavigationItem'
import { useTranslation } from 'react-i18next';


const NavigationItems = () => {
    const {t} = useTranslation('common');
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem exact link="/">
                {t('nav.search')}
            </NavigationItem>
            <NavigationItem exact link="/post/new">
                {t('nav.add')}
            </NavigationItem>
        </ul>
    );
};

export default NavigationItems;
