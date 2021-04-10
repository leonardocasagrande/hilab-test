/* eslint-disable react-hooks/exhaustive-deps */
import { Button, MenuItem, Paper, TextField, Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";

import { PostsContext } from "../../contexts/PostsContext";
import SaveIcon from '@material-ui/icons/Save';
import classes from './PostData.module.css';
import { categoryOptions } from "../../shared/categoryOptions";

/**
 * Componente de formulário de criação/edição de posts.
 * @param {Boolean} isEdit Se é modo edição 
 * @param {Object} post Post sendo editado
 * @returns Componente de formulário de criação/edição de posts.
 */
export const PostData = ({isEdit, post}) => {

    const { addPost, editPost } = useContext(PostsContext);

    const {t} = useTranslation('common');

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            category: ''
        }
    });

    useEffect(() => {
        if(post) {
            reset(post)
        }
    }, [post])


    const onSubmit = (data) => {
        if (data.id) {
            editPost(data);
        } else {
            addPost(data);
        }
    }

    return (
        <Paper className={classes.Paper} >
            <Typography variant="h6" color="textSecondary" className={classes.Title}>
                {isEdit ? t('post.edit') : t('post.add')}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="title"
                    rules={{ required: true, maxLength: 32 }}
                    control={control}
                    render={({ field }) =>
                        <TextField
                            label={t('post.form.title')}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...field} />}>

                </Controller>
                {errors?.title?.type === "required" && <p className={classes.Error}>{t('post.form.error.title.required')}</p>}
                {errors?.title?.type === "maxLength" && <p className={classes.Error}>{t('post.form.error.title.maxlength')}</p>}
                <Controller
                    name="description"
                    control={control}
                    rules={{maxLength: 128}}
                    render={({ field }) =>
                        <TextField
                            label={t('post.form.description')}
                            fullWidth
                            multiline
                            rows={7}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...field} />}>
                </Controller>
                {errors?.description?.type === "maxLength" && <p className={classes.Error}>{t('post.form.error.description.maxlength')}</p>}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Controller
                        name="date"
                        control={control}
                        rules={{ required: true }}
                        initialFocusedDate={null}
                        defaultValue={null}
                        render={({ field: { ref, ...rest } }) =>
                            <KeyboardDatePicker
                                margin="normal"
                                label={t('post.form.date')}
                                fullWidth
                                format="dd/MM/yyyy"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                {...rest} />}>
                    </Controller>
                </MuiPickersUtilsProvider>
                {errors?.date?.type === "required" && <p className={classes.Error}>{t('post.form.error.date')}</p>}
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) =>
                        <TextField
                            id="standard-select-currency"
                            select
                            fullWidth
                            label={t('post.form.category')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...field} >
                            {categoryOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {t(option.label)}
                                </MenuItem>
                            ))}
                        </TextField>}
                />
                {errors?.category?.type === "required" && <p className={classes.Error}>{t('post.form.error.category')}</p>}

                < Button
                    style={{ marginTop: '15px' }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}>
                    {t('post.form.save')}
                </Button>
            </form>
        </Paper >
    )
}