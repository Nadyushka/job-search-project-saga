import {createStyles, rem} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    loginContainer: {
        maxWidth: `${rem(400)}`,
        margin: 'auto !important',
        padding: '24px',
        border: 'none',
    },

    loginBox: {
        backgroundColor: 'white',
        marginTop: '40px',
        padding: '20px 30px',
        borderRadius: '20px',
        position: 'relative',

        h2: {
            marginTop: '10px',
            marginBottom: '20px',
        },

        form: {
            textAlign: 'left',
            marginTop: '10px',

            div: {
                label: {
                    marginBottom: '5px',
                    marginTop: '10px',
                }
            }
        },

        button: {
            '&:hover': {
                backgroundColor: '#92C1FF',
            },
            '&:active': {
                backgroundColor: '#3B7CD3',
            },
        }
    }
}))