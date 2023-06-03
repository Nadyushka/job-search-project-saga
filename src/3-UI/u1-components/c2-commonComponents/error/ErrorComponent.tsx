import React, {useCallback, useEffect, useState} from 'react';
import {Container} from '@mantine/core';
import {useAppDispatch} from "2-BLL/store";
import { useStyles } from './styleErrorComponent';

export const ErrorComponent = ({errorMessage, setError}: PropsType) => {

    const dispatch = useAppDispatch()

    const [visible, setVisible] = useState<boolean>(true)

    const {classes, cx} = useStyles();

    const closeError = useCallback(() => {
        setVisible(false)
    }, [])

    useEffect(() => {
        setVisible(true)

        setTimeout(() => {
            closeError()
            dispatch(setError(''))
        }, 6000)

    }, [closeError, errorMessage])

    if (!visible) return null

    return (
        <Container className={errorMessage.length !== 0 ? classes.errorContainer : ''}>
            {errorMessage}
        </Container>
    );
};

type PropsType = {
    errorMessage: string,
    setError: (error: string) => { type: string, error: string }
}