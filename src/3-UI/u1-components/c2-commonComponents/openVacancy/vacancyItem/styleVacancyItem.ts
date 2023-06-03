import {createStyles, rem} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    vacancyItemContainer: {
        maxWidth: `773px`,
        backgroundColor: '#FFFFFF',
        margin: '16px 0px 0px 0px',
        padding: '24px 0px',
        border: '1px solid #EAEBED',
        borderRadius: `${rem(12)}`,
        textAlign: 'left',
        cursor: 'pointer',

        a: {
            textDecoration: 'none',
            color: '#232134',

            '&:hover div': {
                textDecoration: 'none',
                color: '#232134',
            },

            '&:active div': {
                textDecoration: 'none',
                color: '#232134',
            },
        },
    },

    vacancyItemInfo: {
        marginLeft: '24px',
        display: 'flex',
        justifyContent: 'space-between',

    },

    vacancyItemContainerTitle: {
        margin: '0px',
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '20px',
        color: '#5E96FC',
    },

    vacancyItemSelectImg: {
        marginRight: '24px',
    },

    vacancyItemDescription: {
        textAlign: 'left',
        margin: '12px 0px 0px 0px',
        display: 'inline-block',
        marginLeft: '25px',
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '16px',
        color: '#232134',

        div: {
            borderRadius: '6px',
            width: '6px',
            height: '6px',
            display: 'inline-block',
            backgroundColor: '#7B7C88',
            margin: '0px 14px',
        },

        span: {
            fontWeight: 400,
        }
    },

    vacancyItemInfoPlace: {
        marginTop: '13px',
        marginLeft: '24px',
        display: 'flex',


        div: {
            display: 'inline-block',
            marginLeft: '11px',
        }

    }


}))