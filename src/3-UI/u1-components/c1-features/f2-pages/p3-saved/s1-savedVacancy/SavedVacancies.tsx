import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Container, Pagination} from '@mantine/core';
import {useAppDispatch, useAppSelector} from "2-BLL/store";
import {isAuthorisedAuth} from "2-BLL/authReucer/selectorsAuth";
import {
    setErrorSelectedVacancyAC, setSelectedVacancies
} from "2-BLL/selectedVacanciesReducer/selectedVacanciesReducer";
import {
    currentPageSelectedVacancies,
    errorSelectedVacancies,
    isLoadingSelectedVacancies, pageCountSelectedVacancies, vacanciesDataSelectedVacancies
} from "2-BLL/selectedVacanciesReducer/selectorsSelectedVacancies";
import {VacancyItem} from "../../../../c2-commonComponents/openVacancy/vacancyItem/VacancyItem";
import {PATH} from "../../../../c2-commonComponents/routes/Routes";
import {LoaderComponent} from "../../../../c2-commonComponents/loader/Loader";
import {ErrorComponent} from "../../../../c2-commonComponents/error/ErrorComponent";
import {useStyles} from './styleSavedVacancies';

export const SavedVacancies = () => {

    const dispatch = useAppDispatch()
    const isAuthorised = useAppSelector(isAuthorisedAuth)
    const isLoading = useAppSelector(isLoadingSelectedVacancies)
    const error = useAppSelector(errorSelectedVacancies)
    const selectedVacancies = useAppSelector(vacanciesDataSelectedVacancies).objects
    const totalVacancies = useAppSelector(vacanciesDataSelectedVacancies).total
    const pageCount = useAppSelector(pageCountSelectedVacancies)
    const currentPage = useAppSelector(currentPageSelectedVacancies)

    const navigate = useNavigate()

    const {classes, cx} = useStyles();

    let totalPages = Math.ceil(totalVacancies / pageCount)
    const [activePage, setPage] = useState<number>(currentPage);

    let regularFirstPage = activePage * pageCount - pageCount;
    let notEnoughValuesPage = activePage * pageCount - 2 * pageCount
    let firstValueOfCurrentPage = activePage > totalPages ? notEnoughValuesPage : regularFirstPage
    let lastValueOfCurrentPage = firstValueOfCurrentPage + pageCount

    useEffect(() => {
        if (selectedVacancies.length === 0) {
            navigate(PATH.NO_SELECTED_VACANCIES)
        }
        dispatch(setSelectedVacancies(1, 4))
    }, [selectedVacancies.length])

    // if (!isAuthorised) {
    //     navigate(PATH.LOGIN)
    // }

    if (isLoading) {
        return <LoaderComponent/>
    }

    return (
        <Container className={classes.selectedVacancyContainer}>
            {selectedVacancies.slice(firstValueOfCurrentPage, lastValueOfCurrentPage).map(({
                                                                                               id,
                                                                                               profession,
                                                                                               currency,
                                                                                               payment_from,
                                                                                               type_of_work,
                                                                                               town,
                                                                                               marked
                                                                                           }) => {
                return (
                    <VacancyItem key={id} id={id} professionName={profession} curruency={currency}
                                 salary={payment_from} type={type_of_work.title} place={town.title}
                                 showSelectedVacancy={true} marked={marked}/>
                )
            })}
            <Pagination className={classes.jobSearchPagination}
                        value={activePage}
                        onChange={setPage}
                        total={totalPages}
            />

            <ErrorComponent errorMessage={error} setError={setErrorSelectedVacancyAC}/>

        </Container>
    );
};
