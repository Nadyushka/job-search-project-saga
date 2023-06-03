import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container,
    NumberInput,
    rem,
    Select,
    Title
} from "@mantine/core";
import {ChevronDown, ChevronUp} from 'tabler-icons-react';
import {
    setFiltersAC,
    setKeyWordValueAC,
} from "2-BLL/vacancyReducer/vacanciesReducer";
import {useAppDispatch, useAppSelector} from "2-BLL/store";
import {
    catalogueDataVacancies,
    jobAreaVacancies, keyWordVacancies,
    paymentFromVacancies, paymentToVacancies
} from "2-BLL/vacancyReducer/vacancySelectors";
import {useStyles} from './styleFilters';

export const Filters = () => {

    const dispatch = useAppDispatch()

    const catalogueDataText = useAppSelector(catalogueDataVacancies).map(catalogue => catalogue['title_rus'])
    const paymentFrom = useAppSelector(paymentFromVacancies)
    const paymentTo = useAppSelector(paymentToVacancies)
    const jobArea = useAppSelector(jobAreaVacancies)
    const keyWord = useAppSelector(keyWordVacancies)

    const [jobAreaValue, setJobAreaValue] = useState<string>(jobArea);
    const [minSalaryValue, setMinSalaryValue] = useState<number | ''>(paymentFrom === '' ? '' : paymentFrom);
    const [maxSalaryValue, setMaxSalaryValue] = useState<number | ''>(paymentTo === '' ? '' : paymentFrom);

    const [vacancyAriaSelectOpen, setVacancyAriaSelectOpen] = useState<boolean>(false);

    const {classes, cx} = useStyles();

    const selectDataAttribute = {'data-elem': 'industry-select'}
    const minSalaryInputDataAttribute = {'data-elem': 'salary-from-input'}
    const maxSalaryInputDataAttribute = {'data-elem': 'salary-to-input'}
    const useFiltersDataAttribute = {'data-elem': 'search-button'}

    const onClickButtonHandler = () => {
        dispatch(setFiltersAC(minSalaryValue, maxSalaryValue, jobAreaValue, keyWord))
    }

    const onClockClearFiltersButton = () => {
        dispatch(setFiltersAC('', '', '', ''))
        dispatch(setKeyWordValueAC(''))
    }

    useEffect(() => {
        setJobAreaValue(jobArea)
        setMinSalaryValue(paymentFrom)
        setMaxSalaryValue(paymentTo)
    }, [paymentFrom, paymentTo, jobArea])

    return (
        <Container className={classes.filtersContainer}>
            <Box className={classes.filterTitle}>
                <Title className={classes.filterTitleText} order={2}>Фильтры</Title>
                <Button className={classes.filterTitleButton}
                        onClick={onClockClearFiltersButton} {...useFiltersDataAttribute}>Сбросить данные
                    <div className={classes.filterTitleButtonCross}/>
                </Button>
            </Box>
            <Select
                className={classes.vacancyAriaSelect}
                onClick={() => setVacancyAriaSelectOpen(!vacancyAriaSelectOpen)}
                onBlur={() => setVacancyAriaSelectOpen(false)}
                size={'md'}
                label="Отрасль"
                placeholder="Выберете отрасль "
                searchable
                clearable
                onSearchChange={setJobAreaValue}
                searchValue={jobAreaValue}
                nothingFound="Проверьте выбранную отрасль"
                data={catalogueDataText}
                transitionProps={{transition: 'pop-top-left', duration: 80, timingFunction: 'ease'}}
                rightSection={!vacancyAriaSelectOpen ?
                    <ChevronDown style={{color: '#ACADB9'}} size={'1rem'}/> :
                    <ChevronUp style={{color: '#5E96FC'}} size={'1rem'}/>}
                rightSectionWidth={48}
                styles={(theme) => ({
                    rightSection: {pointerEvents: 'none'},
                    item: {
                        width: '97%',
                        fontSize: `${rem(14)}`,
                        fontFamily: 'Inter, sans-serif',
                        fontStyle: 'normal',

                        '&[data-hovered]': {
                            backgroundColor: '#DEECFF;',
                            color: '#232134',
                        },
                        '&[data-selected]': {
                            '&, &:hover': {
                                backgroundColor: '#5E96FC;',
                                color: 'white'
                            },
                        },
                    },
                })}
                {...selectDataAttribute}
            />
            <Box>
                <NumberInput
                    placeholder="От"
                    label="Оклад"
                    styles={{control: {border: 'none'}}}
                    className={classes.salaryInput}
                    min={0}
                    value={minSalaryValue}
                    onChange={(value) => {
                        setMinSalaryValue(value)
                        value > maxSalaryValue && setMaxSalaryValue(value)
                    }}
                    step={1000}
                    {...minSalaryInputDataAttribute}
                />
                <NumberInput
                    placeholder="До"
                    styles={{control: {border: 'none'}}}
                    className={`${classes.salaryInput}  ${classes.salaryInputMax}`}
                    min={0}
                    value={maxSalaryValue}
                    onChange={(value) => {
                        setMaxSalaryValue(value)
                        value < minSalaryValue && setMinSalaryValue(value);
                    }}
                    step={1000}
                    {...maxSalaryInputDataAttribute}
                />
            </Box>
            <Button onClick={onClickButtonHandler} className={classes.filterButton}>Применить</Button>
        </Container>
    );
};
