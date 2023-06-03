import React from 'react';
import {Container, List, Title} from '@mantine/core';
import {useStyles} from './styleVacancyDescription';


type PropsType = {
    responsibilities: string[]
    requirements: string[]
    conditions: string[]
}

export const VacancyDescription = ({responsibilities, requirements, conditions}: PropsType) => {

    const {classes, cx} = useStyles();

    return (
        <Container className={classes.vacancyContainer}>
            <Title order={4}>Обязанности:</Title>
            <List size="sm">
                {responsibilities.map((r, i) => {
                        return (
                            <List.Item key={i}>{r}</List.Item>
                        )
                    }
                )}
            </List>
            <Title order={4}>Требования:</Title>
            <List size="sm">
                {requirements.map((r, i) => {
                        return (
                            <List.Item key={i}>{r}</List.Item>
                        )
                    }
                )}
            </List>
            <Title order={4}>Условия:</Title>
            <List size="sm">
                {conditions.map((c, i) => {
                        return (
                            <List.Item key={i}>{c}</List.Item>
                        )
                    }
                )}
            </List>
        </Container>
    );
};

