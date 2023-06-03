import {Route, Routes} from "react-router-dom";
import {JobSearch} from "../../c1-features/f2-pages/p1-jobSearch/JobSearch";
import {Vacancy} from "../../c1-features/f2-pages/p2-vacancy/Vacancy";
import {SavedVacancies} from "../../c1-features/f2-pages/p3-saved/s1-savedVacancy/SavedVacancies";
import {Container} from "@mantine/core";
import {Login} from "../../c1-features/f2-pages/p0-login/Login";
import {NoSavedVacancies} from "../../c1-features/f2-pages/p3-saved/s2-noSavedVacancies/NoSavedVacancies";
import {useStyles} from "./styleRoutes";

export const PATH = {
    VACANCY_SEARCH: '/vacancySearch',
    ACTIVE_VACANCY: '/selectedVacancy/:id',
    SELECTED_VACANCIES: '/selectedVacancies',
    NO_SELECTED_VACANCIES: '/selectedVacancies/noSelectedVacancies',
    LOGIN: '/login',
}

export const RoutesComponent = () => {

    const {classes, cx} = useStyles();

    return (
        <Container className={classes.bodyContainer}>
            <Routes>
                <Route path={'/'} element={<JobSearch/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.VACANCY_SEARCH} element={<JobSearch/>}/>
                <Route path={PATH.ACTIVE_VACANCY} element={<Vacancy/>}/>
                <Route path={PATH.SELECTED_VACANCIES} element={<SavedVacancies/>}/>
                <Route path={PATH.NO_SELECTED_VACANCIES} element={<NoSavedVacancies/>}/>
            </Routes>
        </Container>
    )
}

