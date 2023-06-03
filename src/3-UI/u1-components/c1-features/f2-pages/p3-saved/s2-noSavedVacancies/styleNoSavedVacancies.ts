import {createStyles, rem} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    noSelectedVacancyContainer: {
        maxWidth: `773px`,
        backgroundColor: '#F7F7F8',
        margin: '0px auto',
        padding: '20px 0px 0px 0px',
        height: '100vh',
    },

    noSelectedVacancyImg: {
        margin: '120px auto 0px',
    },

    noSelectedVacancyText: {
        margin: '32px auto 0px',
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '24px',
    },
    noSelectedVacancyButton: {
        margin: '32px auto 0px',
        fontFamily: 'Open Sans, sans-serif',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',

        '&:hover': {
            backgroundColor: '#92C1FF',
        },

        '&:active': {
            backgroundColor: '#3B7CD3',
        },

    },

    jobSearchPagination: {
        justifyContent: 'center',
        marginTop: '40px',
        marginBottom: '44px',

        [`@media (max-width: ${rem(400)})`]: {
            flexDirection: 'column',
        },
    }
}))