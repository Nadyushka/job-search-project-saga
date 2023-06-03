import React, {useEffect, useState} from 'react';
import {Search} from 'tabler-icons-react';
import {Button, Container, Pagination, Text, TextInput} from '@mantine/core';
import {LoaderComponent} from "../../../../../c2-commonComponents/loader/Loader";
import {ErrorComponent} from "../../../../../c2-commonComponents/error/ErrorComponent";
import {VacancyItem} from "../../../../../c2-commonComponents/openVacancy/vacancyItem/VacancyItem";
import {useAppDispatch, useAppSelector} from "2-BLL/store";
import {
    setCatalogueData,
    setErrorVacancyAC, setFilteredVacancies,
    setKeyWordValueAC, setPageInfoAC, setVacanciesData,

} from "2-BLL/vacancyReducer/vacanciesReducer";
import {
    catalogueDataVacancies,
    currentPageVacancies,
    errorVacancies,
    isLoadingVacancies,
    jobAreaVacancies,
    keyWordVacancies,
    pageCountVacancies,
    paymentFromVacancies,
    paymentToVacancies,
    vacanciesDataVacancies
} from "2-BLL/vacancyReducer/vacancySelectors";
import {useStyles} from "./styleJobOffers";

export const JobOffers = () => {

    const dispatch = useAppDispatch()
    const vacancies = useAppSelector(vacanciesDataVacancies).objects
    const error = useAppSelector(errorVacancies)
    const isLoading = useAppSelector(isLoadingVacancies)
    const totalVacancies = useAppSelector(vacanciesDataVacancies).total
    const pagesCount = useAppSelector(pageCountVacancies)
    const paymentFrom = useAppSelector(paymentFromVacancies)
    const currentPage = useAppSelector(currentPageVacancies)
    const paymentTo = useAppSelector(paymentToVacancies)
    const jobArea = useAppSelector(jobAreaVacancies)
    const kewWord = useAppSelector(keyWordVacancies)
    const catalogues = useAppSelector(catalogueDataVacancies)

    const [activePage, setPage] = useState<number>(1);
    const maxVacancies = 500;

    const totalPages = totalVacancies > maxVacancies ? Math.ceil(maxVacancies / pagesCount) : Math.ceil(totalVacancies / pagesCount)
    const [keyWordValue, setKeyWordValue] = useState<string>(kewWord)

    const {classes, cx} = useStyles();

    const keyWordInputDataAttribute = {'data-elem': 'search-input'}
    const useKeyWordDataAttribute = {'data-elem': 'search-button'}

    useEffect(() => {
        if (catalogues.length !== 0) {
            dispatch(setFilteredVacancies())
        } else {
            dispatch(setCatalogueData())
            dispatch(setVacanciesData(activePage, pagesCount))
        }
        setKeyWordValue(kewWord)
        setPage(currentPage)
    }, [activePage, paymentFrom, paymentTo, jobArea, kewWord, currentPage])

    return (
        <Container className={classes.jobSearchContainer}>
            {isLoading && <LoaderComponent/>}
            <TextInput className={classes.inputJobName}
                       value={keyWordValue}
                       onChange={(e) => setKeyWordValue(e.currentTarget.value)}
                       size={'lg'}
                       placeholder="Введите название вакансии"
                       icon={<Search size="1rem"/>}
                       rightSection={
                           <Button size="sm"
                                   onClick={() => dispatch(setKeyWordValueAC(keyWordValue))}
                                   {...useKeyWordDataAttribute}>
                               Поиск
                           </Button>}
                       {...keyWordInputDataAttribute}
            />
            {vacancies.length > 0 && vacancies.map(({
                                                        id,
                                                        profession,
                                                        payment_from,
                                                        currency,
                                                        type_of_work,
                                                        town,
                                                        marked
                                                    }) => {
                return (
                    <VacancyItem key={id} id={id} professionName={profession}
                                 salary={payment_from}
                                 curruency={currency}
                                 type={type_of_work.title}
                                 place={town.title}
                                 marked={marked} showSelectedVacancy={false}/>
                )
            })}
            {vacancies.length > 0 &&
                <Pagination className={classes.jobSearchPagination}
                            value={activePage}
                            onChange={(value) => {
                                setPage(value)
                                dispatch(setPageInfoAC(value))
                            }}
                            total={totalPages}/>}

            {isLoading === false && vacancies.length === 0 &&
                <Text className={classes.jobSearchNotFound}>Упс, совпадений по заданному набору фильтров нет</Text>
            }

            <ErrorComponent errorMessage={error} setError={setErrorVacancyAC}/>

        </Container>
    );
};

