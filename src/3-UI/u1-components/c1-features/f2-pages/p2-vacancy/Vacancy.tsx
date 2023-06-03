import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Container, TypographyStylesProvider} from "@mantine/core";
import {setErrorVacancyAC, setVacancyData} from "2-BLL/vacancyReducer/vacanciesReducer";
import {useAppDispatch, useAppSelector} from "2-BLL/store";
import {
    errorVacancies,
    isLoadingVacancies,
    vacancyDataVacancies
} from "2-BLL/vacancyReducer/vacancySelectors";
import {LoaderComponent} from "../../../c2-commonComponents/loader/Loader";
import {ErrorComponent} from "../../../c2-commonComponents/error/ErrorComponent";
import {VacancyItem} from "../../../c2-commonComponents/openVacancy/vacancyItem/VacancyItem";
import {useStyles} from "./styleVacancy";


export const Vacancy = () => {

    const dispatch = useAppDispatch()

    const {
        id,
        profession,
        payment_from,
        currency,
        marked,
        type_of_work,
        town,
        vacancyRichText
    } = useAppSelector(vacancyDataVacancies)
    const isLoading = useAppSelector(isLoadingVacancies)
    const error = useAppSelector(errorVacancies)

    const params = useParams<{ id: string }>()

    const {classes, cx} = useStyles();

    useEffect(() => {
        dispatch(setVacancyData(+params.id!))
    }, [params.id])


    if (isLoading) {
        return <LoaderComponent/>
    }

    return (
        <Container className={classes.vacancyContainer}>
            <VacancyItem id={id} professionName={profession} salary={payment_from}
                         curruency={currency} type={type_of_work.title} place={town.title}
                         marked={marked}
                         showSelectedVacancy={true}/>
            <TypographyStylesProvider className={classes.vacancyInfo}>
                <div dangerouslySetInnerHTML={{__html: vacancyRichText}}/>
            </TypographyStylesProvider>

            <ErrorComponent errorMessage={error} setError={setErrorVacancyAC}/>
        </Container>
    );
};

