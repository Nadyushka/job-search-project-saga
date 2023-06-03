import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({

    loaderContainer: {
        position: "absolute",
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: 'RGB(224, 224, 224, 0.1)',
        borderRadius: '5px',
    },


}))