import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    vacancyContainer: {
        maxWidth: `773px`,
        backgroundColor: '#F7F7F8',
        margin: '0px auto',
        padding: '20px 0px 0px 0px',
        height: '100%',
        position: 'relative',
    },

    vacancyInfo : {
        backgroundColor: 'white',
        textAlign: 'left',
        marginTop: '20px',
        maxWidth: `773px`,
        padding: '20px',
        borderRadius: '20px',

        p: {
            margin: '1px',
        }
    }
}))