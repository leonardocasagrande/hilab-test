import { MenuItem, TextField } from "@material-ui/core"
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { PostsContext } from "../../contexts/PostsContext";

import classes from './PostFilters.module.css';
export const PostFilters = ({ filterData }) => {
    const { categories } = useContext(PostsContext);

    const [titleFilter, setTitleFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const { t } = useTranslation('common');

    const onChangeFilter = (event, type) => {
        switch (type) {
            case 'title':
                filterData(event.target.value, categoryFilter);
                setTitleFilter(event.target.value);
                break;
            case 'category':
                filterData(titleFilter, event.target.value);
                setCategoryFilter(event.target.value);
                break;
            default: return;
        }
    }

    return (
        <>
            <form className={classes.Form}>
                <div className={classes.FilterTitle}>
                    <TextField
                        fullWidth
                        label={t('post.filter.title')}
                        value={titleFilter}
                        onChange={(event) => onChangeFilter(event, 'title')} />
                </div>
                <div className={classes.FilterCategory}>
                    <TextField
                        select
                        fullWidth
                        value={categoryFilter}
                        onChange={(event) => onChangeFilter(event, 'category')}
                        label={t('post.filter.category')}>
                        <MenuItem key="" value="">
                            {t('post.filter.select')}
                        </MenuItem>
                        {categories && categories.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {t(option.label)}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </form>
        </>
    )
}