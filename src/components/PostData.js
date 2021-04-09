/* eslint-disable react-hooks/exhaustive-deps */
import { Button, MenuItem, Paper, TextField, Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';


import { PostsContext } from "../contexts/PostsContext";
import SaveIcon from '@material-ui/icons/Save';
import classes from './PostData.module.css';
import { categoryOptions } from "../shared/categoryOptions";
import { useForm, Controller } from "react-hook-form";

export const PostData = ({isEdit, post}) => {

    const { addPost, editPost } = useContext(PostsContext);

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
                {isEdit ? 'Edit Post' : 'Add Post'}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="title"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) =>
                        <TextField
                            label="Título"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...field} />}>

                </Controller>
                {errors?.title?.type === "required" && <p className={classes.Error}>Title is required</p>}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) =>
                        <TextField
                            label="Descrição"
                            fullWidth
                            multiline
                            rows={7}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...field} />}>
                </Controller>
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
                                label="Data"
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
                {errors?.date?.type === "required" && <p className={classes.Error}>Date is required</p>}
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) =>
                        <TextField
                            id="standard-select-currency"
                            select
                            fullWidth
                            label="Categoria"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...field} >
                            {categoryOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>}
                />
                {errors?.category?.type === "required" && <p className={classes.Error}>Category is required</p>}

                < Button
                    style={{ marginTop: '15px' }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}>
                    Save
                </Button>
            </form>
        </Paper >
    )
}