import {createStyles, rem} from "@mantine/core";

export const useStyles = createStyles((theme) => ({

    jobSearchContainer: {
        maxWidth: `${rem(1116)}`,
        margin: '0px auto',
        border: 'none',
        display: "flex",
        justifyContent: "space-between",
        flexWrap: 'wrap',
        position: 'relative'
    },

    mainTitle: {
        display: 'none',
    },

    jobOffers:{
        position: 'relative',
        flex: '1 1 65%',
        maxWidth: `773px`,

        [`@media (max-width: ${rem(1160)})`]: {
            flex: '1 1 48%',
        },
    }

}))