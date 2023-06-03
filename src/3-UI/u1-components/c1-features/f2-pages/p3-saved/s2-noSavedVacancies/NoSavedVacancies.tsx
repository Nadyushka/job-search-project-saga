import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Container,  Image, rem, Text} from "@mantine/core";
import noVacanciesFoundImg from '3-UI/u2-assets/pictures/noVacanciesFoundIcon.svg'
import {PATH} from "../../../../c2-commonComponents/routes/Routes";
import {useStyles} from "./styleNoSavedVacancies";

export const NoSavedVacancies = () => {

    const navigate = useNavigate()

    const {classes, cx} = useStyles();

    const buttonOnClickHandler = () => navigate(PATH.VACANCY_SEARCH)

    return (
        <Container className={classes.noSelectedVacancyContainer}>
            <Image className={classes.noSelectedVacancyImg} src={noVacanciesFoundImg} width={'240px'}
                   height={'230.27px'}/>
            <Text className={classes.noSelectedVacancyText}>Упс, здесь еще ничего нет!</Text>
            <Button sx={{fontFamily: 'Open Sans, sans-serif',}}
                    className={classes.noSelectedVacancyButton}
                    onClick={buttonOnClickHandler}
            >Поиск
                Вакансий</Button>
        </Container>
    );
};


