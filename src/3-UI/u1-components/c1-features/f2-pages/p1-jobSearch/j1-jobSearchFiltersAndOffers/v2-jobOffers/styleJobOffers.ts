import {createStyles, rem} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    jobSearchContainer: {
        width: '100%',
        backgroundColor: '#F7F7F8',
        margin: '40px 0px 0px 28px',
        padding: '0px',
        position: 'relative',

        [`@media (max-width: ${rem(1160)})`]: {
            flex: '1 1 48%',
        },

        [`@media (max-width: ${rem(800)})`]: {
            marginLeft: '0px'
        },
    },

    inputJobName: {
        width: `100%`,
        background: '#FFFFFF',
        border: '1px solid #EAEBED',
        borderRadius: '8px',

        input: {
            width: `100%`,
            paddingLeft: '36px !important',

            '&:placeholder': {
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
            },
        },

        button: {
            position: "absolute",
            right: '8px',
            padding: '5px 20px',
            cursor: 'pointer',

            '&:hover': {
                backgroundColor: '#92C1FF',
            },
            '&:active': {
                backgroundColor: '#3B7CD3',
            },
        },
    },

    jobSearchPagination: {
        justifyContent: 'center',
        marginTop: '40px',
        marginBottom: '44px',

        [`@media (max-width: ${rem(400)})`]: {
            flexDirection: 'column',
        },
    },

    jobSearchNotFound: {
        marginTop: '20px'
    }
}))