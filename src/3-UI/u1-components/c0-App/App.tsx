import React, {useEffect} from 'react';
import './App.css';
import {HeaderSimple} from "../c1-features/f1-header/Header";
import {RoutesComponent} from "../c2-commonComponents/routes/Routes";
import {useAppDispatch} from "2-BLL/store";
import {authorisedWithPassword} from "2-BLL/authReucer/authReducer";

export function App() {

    const dispatch = useAppDispatch()

    const appLinks = [
        {link: '/vacancySearch', label: 'Поиск Вакансий'},
        {link: '/selectedVacancies', label: 'Избранное'}]

    useEffect(() => {
            dispatch(authorisedWithPassword(
                'sergei.stralenia@gmail.com',
                'paralect123',
                2356,
                'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                0
            ))
        }
        , [])

    return (
        <div className="App">
            <HeaderSimple links={appLinks}/>
            <RoutesComponent/>
        </div>
    );
}


