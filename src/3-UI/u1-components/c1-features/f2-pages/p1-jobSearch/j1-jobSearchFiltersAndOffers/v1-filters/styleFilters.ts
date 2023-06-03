import {createStyles, getStylesRef, rem} from "@mantine/core";
import crossIcon from "../../../../../../u2-assets/pictures/cross.svg";

export const useStyles = createStyles((theme) => ({
    filtersContainer: {
        width: `${rem(315)}`,
        borderRadius: `${rem(12)} ${rem(12)} ${rem(12)} ${rem(12)}`,
        padding: `${rem(20)}`,
        backgroundColor: 'white',
        margin: '40px 0px 0px 0px',
        border: '1px solid #EAEBED',
        height: '100%',

        [`@media (max-width: ${rem(800)})`]: {
            flex: '1 1 100%',
        },
    },

    filterTitle: {
        margin: '0px auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',

        [`@media (max-width: ${rem(800)})`]: {
            flex: '1 1 100%',
        },
    },

    filterTitleText: {
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: `${rem(20)}`,
        lineHeight: `${rem(20)}`
    },

    filterTitleButton: {
        padding: '0px',
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: `${rem(14)}`,
        backgroundColor: 'white',
        color: '#ACADB9',
        border: 'none',
        height: `${rem(20)}`,

        '&:hover': {
            color: '#92C1FF',
            backgroundColor: 'white',

            [`.${getStylesRef('filterTitleButtonCross')}`]: {
                backgroundColor: '#92C1FF',
            },
        },

        '&:active': {
            color: '#5E96FC',
            backgroundColor: 'white',

            [`.${getStylesRef('filterTitleButtonCross')}`]: {
                backgroundColor: '#5E96FC',
            },
        },

    },

    filterTitleButtonCross: {
        ref: getStylesRef('filterTitleButtonCross'),
        width: '16px',
        height: '16px',
        backgroundColor: '#ACADB9',
        mask: `url(${crossIcon}) no-repeat center`,
    },

    vacancyAriaSelect: {
        textAlign: 'left',
        cursor: 'pointer',
        rightSection: {pointerEvents: 'none'},
        label: {
            margin: '32px 0px 8px 0px',
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: `${rem(16)}`,
            lineHeight: `${rem(19)}`,
            color: '#232134',
            padding: '0px',
        },
        input: {
            padding: '11px',
            cursor: 'pointer',
            '&:focus-within': {
                borderColor: '#5E96FC',
            },
            '&:placeholder': {
                color: '#5E96FC',
            },
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: `${rem(14)}`,
        },
    },

    salaryInput: {
        marginTop: '20px',
        textAlign: 'left',
        label: {
            padding: '0px',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: `${rem(16)}`,
            lineHeight: `${rem(19)}`,
            color: '#232134',
        },
        svg: {
            color: '#ACADB9',
        }
    },

    salaryInputMax: {
        marginTop: '8px',
    },

    filterButton: {
        width: '100%',
        marginTop: '20px',
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: `${rem(14)}`,
        backgroundColor: '#5E96FC',

        '&:hover': {
            backgroundColor: '#92C1FF',
        },
        '&:active': {
            backgroundColor: '#3B7CD3',
        },
    }
}))