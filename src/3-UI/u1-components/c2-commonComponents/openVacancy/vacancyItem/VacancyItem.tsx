import React, {useEffect} from 'react';
import {MouseEvent, useState} from 'react';
import {Box, Container, Text, Title} from "@mantine/core";
import selectedStar from '3-UI/u2-assets/pictures/selectedStar.svg'
import notSelectedStar from '3-UI/u2-assets/pictures/notSelectedStar.svg'
import locationIcon from '3-UI/u2-assets/pictures/locationIcon.svg'
import {useNavigate} from "react-router-dom";
import {
    addVacancyToSelected, removeVacancyFromSelection


} from "2-BLL/selectedVacanciesReducer/selectedVacanciesReducer";
import {useAppDispatch, useAppSelector} from "2-BLL/store";
import {useStyles} from "./styleVacancyItem";
import {
    currentPageSelectedVacancies,
    pageCountSelectedVacancies
} from "2-BLL/selectedVacanciesReducer/selectorsSelectedVacancies";

type PropsType = {
    id: number
    professionName: string
    salary: number | ""
    type: string
    place: string
    marked: boolean,
    showSelectedVacancy: boolean
    curruency: 'rub' | 'uah' | 'uzs'
}

export const VacancyItem = ({
                                id,
                                professionName,
                                salary,
                                curruency,
                                type,
                                place,
                                marked,
                            }: PropsType) => {


    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(currentPageSelectedVacancies)
    const pageCount = useAppSelector(pageCountSelectedVacancies)

    const navigate = useNavigate()

    const [mark, setMark] = useState<boolean>(marked)

    const onClickVacancyHandler = () => navigate(`/selectedVacancy/${id}`);


    const toggleSelectVacancies = (e: MouseEvent<HTMLImageElement>) => {
        if (!mark) {
            setMark(true)
            dispatch(addVacancyToSelected(id, professionName, salary, curruency, type, place))
        }
        if (mark) {
            setMark(false)
            dispatch(removeVacancyFromSelection(id, currentPage, pageCount))
        }
        e.stopPropagation();
    }

    const {classes, cx} = useStyles();

    const vacancyIdDataAttribute = {'data-elem': `vacancy-${id}`}


    return (
        <Container className={classes.vacancyItemContainer} onClick={onClickVacancyHandler} {...vacancyIdDataAttribute}>
            <Box className={classes.vacancyItemInfo}>
                <Title className={classes.vacancyItemContainerTitle} order={3}>{professionName}</Title>
                <img className={classes.vacancyItemSelectImg}
                     src={mark ? selectedStar : notSelectedStar}
                     onClick={toggleSelectVacancies}
                     data-elem={`vacancy-${id}-shortlist-button`}
                />
            </Box>
            <Text className={classes.vacancyItemDescription} span>
                {salary !== 0 ? `з/п от ${salary} ${curruency}` : 'з/п не указана'}
                <div/>
                <Text span>{type}</Text>
            </Text>
            <Box className={classes.vacancyItemInfoPlace}>
                <img src={locationIcon}/>
                <Text>{place}</Text>
            </Box>
        </Container>
    );
};


