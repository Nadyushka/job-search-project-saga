import {createStyles, rem} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    bodyContainer: {
        maxWidth: `100%`,
        margin: '0px auto',
        borderRadius: `${rem(0)} ${rem(0)} ${theme.radius.sm} ${theme.radius.sm}`,
        border: 'none',
        backgroundColor: '#F7F7F8',
        paddingBottom: '51px',
        height: '100%',
        minHeight: '78vh',
        position: 'relative'
    },
}))