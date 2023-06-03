import React from 'react';
import {Container, Loader} from "@mantine/core";
import {useStyles} from './styleLoader';

export const LoaderComponent = () => {

    const {classes, cx} = useStyles();

    return (
        <Container className={classes.loaderContainer}>
            <Loader variant="dots"/>
        </Container>
    );
};

