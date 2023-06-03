import {createStyles, keyframes} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    errorContainer: {
        borderRadius: `10px`,
        border: '1px solid red',
        backgroundColor: 'white',
        position: 'fixed',
        bottom: '20px',
        left: '50px',
        padding: '10px 20px',
        color: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: `${bounce}`,
        animationDuration: '6s',
    },
}))

const bounce = keyframes({
        'from, 20%, 53%, 80%, to': {transform: 'translate3d(0, 0, 0)'},
        '0%': {
            transform: 'translateY(80px)',
            opacity: 0,
        },
        '10%': {
            transform: 'translateY(0)',
            opacity: 1,
        },
        '90%': {
            transform: 'translateY(0)',
            opacity: 1,
        },
        '100%': {
            transform: 'translateY(80px)',
            opacity: 0.3,
        }
    })
;
