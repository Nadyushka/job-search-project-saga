import {createStyles, rem} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    header: {
        maxWidth: `${rem(1440)}`,
        margin: '0px auto !important',
        borderRadius: `${theme.radius.sm} ${theme.radius.sm} ${rem(0)} ${rem(0)}`,
        border: 'none',
        position: 'relative',
        zIndex: 1,
    },

    header_wrapper: {
        height: '100%',
        maxWidth: `${rem(1116)}`,
    },

    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: `${rem(696)}`,
        height: '100%',
        margin: '0px',
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    dropdown: {
        position: 'absolute',
        top: rem(80),
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',
        padding: '10px 20px',

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
        fontStyle: 'normal',
        fontSize: `16px`,
        
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 400,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'none',
        fontFamily: 'Inter, sans-serif'
    },

    linkActive: {
        '&, &:hover': {
            fontWeight: 500,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
        },
    },
}));