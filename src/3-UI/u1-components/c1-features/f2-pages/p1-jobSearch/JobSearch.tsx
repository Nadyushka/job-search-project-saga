import React from 'react';
import {Box, Container, Title} from "@mantine/core";
import {Filters} from "./j1-jobSearchFiltersAndOffers/v1-filters/Filters";
import {JobOffers} from './j1-jobSearchFiltersAndOffers/v2-jobOffers/JobOffers';
import {useStyles} from "./styleJobSearch";

export const JobSearch = () => {

    const {classes, cx} = useStyles();

    return (
        <Container className={classes.jobSearchContainer}>
            <Title order={1} className={classes.mainTitle}>Job search</Title>
            <Filters/>
            <Box className={classes.jobOffers}>
                <JobOffers/>
            </Box>
        </Container>
    );
};


